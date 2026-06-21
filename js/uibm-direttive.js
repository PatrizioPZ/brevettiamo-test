// js/uibm-direttive.js — Direttive UIBM per verificatore
// Fonte: circolari UIBM + esperienza deposito reale (PatrizioPZ)

const UIBM_DIRETTIVE = {
    // ============================================================
    // DISEGNI / TAVOLE TECNICHE
    // ============================================================
    disegni: {
        formato: {
            foglio: 'A4 (21 x 29,7 cm)',
            margini: '25mm minimo',
            scala: 'indicata in tavola'
        },
        colori: {
            regola: 'SOLO bianco e nero',
            vietato: ['colori', 'grayscale', 'sfumature', 'ombreggiature'],
            eccezione: 'se colore è caratteristica rivendicata (design)'
        },
        numerazione: {
            formato: 'FIG. 1, FIG. 2, FIG. 3...',
            posizione: 'in alto o in basso tavola',
            soloNumero: 'SOLO "FIG. X" — nessuna descrizione aggiuntiva',
            esempio: 'FIG. 1\\nFIG. 2\\nFIG. 3'
        },
        numerazioneParti: {
            posizione: 'precisa e coerente in TUTTI i documenti',
            stessoNumero: 'es. 101 = corpo in disegni, rivendicazioni, descrizione',
            cerchi: 'bianchi con bordo nero, diametro ~3.5mm',
            font: 'Arial o Helvetica, 3.5mm'
        },
        testo: {
            regola: 'SOLO numeri, niente descrizioni scritte sul disegno',
            eccezione: 'indicazioni strettamente necessarie (scala, sezione)'
        },
        frecce: {
            regola: 'non devono entrare nel disegno',
            appoggio: 'toccano il bordo o sono esterne'
        },
        linee: {
            regola: 'linee che collegano numero al punto del disegno',
            tratteggio: 'usato per parti NON oggetto della rivendicazione'
        },
        spessori: {
            regola: 'diversi spessori per tipo di linea',
            continua: 'spessore base per contorno',
            tratteggiata: 'spessore ridotto per parti nascoste/non rivendicate'
        },
        viste: {
            obbligatorie: ['frontale', 'laterale', 'superiore'],
            opzionali: ['sezione', 'prospettiva', 'posteriore', 'dal basso'],
            allineamento: 'regola precisa di appoggio'
        },
        maxTavole: {
            numero: 7,
            nota: 'deposito reale: 7 tavole, ma potevano essere di più'
        },
        file: {
            formato: 'PDF',
            tipo: '1-bit bianco e nero puro, NO grayscale',
            conversione: 'PDF Love o strumento simile per 1-bit'
        }
    },

    // ============================================================
    // RIVENDICAZIONI
    // ============================================================
    rivendicazioni: {
        struttura: {
            indipendente: '1 minima, definisce essenza invenzione',
            dipendenti: 'restringono l\'indipendente'
        },
        numerazione: {
            coerenza: 'stessi numeri usati in descrizione e disegni',
            esempio: '101 = corpo in rivendicazione = 101 in disegno'
        },
        costi: {
            base: '50€ include prime 10 rivendicazioni',
            supplemento: 'oltre 10 ~250€ (da confermare)'
        },
        linguaggio: {
            indipendente: 'caratterizzato dal fatto di comprendere...',
            dipendente: 'ove...',
            vietato: ['inoltre', 'anche', 'in più']
        }
    },

    // ============================================================
    // DESCRIZIONE
    // ============================================================
    descrizione: {
        inizio: {
            campoTecnico: 'L\'invenzione è applicabile a livello industriale nei seguenti settori:',
            settori: 'lista puntata con punto e virgola',
            applicazione: 'L\'invenzione è particolarmente adatta per...'
        },
        sezioni: {
            obbligatorie: [
                'campo tecnico (settori di applicazione)',
                'stato dell\'arte',
                'riassunto dell\'invenzione',
                'descrizione dettagliata con esempi',
                'figure/disegni allegati (riferimenti FIG. X)'
            ]
        },
        numerazione: {
            coerenza: 'stessi numeri di rivendicazioni e disegni'
        }
    },

    // ============================================================
    // RIASSUNTO
    // ============================================================
    riassunto: {
        lunghezza: {
            italiano: 'max 150 parole',
            inglese: 'max 150 parole'
        },
        contenuto: 'sunto dell\'invenzione, NO disegni/formule',
        coerenza: 'deve corrispondere a rivendicazioni e descrizione'
    },

    // ============================================================
    // FORMATTAZIONE DOCUMENTI
    // ============================================================
    formattazione: {
        carta: 'A4 (21 x 29,7 cm)',
        margini: '25mm',
        font: {
            tipo: 'Arial, Helvetica o equivalente sans-serif',
            dimensione: '12pt corpo testo',
            titoli: '14pt o 16pt grassetto'
        },
        interlinea: '1.5',
        allineamento: 'giustificato',
        numerazione: {
            posizione: 'in basso',
            formato: 'numero progressivo'
        },
        intestazione: {
            contenuto: 'titolo del brevetto',
            posizione: 'in alto'
        },
        paragrafi: {
            rientro: 'prima riga indentata'
        }
    },

    // ============================================================
    // COSTI E SCADENZE
    // ============================================================
    costi: {
        depositoBase: '50€',
        include: ['prime 10 rivendicazioni'],
        supplementi: {
            rivendicazioniOltre10: '~250€ (da confermare)',
            pagineExtra: 'da verificare',
            tavoleExtra: 'da verificare'
        },
        integrazione: 'possibile integrare deposito con tassa aggiuntiva',
        pagamento: {
            f24: 'Arriva via email entro 24 ore',
            modalita: 'F24 da pagare presso banche/Poste/online'
        }
    },
    scadenze: {
        priorita: '12 mesi (Convenzione di Parigi)',
        pct: '30 mesi fase internazionale',
        tassaAnnuale: 'da pagare ogni anno',
        rinnovo: 'annuale tasse'
    }
};

// Esporta
if (typeof window !== 'undefined') {
    window.UIBM_DIRETTIVE = UIBM_DIRETTIVE;
}
