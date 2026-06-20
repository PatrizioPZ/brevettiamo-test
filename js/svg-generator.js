    /**
     * Estrae specifiche dal testo IA generato
     * Parsing avanzato del testo HTML per estrarre oggetto, viste, parti, dimensioni
     */
    static estraiSpecifiche(testoIA) {
        const specs = {
            oggetto: '',
            viste: [],
            parti: [],
            dimensioni: {}
        };
        
        // Rimuovi HTML per parsing testo
        const testoPulito = testoIA.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        
        // === ESTRAI OGGETTO (più metodi) ===
        
        // Metodo 1: Cerca "Oggetto:" o "TITOLO TECNICO" o "Tavola tecnica - XXX"
        let matchOggetto = testoIA.match(/TITOLO TECNICO<\/h1>\s*<p>([^<]+)/i) ||
                          testoIA.match(/<h1>([^<]{5,60})<\/h1>/i) ||
                          testoIA.match(/Oggetto:<\/strong>\s*([^<]+)/i);
        
        if (matchOggetto) {
            specs.oggetto = matchOggetto[1].trim();
        }
        
        // Metodo 2: Cerca nel testo pulito frasi tipo "Il [nome] è costituito da..."
        if (!specs.oggetto) {
            const matchOggetto2 = testoPulito.match(/[Ll]a?\s+([a-zA-Z\s]{10,50}(?:con|per|da|che))\s+(?:è|e|sono)/i);
            if (matchOggetto2) {
                specs.oggetto = matchOggetto2[1].trim();
            }
        }
        
        // Metodo 3: Prima riga/riga dopo il titolo
        if (!specs.oggetto) {
            const righe = testoPulito.split(/[.!?]/).filter(r => r.trim().length > 10);
            if (righe.length > 0) {
                const primaRiga = righe[0].trim();
                // Prendi le prime 3-4 parole significative
                const parole = primaRiga.split(/\s+/).filter(p => p.length > 2);
                specs.oggetto = parole.slice(0, 6).join(' ');
            }
        }
        
        // Fallback
        if (!specs.oggetto || specs.oggetto.length < 3) {
            specs.oggetto = 'OGGETTO BREVETTUALE';
        }
        
        // Limita lunghezza
        if (specs.oggetto.length > 50) {
            specs.oggetto = specs.oggetto.substring(0, 50) + '...';
        }
        
        // === ESTRAI PARTI ===
        const regexParti = /(\d+)[\.\)]\s*([^\n<]{3,50}?)(?=\n|<|$)/g;
        let match;
        while ((match = regexParti.exec(testoPulito)) !== null) {
            const nome = match[2].trim();
            if (nome.length > 2 && nome.length < 50 && 
                !nome.includes('ANALISI') && !nome.includes('TITOLO') && 
                !nome.includes('DESCRIZIONE') && !nome.includes('CONCLUSIONI')) {
                specs.parti.push({ numero: match[1], nome: nome });
            }
        }
        
        // Se non trova parti, crea default basate sul testo
        if (specs.parti.length === 0) {
            // Cerca sostantivi nel testo che potrebbero essere parti
            const paroleChiave = ['corpo', 'elemento', 'fissaggio', 'pomello', 'gancio', 'struttura', 'mecanismo', 'parte'];
            let numParte = 1;
            paroleChiave.forEach(parola => {
                if (testoPulito.toLowerCase().includes(parola) && numParte <= 5) {
                    specs.parti.push({ numero: numParte, nome: parola.charAt(0).toUpperCase() + parola.slice(1) + ' principale' });
                    numParte++;
                }
            });
            
            // Se ancora vuoto, parti generiche
            if (specs.parti.length === 0) {
                specs.parti = [
                    { numero: 1, nome: 'Corpo principale' },
                    { numero: 2, nome: 'Elemento funzionale' },
                    { numero: 3, nome: 'Sistema di fissaggio' }
                ];
            }
        }
        
        // === ESTRAI VISTE ===
        const visteNomi = ['FRONTALE', 'LATERALE', 'SUPERIORE', 'SEZIONE', 'PROSPETTIVA', 'ASSONOMETRICA', 'POSTERIORE', 'INFERIORE'];
        visteNomi.forEach(nome => {
            if (testoPulito.toUpperCase().includes(nome)) {
                specs.viste.push({ nome: 'VISTA ' + nome });
            }
        });
        
        // Se non trova viste, default
        if (specs.viste.length === 0) {
            specs.viste = [
                { nome: 'VISTA FRONTALE' },
                { nome: 'VISTA LATERALE' },
                { nome: 'SEZIONE A-A' }
            ];
        }
        
        // Limita a max 4 viste
        if (specs.viste.length > 4) {
            specs.viste = specs.viste.slice(0, 4);
        }
        
        return specs;
    }
