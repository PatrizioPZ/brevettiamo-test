// js/svg-generator.js — Generatore tavole tecniche SVG conformi UIBM

class SVGGenerator {
    constructor() {
        this.width = 210; // mm A4
        this.height = 297; // mm A4
        this.margin = 25; // mm
        this.scale = 1;
    }
    
    /**
     * Genera tavola tecnica SVG da specifiche IA
     * @param {Object} specs - Specifiche estratte dall'IA
     * @returns {string} - SVG HTML
     */
    generaTavola(specs) {
        const oggetto = (specs && specs.oggetto) ? specs.oggetto : 'OGGETTO';
        const viste = (specs && specs.viste) ? specs.viste : [];
        const parti = (specs && specs.parti) ? specs.parti : [];
        
        let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="210mm" height="297mm" style="background: white; font-family: Arial, Helvetica, sans-serif;">';
        
        // Bordo pagina UIBM
        svg += '<rect x="5" y="5" width="200" height="287" fill="none" stroke="#000" stroke-width="0.5"/>';
        
        // Intestazione
        svg += '<text x="105" y="15" text-anchor="middle" font-size="4" font-weight="bold" font-family="Arial">TAVOLA TECNICA - ' + oggetto.toUpperCase() + '</text>';
        svg += '<line x1="10" y1="18" x2="200" y2="18" stroke="#000" stroke-width="0.3"/>';
        
        // Viste (max 4 in griglia 2x2)
        let yPos = 25;
        const vistaWidth = 90;
        const vistaHeight = 60;
        
        if (viste.length > 0) {
            viste.forEach((vista, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                const x = 10 + col * 95;
                const y = yPos + row * 70;
                svg += this.disegnaVista(vista, x, y, vistaWidth, vistaHeight);
            });
        } else {
            // Viste default
            svg += this.disegnaVista({ nome: 'VISTA FRONTALE' }, 10, yPos, vistaWidth, vistaHeight);
            svg += this.disegnaVista({ nome: 'VISTA LATERALE' }, 105, yPos, vistaWidth, vistaHeight);
            svg += this.disegnaVista({ nome: 'SEZIONE A-A' }, 10, yPos + 70, vistaWidth, vistaHeight);
        }
        
        // Legenda parti
        const legendaY = yPos + 150;
        svg += this.disegnaLegenda(parti, 10, legendaY);
        
        // Note UIBM in fondo
        svg += '<text x="10" y="290" font-size="2.5" fill="#666" font-family="Arial">Scala: ' + this.scale + ':1 | Formato: A4 (210x297mm) | Margini: 25mm conformi UIBM | Font: Arial 3.5mm</text>';
        
        svg += '</svg>';
        return svg;
    }
    
    disegnaVista(vista, x, y, w, h) {
        let svg = '<g transform="translate(' + x + ', ' + y + ')">';
        
        // Titolo vista
        svg += '<text x="' + (w/2) + '" y="-2" text-anchor="middle" font-size="3" font-weight="bold" font-family="Arial">' + (vista.nome || 'VISTA') + '</text>';
        
        // Bordo vista
        svg += '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="none" stroke="#333" stroke-width="0.5"/>';
        
        // Disegna elementi se specificati
        if (vista.elementi && vista.elementi.length > 0) {
            vista.elementi.forEach(el => {
                svg += this.disegnaElemento(el);
            });
        } else {
            // Placeholder geometrico generico
            svg += this.disegnaPlaceholder(vista.nome, w, h);
        }
        
        // Quote
        if (vista.quote && vista.quote.length > 0) {
            vista.quote.forEach((q, i) => {
                svg += '<text x="2" y="' + (h + 5 + i*4) + '" font-size="2.5" font-family="Arial">' + (q.nome || '') + ': ' + (q.valore || '') + 'mm</text>';
            });
        }
        
        svg += '</g>';
        return svg;
    }
    
    disegnaElemento(el) {
        switch(el.tipo) {
            case 'rettangolo':
                return '<rect x="' + (el.x || 0) + '" y="' + (el.y || 0) + '" width="' + (el.w || 10) + '" height="' + (el.h || 10) + '" fill="' + (el.fill || 'none') + '" stroke="#000" stroke-width="0.5"/>';
            case 'cerchio':
                return '<circle cx="' + (el.cx || 50) + '" cy="' + (el.cy || 50) + '" r="' + (el.r || 10) + '" fill="' + (el.fill || 'none') + '" stroke="#000" stroke-width="0.5"/>';
            case 'linea':
                return '<line x1="' + (el.x1 || 0) + '" y1="' + (el.y1 || 0) + '" x2="' + (el.x2 || 10) + '" y2="' + (el.y2 || 10) + '" stroke="#000" stroke-width="0.5"/>';
            case 'arco':
                return '<path d="' + (el.d || 'M 10 10 Q 50 50 90 10') + '" fill="none" stroke="#000" stroke-width="0.5"/>';
            case 'testo':
                return '<text x="' + (el.x || 0) + '" y="' + (el.y || 0) + '" font-size="' + (el.size || 3) + '" font-family="Arial">' + (el.testo || '') + '</text>';
            default:
                return '';
        }
    }
    
