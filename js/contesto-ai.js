/* ============================================
   BREVETTIAMO - Contesto AI Module
   Carica e gestisce la banca dati brevetti
   per arricchire i prompt di Groq
   ============================================ */

const ContestoAI = {
    // URL del file JSON (su GitHub Pages)
    DATA_URL: 'https://patriziopz.github.io/brevettiamo/data/contesto_ai.json',

    // Cache in memoria
    database: null,
    ultimoAggiornamento: null,

    // Inizializza e carica il database
    async init() {
        try {
            // Controlla cache locale
            const cached = localStorage.getItem('brevettiamo_contesto_cache');
            const cacheTime = localStorage.getItem('brevettiamo_contesto_time');

            // Usa cache se meno di 24h
            if (cached && cacheTime) {
                const eta = Date.now() - parseInt(cacheTime);
                if (eta < 24 * 60 * 60 * 1000) {
                    this.database = JSON.parse(cached);
                    this.ultimoAggiornamento = new Date(parseInt(cacheTime));
                    console.log('[ContestoAI] Database caricato dalla cache');
                    return true;
                }
            }

            // Carica da remoto
            const response = await fetch(this.DATA_URL, {
                cache: 'no-cache',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            this.database = await response.json();
            this.ultimoAggiornamento = new Date();

            // Salva in cache
            localStorage.setItem('brevettiamo_contesto_cache', JSON.stringify(this.database));
            localStorage.setItem('brevettiamo_contesto_time', Date.now().toString());

            console.log('[ContestoAI] Database caricato da remoto:', 
                this.database.metadata?.totale_brevetti || 0, 'brevetti');

            return true;

        } catch (error) {
            console.error('[ContestoAI] Errore caricamento:', error);
            // Fallback: usa dati minimi
            this.database = this.getDatiFallback();
            return false;
        }
    },

    // Dati minimi di fallback se il caricamento fallisce
    getDatiFallback() {
        return {
            metadata: { versione: "fallback", totale_brevetti: 0 },
            categorie: {},
            regole_generali_uibm: {
                linee: { colore: "Nero puro", spessore_contorni: "0.35-0.70mm" },
                margini_obbligatori: { superiore: "2.5cm", inferiore: "2cm", sinistro: "2cm", destro: "2cm" },
                divieti: ["Ombreggiature", "Colori", "Fotografie", "Linee spezzate per contorni"]
            }
        };
    },

    // Ottieni esempi per una categoria specifica
    getEsempiCategoria(categoriaId) {
        if (!this.database || !this.database.categorie) {
            return null;
        }

        const cat = this.database.categorie[categoriaId];
        if (!cat) {
            return null;
        }

        return {
            nome: cat.nome,
            classe_locarno: cat.classe_locarno,
            esempi: cat.esempi_approvati || [],
            pattern: cat.pattern_approvazione || {}
        };
    },

    // Trova categoria dal testo (ricerca fuzzy)
    trovaCategoria(testoUtente) {
        if (!this.database || !this.database.categorie) {
            return null;
        }

        const testo = testoUtente.toLowerCase();

        // Mappatura parole chiave -> categorie
        const keywordMap = {
            "sedia": "06-01", "poltrona": "06-01", "divano": "06-01", 
            "letto": "06-01", "arredamento": "06-01", "mobilio": "06-01",

            "telefono": "14-03", "comunicazione": "14-03", "wireless": "14-03",
            "iot": "14-03", "sensor": "14-03", "antenna": "14-03",

            "auto": "12-05", "veicolo": "12-05", "macchina": "12-05",
            "motore": "12-05", "carrozzeria": "12-05",

            "lampada": "26-05", "illuminazione": "26-05", "led": "26-05",

            "macchina": "15-01", "attrezzo": "15-01", "strumento": "15-01"
        };

        for (const [keyword, catId] of Object.entries(keywordMap)) {
            if (testo.includes(keyword)) {
                return catId;
            }
        }

        return null; // Categoria non trovata
    },

    // Genera il prompt di sistema per Groq con contesto
    generaPromptSistema(categoriaId, tipoAnalisi = 'disegno') {
        let contesto = '';

        // Aggiungi regole generali UIBM
        if (this.database && this.database.regole_generali_uibm) {
            const regole = this.database.regole_generali_uibm;
            contesto += `REGOLE GENERALI UIBM (obbligatorie):\n`;
            contesto += `- Formato: ${Object.keys(regole.formato_foglio || {}).join(', ')}\n`;
            contesto += `- Margini: sup ${regole.margini_obbligatori?.superiore}, inf ${regole.margini_obbligatori?.inferiore}, lat ${regole.margini_obbligatori?.sinistro}\n`;
            contesto += `- Linee: ${regole.linee?.colore}, spessore ${regole.linee?.spessore_contorni}\n`;
            contesto += `- Viste minime: ${regole.viste_richieste?.minimo}\n`;
            contesto += `- Divieti: ${(regole.divieti || []).join(', ')}\n\n`;
        }

        // Aggiungi esempi della categoria specifica
        if (categoriaId) {
            const cat = this.getEsempiCategoria(categoriaId);
            if (cat && cat.esempi.length > 0) {
                contesto += `ESEMPI APPROVATI UIBM - Categoria ${cat.nome} (${cat.classe_locarno}):\n`;

                cat.esempi.slice(0, 3).forEach((esempio, i) => {
                    contesto += `\nEsempio ${i + 1}: ${esempio.titolo}\n`;
                    contesto += `Caratteristiche approvate:\n`;
                    (esempio.caratteristiche_approvate || []).forEach(c => {
                        contesto += `- ${c}\n`;
                    });
                });

                if (cat.pattern) {
                    contesto += `\nPattern di approvazione per questa categoria:\n`;
                    contesto += `- Viste richieste: ${(cat.pattern.viste_richieste || []).join(', ')}\n`;
                    contesto += `- Scala: ${cat.pattern.scala || 'N/A'}\n`;
                    contesto += `- Formato: ${cat.pattern.formato || 'N/A'}\n`;
                }
            }
        }

        // Prompt base per l'analisi
        const promptBase = `Sei l'esaminatore virtuale senior dell'UIBM (Ufficio Italiano Brevetti e Marchi) per BrevettIAmo.
Analizza il disegno tecnico allegato come se dovessi approvarlo o respingere il deposito.

${contesto}

ISTRUZIONI:
1. Verifica che il disegno rispetti TUTTE le regole UIBM sopra elencate
2. Confronta con gli esempi approvati della stessa categoria
3. Identifica errori grafici, margini, linee, numerazione, viste mancanti
4. Assegna un punteggio di approvabilità da 0 a 100
5. Fornisci consigli specifici per la correzione

Rispondi in formato JSON con questa struttura:
{
    "esito": "approvato|revisione|respinto",
    "punteggio": 0-100,
    "errori_critici": ["descrizione errore 1", ...],
    "errori_warning": ["descrizione warning 1", ...],
    "consigli_correzione": ["consiglio 1", ...],
    "elementi_corretti": ["elemento corretto 1", ...]
}`;

        return promptBase;
    },

    // Genera prompt per analisi testo (senza immagine)
    generaPromptAnalisiTesto(descrizioneUtente, categoriaId) {
        const promptSistema = this.generaPromptSistema(categoriaId, 'testo');

        return `${promptSistema}\n\nDESCRIZIONE DELL'INVENZIONE DALL'UTENTE:\n${descrizioneUtente}\n\nAnalizza la descrizione e fornisci un report sulla fattibilità brevettuale.`;
    },

    // Genera prompt per analisi immagine (con base64)
    generaPromptAnalisiImmagine(immagineBase64, categoriaId, descrizioneExtra = '') {
        const promptSistema = this.generaPromptSistema(categoriaId, 'disegno');

        let prompt = promptSistema;

        if (descrizioneExtra) {
            prompt += `\n\nNOTE AGGIUNTIVE DALL'UTENTE:\n${descrizioneExtra}`;
        }

        prompt += `\n\nAnalizza il disegno tecnico allegato e fornisci il report JSON.`;

        return {
            prompt: prompt,
            immagine: immagineBase64
        };
    }
};

// Esporta per uso globale
window.ContestoAI = ContestoAI;
