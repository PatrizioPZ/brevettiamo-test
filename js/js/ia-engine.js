// js/ia-engine.js — Motore IA BrevettIAmo con Groq
// Gestisce chiamate API, retry, errori, salvataggio risultati

class IAEngine {
    constructor() {
        this.apiKey = CONFIG.GROQ_API_KEY;
        this.apiUrl = CONFIG.GROQ_API_URL;
        this.modelli = CONFIG.MODELLI;
        this.timeout = CONFIG.TIMEOUT_MS;
        this.maxRetry = CONFIG.MAX_RETRY;
        
        // Verifica configurazione
        if (!this.apiKey || this.apiKey === 'INSERISCI_QUI_LA_TUA_CHIAVE_GROQ') {
            console.error('Chiave API Groq non configurata! Modifica config.js');
        }
    }
    
    /**
     * Chiama l'IA per un servizio specifico
     * @param {string} servizioId - ID del servizio (es. 'servizio-deposito')
     * @param {string} descrizione - Descrizione dell'utente
     * @param {Array} files - Array di file uploadati (opzionale)
     * @param {string} tipoModello - 'testo', 'visione', 'rapido', 'bilanciato'
     * @returns {Promise<Object>} - Risultato con contenuto, tokens, modello
     */
    async chiama(servizioId, descrizione, files = [], tipoModello = 'testo') {
        const tentativi = [];
        let ultimoErrore = null;
        
        for (let tentativo = 0; tentativo <= this.maxRetry; tentativo++) {
            try {
                console.log('Chiamata IA - Tentativo ' + (tentativo + 1) + '/' + (this.maxRetry + 1));
                
                const risultato = await this._eseguiChiamata(servizioId, descrizione, files, tipoModello);
                
                // Salva in localStorage
                this._salvaRisultato(servizioId, descrizione, risultato);
                
                return {
                    success: true,
                    contenuto: risultato.contenuto,
                    modello: risultato.modello,
                    tokens: risultato.tokens,
                    tempo: risultato.tempo,
                    tentativi: tentativo + 1
                };
                
            } catch (errore) {
                ultimoErrore = errore;
                tentativi.push({
                    tentativo: tentativo + 1,
                    errore: errore.message,
                    timestamp: new Date().toISOString()
                });
                
                console.warn('Tentativo ' + (tentativo + 1) + ' fallito:', errore.message);
                
                // Se non e l'ultimo tentativo, aspetta prima di riprovare
                if (tentativo < this.maxRetry) {
                    const attesa = Math.pow(2, tentativo) * 1000; // 1s, 2s, 4s
                    console.log('Attesa ' + attesa + 'ms prima del retry...');
                    await this._sleep(attesa);
                    
                    // Prova con modello diverso se il primo fallisce
                    if (tentativo === 1) tipoModello = 'bilanciato';
                    if (tentativo === 2) tipoModello = 'rapido';
                }
            }
        }
        
        // Tutti i tentativi falliti
        return {
            success: false,
            errore: ultimoErrore.message,
            tentativi: tentativi,
            fallback: true
        };
    }
    
    /**
     * Esegue la chiamata API effettiva a Groq
     */
    async _eseguiChiamata(servizioId, descrizione, files, tipoModello) {
        const modello = this.modelli[tipoModello] || this.modelli.testo;
        
        // Prepara il prompt
        let promptTemplate = PROMPTS[servizioId] || PROMPTS['default'];
        const prompt = promptTemplate.replace('{descrizione}', descrizione);
        
        // Prepara i messaggi
        const messages = [
            {
                role: 'system',
                content: 'Sei un assistente esperto in proprieta intellettuale. Rispondi sempre in italiano. Genera output in formato HTML strutturato con sezioni chiare, titoli, elenchi puntati. Non usare markdown, solo HTML.'
            },
            {
                role: 'user',
                content: prompt
            }
        ];
        
        // Se ci sono immagini, descrivili nel testo
        if (files && files.length > 0) {
            const filesDesc = files.map(f => '[File: ' + f.nome + ', tipo: ' + f.tipo + ']').join('\n');
            messages[1].content += '\n\nFile allegati:\n' + filesDesc;
        }
        
        const inizio = Date.now();
        
        // Controller per timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: modello,
                    messages: messages,
                    temperature: CONFIG.DEFAULT_TEMPERATURE,
                    max_tokens: CONFIG.DEFAULT_MAX_TOKENS,
                    stream: false
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error('API Groq errore ' + response.status + ': ' + (errorData.error?.message || response.statusText));
            }
            
            const data = await response.json();
            const tempo = Date.now() - inizio;
            
            return {
                contenuto: data.choices[0].message.content,
                modello: modello,
                tokens: {
                    prompt: data.usage?.prompt_tokens || 0,
                    completion: data.usage?.completion_tokens || 0,
                    total: data.usage?.total_tokens || 0
                },
                tempo: tempo,
                raw: data
            };
            
        } catch (errore) {
            clearTimeout(timeoutId);
            throw errore;
        }
    }
    
    /**
     * Salva il risultato in localStorage
     */
    _salvaRisultato(servizioId, descrizione, risultato) {
        const storageKey = 'brevettiamo_risultato_ia';
        const dati = {
            servizioId: servizioId,
            descrizione: descrizione,
            contenuto: risultato.contenuto,
            modello: risultato.modello,
            tokens: risultato.tokens,
            tempo: risultato.tempo,
            timestamp: new Date().toISOString()
        };
        
        try {
            localStorage.setItem(storageKey, JSON.stringify(dati));
            console.log('Risultato IA salvato in localStorage');
        } catch (e) {
            console.warn('Impossibile salvare in localStorage:', e);
        }
    }
    
    /**
     * Recupera l'ultimo risultato salvato
     */
    static recuperaRisultato() {
        try {
            const dati = localStorage.getItem('brevettiamo_risultato_ia');
            return dati ? JSON.parse(dati) : null;
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Verifica se la chiave API e configurata
     */
    static isConfigurato() {
        const key = CONFIG.GROQ_API_KEY;
        return key && key !== 'INSERISCI_QUI_LA_TUA_CHIAVE_GROQ' && key.length > 20;
    }
    
    /**
     * Utility: sleep
     */
    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Esporta
if (typeof window !== 'undefined') {
    window.IAEngine = IAEngine;
}