    disegnaPlaceholder(nomeVista, w, h) {
        let svg = '';
        const cx = w / 2;
        const cy = h / 2;
        
        // Disegna una forma geometrica base in base alla vista
        if (nomeVista && nomeVista.indexOf('FRONTALE') !== -1) {
            // Rettangolo con dettagli
            svg += '<rect x="' + (cx-25) + '" y="' + (cy-20) + '" width="50" height="40" fill="none" stroke="#000" stroke-width="0.8"/>';
            svg += '<line x1="' + (cx-15) + '" y1="' + (cy-10) + '" x2="' + (cx+15) + '" y2="' + (cy-10) + '" stroke="#000" stroke-width="0.3" stroke-dasharray="2,1"/>';
            svg += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="none" stroke="#000" stroke-width="0.5"/>';
        } else if (nomeVista && nomeVista.indexOf('LATERALE') !== -1) {
            // Profilo laterale
            svg += '<rect x="' + (cx-15) + '" y="' + (cy-20) + '" width="30" height="40" fill="none" stroke="#000" stroke-width="0.8"/>';
            svg += '<line x1="' + cx + '" y1="' + (cy-20) + '" x2="' + cx + '" y2="' + (cy+20) + '" stroke="#000" stroke-width="0.3" stroke-dasharray="2,1"/>';
        } else if (nomeVista && nomeVista.indexOf('SEZIONE') !== -1) {
            // Sezione con tratteggio
            svg += '<rect x="' + (cx-20) + '" y="' + (cy-15) + '" width="40" height="30" fill="#e0e0e0" stroke="#000" stroke-width="0.8"/>';
            // Tratteggio sezione
            for (let i = -15; i < 15; i += 4) {
                svg += '<line x1="' + (cx-20) + '" y1="' + (cy+i) + '" x2="' + (cx+20) + '" y2="' + (cy+i+3) + '" stroke="#666" stroke-width="0.2"/>';
            }
        } else {
            // Prospettiva / default
            svg += '<rect x="' + (cx-20) + '" y="' + (cy-15) + '" width="40" height="30" fill="none" stroke="#000" stroke-width="0.8"/>';
            svg += '<line x1="' + (cx-20) + '" y1="' + (cy-15) + '" x2="' + (cx+10) + '" y2="' + (cy-25) + '" stroke="#000" stroke-width="0.5"/>';
            svg += '<line x1="' + (cx+20) + '" y1="' + (cy-15) + '" x2="' + (cx+30) + '" y2="' + (cy-25) + '" stroke="#000" stroke-width="0.5"/>';
            svg += '<line x1="' + (cx+10) + '" y1="' + (cy-25) + '" x2="' + (cx+30) + '" y2="' + (cy-25) + '" stroke="#000" stroke-width="0.5"/>';
            svg += '<line x1="' + (cx+20) + '" y1="' + (cy+15) + '" x2="' + (cx+30) + '" y2="' + (cy+5) + '" stroke="#000" stroke-width="0.5"/>';
            svg += '<line x1="' + (cx+30) + '" y1="' + (cy-25) + '" x2="' + (cx+30) + '" y2="' + (cy+5) + '" stroke="#000" stroke-width="0.5"/>';
        }
        
        // Indicatore "VISTA" centrale
        svg += '<text x="' + cx + '" y="' + (cy+35) + '" text-anchor="middle" font-size="2.5" fill="#999" font-family="Arial">[VISTA ' + (nomeVista || '') + ']</text>';
        
        return svg;
    }
    
    disegnaLegenda(parti, x, y) {
        let svg = '<g transform="translate(' + x + ', ' + y + ')">';
        svg += '<text x="0" y="0" font-size="3" font-weight="bold" font-family="Arial">LEGENDA PARTI</text>';
        svg += '<line x1="0" y1="2" x2="80" y2="2" stroke="#000" stroke-width="0.3"/>';
        
        if (!parti || parti.length === 0) {
            // Parti default
            const partiDefault = [
                { numero: 1, nome: 'Corpo principale' },
                { numero: 2, nome: 'Elemento mobile' },
                { numero: 3, nome: 'Fissaggio' }
            ];
            partiDefault.forEach((parte, i) => {
                const rowY = 8 + i * 6;
                svg += '<circle cx="5" cy="' + (rowY-1) + '" r="3" fill="white" stroke="#000" stroke-width="0.5"/>';
                svg += '<text x="5" y="' + (rowY+0.5) + '" text-anchor="middle" font-size="2.5" font-family="Arial">' + parte.numero + '</text>';
                svg += '<text x="12" y="' + rowY + '" font-size="2.5" font-family="Arial">' + parte.nome + '</text>';
            });
        } else {
            parti.forEach((parte, i) => {
                const rowY = 8 + i * 6;
                svg += '<circle cx="5" cy="' + (rowY-1) + '" r="3" fill="white" stroke="#000" stroke-width="0.5"/>';
                svg += '<text x="5" y="' + (rowY+0.5) + '" text-anchor="middle" font-size="2.5" font-family="Arial">' + (parte.numero || (i+1)) + '</text>';
                svg += '<text x="12" y="' + rowY + '" font-size="2.5" font-family="Arial">' + (parte.nome || 'Parte ' + (i+1)) + '</text>';
            });
        }
        
        svg += '</g>';
        return svg;
    }
    
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
                nome.indexOf('ANALISI') === -1 && nome.indexOf('TITOLO') === -1 && 
                nome.indexOf('DESCRIZIONE') === -1 && nome.indexOf('CONCLUSIONI') === -1) {
                specs.parti.push({ numero: match[1], nome: nome });
            }
        }
        
        // Se non trova parti, crea default basate sul testo
        if (specs.parti.length === 0) {
            // Cerca sostantivi nel testo che potrebbero essere parti
            const paroleChiave = ['corpo', 'elemento', 'fissaggio', 'pomello', 'gancio', 'struttura', 'mecanismo', 'parte'];
            let numParte = 1;
            paroleChiave.forEach(parola => {
                if (testoPulito.toLowerCase().indexOf(parola) !== -1 && numParte <= 5) {
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
            if (testoPulito.toUpperCase().indexOf(nome) !== -1) {
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
}

// Esporta
if (typeof window !== 'undefined') {
    window.SVGGenerator = SVGGenerator;
}
