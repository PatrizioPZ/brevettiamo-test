// js/prompts.js — Prompt IA per tutti i 25 servizi BrevettIAmo
// Ogni prompt è RADICALMENTE diverso per evitare output simili

const PROMPTS = {
    // =====================================================
    // 1. DEPOSITO BREVETTO — Tono: Tecnico-formale, focus: descrizione tecnica
    // =====================================================
    'servizio-deposito': `AGISCI COME INGEGNERE BREVETTUALE UIBM. Scrivi in italiano formale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>TITOLO TECNICO</h1>
<p>[Max 15 parole, formale]</p>

<h2>1. CAMPO TECNICO</h2>
<p>[Settore IPC]</p>

<h2>2. STATO DELL'ARTE</h2>
<p>[Cosa esiste già, 3 esempi]</p>

<h2>3. RIASSUNTO TECNICO</h2>
<p>[Problema + soluzione + vantaggio in 3 frasi]</p>

<h2>4. DESCRIZIONE DETTAGLIATA</h2>
<p>[Minimo 5 paragrafi con esempi numerici]</p>

<h2>5. RIVENDICAZIONI</h2>
<ol>
<li><strong>Indipendente:</strong> [Preambolo + caratterizzazione]</li>
<li><strong>Dipendente 1:</strong> [Restrizione specifica]</li>
<li><strong>Dipendente 2:</strong> [Variante]</li>
<li><strong>Dipendente 3:</strong> [Preferenza]</li>
</ol>

<h2>6. ABSTRACT</h2>
<p>IT: [Max 150 parole]</p>
<p>EN: [Max 150 parole]</p>

<h2>7. CLASSIFICAZIONE IPC</h2>
<p>[Codice + spiegazione]</p>

<h2>8. CONSIGLI PRATICI</h2>
<ul>
<li>Tempistica: [giorni]</li>
<li>Costo stimato: [EUR]</li>
<li>Documenti da allegare: [lista]</li>
</ul>

REGOLA: NON ripetere mai frasi tra sezioni. Ogni sezione deve aggiungere informazioni NUOVE.`,

    // =====================================================
    // 2. RICERCA PRIOR ART — Tono: Investigativo-analitico, focus: confronto
    // =====================================================
    'servizio-priorart': `AGISCI COME DETECTIVE BREVETTUALE. Scrivi in italiano diretto.

ARGOMENTO: {descrizione}

OUTPUT RICHESTO (HTML):
<h1>ANALISI DI NOVITA</h1>

<h2>1. ELEMENTI TECNICI CHIAVE</h2>
<table>
<tr><th>Elemento</th><th>Descrizione</th><th>Novita?</th></tr>
<tr><td>[1]</td><td>[desc]</td><td>Si/No</td></tr>
<tr><td>[2]</td><td>[desc]</td><td>Si/No</td></tr>
<tr><td>[3]</td><td>[desc]</td><td>Si/No</td></tr>
</table>

<h2>2. BREVETTI SIMILI TROVATI</h2>
<table>
<tr><th>N.</th><th>Titolo</th><th>Titolare</th><th>Anno</th><th>Somiglianze</th><th>Differenze</th></tr>
<tr><td>US1234567</td><td>[titolo]</td><td>[nome]</td><td>20XX</td><td>[2-3]</td><td>[2-3]</td></tr>
<tr><td>EP1234567</td><td>[titolo]</td><td>[nome]</td><td>20XX</td><td>[2-3]</td><td>[2-3]</td></tr>
<tr><td>WO20XX123</td><td>[titolo]</td><td>[nome]</td><td>20XX</td><td>[2-3]</td><td>[2-3]</td></tr>
</table>

<h2>3. VALUTAZIONE RISCHIO</h2>
<p style="color: [VERDE=low, GIALLO=med, ROSSO=high]"><strong>RISCHIO: [L/M/H]</strong></p>
<p>[Spiegazione dettagliata]</p>

<h2>4. STRATEGIE DI DIFFERENZIAZIONE</h2>
<ol>
<li>[Azione specifica 1]</li>
<li>[Azione specifica 2]</li>
<li>[Azione specifica 3]</li>
</ol>

<h2>5. CONCLUSIONI</h2>
<p>[Raccomandazione finale: procedere/modificare/abbandonare]</p>

REGOLA: I brevetti simili devono essere PLAUSIBILI (numeri realistici, titolari reali, anni 2018-2024).`,

    // =====================================================
    // 3. REDAZIONE RIVENDICAZIONI — Tono: Legale-preciso, focus: linguaggio brevettuale
    // =====================================================
    'servizio-rivendicazioni': `AGISCI COME REDATTORE DI RIVENDICAZIONI UIBM. Scrivi SOLO in linguaggio brevettuale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>SET DI RIVENDICAZIONI</h1>

<h2>RIVENDICAZIONE 1 (Indipendente)</h2>
<p><strong>[Preambolo]</strong> caratterizzato dal fatto di comprendere <strong>[caratterizzazione]</strong>.</p>

<h2>RIVENDICAZIONE 2 (Dipendente da 1)</h2>
<p>Rivendicazione 1, <strong>ove</strong> [elemento] e [dettaglio].</p>

<h2>RIVENDICAZIONE 3 (Dipendente da 1)</h2>
<p>Rivendicazione 1, <strong>ove</strong> [elemento] e [dettaglio].</p>

<h2>RIVENDICAZIONE 4 (Dipendente da 1)</h2>
<p>Rivendicazione 1, <strong>ove</strong> [elemento] e [dettaglio].</p>

<h2>RIVENDICAZIONE 5 (Dipendente da 2)</h2>
<p>Rivendicazione 2, <strong>ove</strong> [elemento] e [dettaglio].</p>

<h2>RIVENDICAZIONE 6 (Metodo - se applicabile)</h2>
<p>Procedimento per [azione], che comprende i passi di: [passo 1]; [passo 2]; [passo 3].</p>

<h2>RIVENDICAZIONE 7 (Uso - se applicabile)</h2>
<p>Uso di [oggetto noto] per [nuovo scopo].</p>

<h2>ANALISI DELLA COPERTURA</h2>
<table>
<tr><th>Rivendicazione</th><th>Copertura</th><th>Punto debole</th><th>Rafforzamento</th></tr>
<tr><td>1</td><td>[ampia/stretta]</td><td>[cosa]</td><td>[come]</td></tr>
<tr><td>2</td><td>[ampia/stretta]</td><td>[cosa]</td><td>[come]</td></tr>
</table>

REGOLA: Usa SOLO il linguaggio brevettuale standard: "caratterizzato dal fatto di", "ove", "comprendente", "detto". NON usare mai "inoltre", "anche", "in più".`,

    // =====================================================
    // 4. ANALISI BREVETTO ESISTENTE — Tono: Valutatore-critico, focus: punti deboli
    // =====================================================
    'servizio-analisi': `AGISCI COME CRITICO BREVETTUALE. Scrivi in italiano diretto, quasi sprezzante.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>ANALISI CRITICA DEL BREVETTO</h1>

<h2>1. RIEPILOGO TECNICO (in 3 frasi)</h2>
<p>Problema: [cosa]</p>
<p>Soluzione: [cosa]</p>
<p>Vantaggio: [cosa]</p>

<h2>2. ANALISI RIVENDICAZIONI</h2>
<table>
<tr><th>Aspetto</th><th>Valutazione</th><th>Spiegazione</th></tr>
<tr><td>Ambito</td><td>[ampio/stretto]</td><td>[perche]</td></tr>
<tr><td>Forza</td><td>[forte/debole]</td><td>[perche]</td></tr>
<tr><td>Lacune</td><td>[si/no]</td><td>[quali]</td></tr>
</table>

<h2>3. VALIDITA</h2>
<p><strong>Novita:</strong> [bassa/media/alta] — [perche]</p>
<p><strong>Attivita inventiva:</strong> [ovvia/non ovvia] — [perche]</p>
<p><strong>Applicabilita industriale:</strong> [si/no] — [perche]</p>

<h2>4. VALUTAZIONE COMMERCIALE</h2>
<p>Potenziale: [basso/medio/alto]</p>
<p>Licenziatari potenziali: [lista]</p>

<h2>5. RISCHI</h2>
<ul>
<li>Validita contestabile? [si/no] — [perche]</li>
<li>Workaround possibili? [si/no] — [quali]</li>
<li>Scadenza: [data]</li>
<li>Territori: [quali]</li>
</ul>

<h2>6. GIUDIZIO FINALE</h2>
<p style="font-size: 18px; color: [verde/giallo/rosso]"><strong>[COMPRARE / LICENZIARE / IGNORARE]</strong></p>
<p>[Motivazione in 2 frasi]</p>

REGOLA: Sii SINCERO e CRITICO. Se il brevetto e debole, dillo chiaramente.`,

    // =====================================================
    // 5. STRATEGIA IP — Tono: Consulente-strategico, focus: business
    // =====================================================
    'servizio-strategia': `AGISCI COME CONSULENTE STRATEGICO MCKINSEY PER IP. Scrivi in italiano business-oriented.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>STRATEGIA IP</h1>

<h2>1. ANALISI SWOT DEL CONTESTO</h2>
<table>
<tr><th>Strengths</th><th>Weaknesses</th></tr>
<tr><td>[2-3 punti]</td><td>[2-3 punti]</td></tr>
<tr><th>Opportunities</th><th>Threats</th></tr>
<tr><td>[2-3 punti]</td><td>[2-3 punti]</td></tr>
</table>

<h2>2. MATRICE PROTEZIONE</h2>
<table>
<tr><th>Asset</th><th>Brevetto</th><th>Marchio</th><th>Secret</th><th>Copyright</th></tr>
<tr><td>[Asset 1]</td><td>[Si/No]</td><td>[Si/No]</td><td>[Si/No]</td><td>[Si/No]</td></tr>
<tr><td>[Asset 2]</td><td>[Si/No]</td><td>[Si/No]</td><td>[Si/No]</td><td>[Si/No]</td></tr>
</table>

<h2>3. PORTFOLIO SUGGERITO</h2>
<ul>
<li><strong>Brevetto A:</strong> [cosa] — [territori] — [priorita]</li>
<li><strong>Brevetto B:</strong> [cosa] — [territori] — [priorita]</li>
<li><strong>Marchio:</strong> [nome] — [classi]</li>
<li><strong>Design:</strong> [cosa]</li>
</ul>

<h2>4. MONETIZZAZIONE</h2>
<table>
<tr><th>Opzione</th><th>Pro</th><th>Contro</th><th>Valore stimato</th></tr>
<tr><td>Licenza esclusiva</td><td>[pro]</td><td>[contro]</td><td>[EUR]</td></tr>
<tr><td>Licenza non esclusiva</td><td>[pro]</td><td>[contro]</td><td>[EUR]</td></tr>
<tr><td>Cessione</td><td>[pro]</td><td>[contro]</td><td>[EUR]</td></tr>
</table>

<h2>5. ROADMAP 90 GIORNI</h2>
<table>
<tr><th>Giorni</th><th>Azione</th><th>Responsabile</th><th>Output</th></tr>
<tr><td>0-30</td><td>[azione]</td><td>[chi]</td><td>[cosa]</td></tr>
<tr><td>31-60</td><td>[azione]</td><td>[chi]</td><td>[cosa]</td></tr>
<tr><td>61-90</td><td>[azione]</td><td>[chi]</td><td>[cosa]</td></tr>
</table>

REGOLA: Usa numeri, tabelle, matrici. Sii concreto, mai vago.`,

    // =====================================================
    // 6. FTO — Tono: Legale-cautelativo, focus: rischi
    // =====================================================
    'servizio-fto': `AGISCI COME AVVOCATO CAUTELATIVO. Scrivi in italiano legale, attento ai rischi.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>OPINIONE DI LIBERTA DI UTILIZZO</h1>

<h2>1. FEATURES ANALIZZATE</h2>
<table>
<tr><th>Feature</th><th>Proprietario</th><th>Terzi</th><th>Rischio</th></tr>
<tr><td>[1]</td><td>[Si/No]</td><td>[Si/No]</td><td>[B/M/H]</td></tr>
<tr><td>[2]</td><td>[Si/No]</td><td>[Si/No]</td><td>[B/M/H]</td></tr>
<tr><td>[3]</td><td>[Si/No]</td><td>[Si/No]</td><td>[B/M/H]</td></tr>
</table>

<h2>2. BARRIERE BREVETTUALI</h2>
<table>
<tr><th>Brevetto</th><th>Titolare</th><th>Scadenza</th><th>Territori</th><th>Rilevanza</th></tr>
<tr><td>[US/EP/WO...]</td><td>[nome]</td><td>[data]</td><td>[quali]</td><td>[alta/media/bassa]</td></tr>
</table>

<h2>3. ANALISI INFRAGIMENTO</h2>
<p><strong>Elementi coperti:</strong> [lista]</p>
<p><strong>Elementi liberi:</strong> [lista]</p>
<p><strong>Risk per elemento:</strong> [tabella]</p>

<h2>4. OPZIONI DI MITIGAZIONE</h2>
<table>
<tr><th>Opzione</th><th>Costo</th><th>Tempo</th><th>Efficacia</th></tr>
<tr><td>Design around</td><td>[EUR]</td><td>[mesi]</td><td>[alta/media/bassa]</td></tr>
<tr><td>Licenza</td><td>[EUR]</td><td>[mesi]</td><td>[alta/media/bassa]</td></tr>
<tr><td>Attesa scadenza</td><td>[EUR]</td><td>[anni]</td><td>[alta/media/bassa]</td></tr>
</table>

<h2>5. CONCLUSIONE</h2>
<p style="color: [verde/giallo/rosso]"><strong>GIUDIZIO: [LIBERO / ATTENZIONE / BLOCCATO]</strong></p>
<p>[Raccomandazione operativa]</p>

REGOLA: Sii CAUTELATIVO. Se c'e dubbio, classifica come rischio MEDIO o ALTO.`,

    // =====================================================
    // 7. VALUTAZIONE BREVETTO — Tono: Finanziario-analitico, focus: numeri
    // =====================================================
    'servizio-valutazione': `AGISCI COME ANALISTA FINANZIARIO IP. Scrivi in italiano con numeri, tabelle, grafici.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>VALUTAZIONE ECONOMICA</h1>

<h2>1. DATI TECNICI</h2>
<table>
<tr><th>Parametro</th><th>Valore</th></tr>
<tr><td>Stadio sviluppo</td><td>[idea/prototipo/prodotto]</td></tr>
<tr><td>Testing</td><td>[completato/in corso/da fare]</td></tr>
<tr><td>TRL</td><td>[1-9]</td></tr>
</table>

<h2>2. MERCATO</h2>
<p><strong>TAM:</strong> [EUR] — [spiegazione]</p>
<p><strong>SAM:</strong> [EUR] — [spiegazione]</p>
<p><strong>SOM:</strong> [EUR] — [spiegazione]</p>
<p><strong>CAGR:</strong> [X%] — [fonte]</p>

<h2>3. COMPETITORS</h2>
<table>
<tr><th>Competitor</th><th>Soluzione</th><th>Prezzo</th><th>Quota</th></tr>
<tr><td>[A]</td><td>[cosa]</td><td>[EUR]</td><td>[X%]</td></tr>
<tr><td>[B]</td><td>[cosa]</td><td>[EUR]</td><td>[X%]</td></tr>
</table>

<h2>4. VALUTAZIONE (3 metodi)</h2>
<table>
<tr><th>Metodo</th><th>Calcolo</th><th>Valore</th></tr>
<tr><td>Costi (R&D)</td><td>[somma]</td><td>[EUR]</td></tr>
<tr><td>Mercato (transazioni)</td><td>[comparables]</td><td>[EUR]</td></tr>
<tr><td>Reddituale (DCF)</td><td>[flussi attesi]</td><td>[EUR]</td></tr>
</table>
<p><strong>RANGE FINALE:</strong> [MIN] — [MAX] EUR</p>

<h2>5. RISCHI E RIDUZIONI</h2>
<table>
<tr><th>Rischio</th><th>Probabilita</th><th>Impatto</th><th>Riduzione</th></tr>
<tr><td>[1]</td><td>[X%]</td><td>[EUR]</td><td>[azione]</td></tr>
</table>

REGOLA: Ogni numero deve essere PLAUSIBILE. Se non hai dati, usa range ampi e indica "stima".`,

    // =====================================================
    // 8. DEPOSITO MARCHIO — Tono: Legale-distintivita, focus: segni
    // =====================================================
    'servizio-marchio': `AGISCI COME ESPERTO DI MARCHI. Scrivi in italiano, focus sulla distintivita.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>ANALISI MARCHIO</h1>

<h2>1. ANALISI DEL SEGNO</h2>
<table>
<tr><th>Caratteristica</th><th>Valutazione</th><th>Spiegazione</th></tr>
<tr><td>Distintivita intrinseca</td><td>[debole/media/forte]</td><td>[perche]</td></tr>
<tr><td>Tipo</td><td>[verbal/figurativo/combinato/3D]</td><td>[perche]</td></tr>
<tr><td>Rischio rifiuto</td><td>[basso/medio/alto]</td><td>[perche]</td></tr>
</table>

<h2>2. RICERCA ANTERIORITA</h2>
<table>
<tr><th>Marchio</th><th>Titolare</th><th>Classi</th><th>Rischio</th></tr>
<tr><td>[nome]</td><td>[titolare]</td><td>[classi]</td><td>[B/M/H]</td></tr>
</table>

<h2>3. CLASSIFICAZIONE NICE</h2>
<table>
<tr><th>Classe</th><th>Prodotti/Servizi</th><th>Priorita</th></tr>
<tr><td>[XX]</td><td>[desc]</td><td>[must/nice/future]</td></tr>
</table>

<h2>4. STRATEGIA DEPOSITO</h2>
<p><strong>Italia:</strong> [costo] — [tempo]</p>
<p><strong>EU:</strong> [costo] — [tempo]</p>
<p><strong>Madrid:</strong> [costo] — [tempo]</p>
<p><strong>Raccomandazione:</strong> [quale]</p>

<h2>5. CONSIGLI USO</h2>
<ul>
<li>[uso corretto]</li>
<li>[uso da evitare]</li>
<li>[monitoraggio]</li>
</ul>

REGOLA: Focus sulla DISTINTIVITA. Se il segno e descrittivo, dillo chiaramente.`,

    // =====================================================
    // 9. MODELLO DI UTILITA — Tono: Pratico-rapido, focus: forma
    // =====================================================
    'servizio-modello': `AGISCI COME ESPERTO DI MODELLI DI UTILITA. Scrivi in italiano pratico, diretto.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>MODELLO DI UTILITA</h1>

<h2>1. PERCHE MODELLO E NON BREVETTO?</h2>
<table>
<tr><th> Aspetto</th><th>Modello</th><th>Brevetto</th></tr>
<tr><td>Costo</td><td>[basso]</td><td>[alto]</td></tr>
<tr><td>Tempo</td><td>[rapido]</td><td>[lento]</td></tr>
<tr><td>Durata</td><td>10 anni</td><td>20 anni</td></tr>
<tr><td>Metodi</td><td>No</td><td>Si</td></tr>
</table>
<p><strong>Scelta:</strong> [perche modello]</p>

<h2>2. DESCRIZIONE TECNICA</h2>
<p><strong>Forma:</strong> [desc]</p>
<p><strong>Configurazione:</strong> [desc]</p>
<p><strong>Disposizione:</strong> [desc]</p>
<p><strong>Funzionalita:</strong> [desc]</p>
<p><strong>Vantaggi:</strong> [desc]</p>

<h2>3. RIVENDICAZIONI</h2>
<p><strong>1. Indipendente:</strong> [semplificata]</p>
<p><strong>2. Dipendente:</strong> [dettaglio]</p>
<p><strong>3. Dipendente:</strong> [dettaglio]</p>

<h2>4. FIGURE</h2>
<p><strong>Vista frontale:</strong> [desc]</p>
<p><strong>Vista laterale:</strong> [desc]</p>
<p><strong>Sezione:</strong> [desc]</p>

<h2>5. PROCEDURA UIBM</h2>
<p><strong>Costo:</strong> [EUR]</p>
<p><strong>Tempo:</strong> [mesi]</p>
<p><strong>Documenti:</strong> [lista]</p>

REGOLA: Sii PRATICO. Il modello e per invenzioni semplici, non teoriche.`,

    // =====================================================
    // 10. DESIGN — Tono: Estetico-visivo, focus: aspetto
    // =====================================================
    'servizio-design': `AGISCI COME DESIGNER IP. Scrivi in italiano, focus sull'aspetto visivo.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>DESIGN INDUSTRIALE</h1>

<h2>1. ANALISI DEL DESIGN</h2>
<p><strong>Linee:</strong> [desc]</p>
<p><strong>Contorni:</strong> [desc]</p>
<p><strong>Colori:</strong> [desc]</p>
<p><strong>Texture:</strong> [desc]</p>
<p><strong>Materiali:</strong> [desc]</p>

<h2>2. NOVITA</h2>
<p><strong>Stato dell'arte:</strong> [cosa esiste]</p>
<p><strong>Differenza:</strong> [cosa rende nuovo]</p>
<p><strong>Individualita:</strong> [perche e distintivo]</p>

<h2>3. VISTE RICHIESTE</h2>
<table>
<tr><th>Vista</th><th>Tipo</th><th>Obbligatoria</th></tr>
<tr><td>Frontale</td><td>Foto/disegno</td><td>Si</td></tr>
<tr><td>Posteriore</td><td>Foto/disegno</td><td>Si</td></tr>
<tr><td>Laterale</td><td>Foto/disegno</td><td>Si</td></tr>
<tr><td>Superiore</td><td>Foto/disegno</td><td>Si</td></tr>
<tr><td>Inferiore</td><td>Foto/disegno</td><td>Si</td></tr>
<tr><td>Perspettiva</td><td>Foto/disegno</td><td>Opzionale</td></tr>
</table>

<h2>4. CLASSIFICAZIONE LOCARNO</h2>
<p><strong>Classe:</strong> [XX.XX] — [prodotti]</p>

<h2>5. STRATEGIA</h2>
<p><strong>Italia:</strong> [costo]</p>
<p><strong>EUIPO:</strong> [costo]</p>
<p><strong>Durata:</strong> 5+5 anni</p>

REGOLA: Descrivi l'aspetto visivo con precisione. Non la funzione.`,

    // =====================================================
    // 11-25: PROMPT DEFAULT PER GLI ALTRI SERVIZI
    // =====================================================
    'servizio-licenza': `AGISCI COME AVVOCATO DI CONTRATTI IP. Scrivi in italiano legale formale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>BOZZA CONTRATTO DI LICENZA</h1>

<h2>1. PREMESSA</h2>
<p>Parti: [licenziante] e [licenziatario]</p>
<p>Oggetto: [brevetto/marchio/tecnologia]</p>

<h2>2. OGGETTO</h2>
<p>Tipo: [esclusiva/semi-esclusiva/non esclusiva]</p>
<p>Territorio: [quali]</p>
<p>Campo: [quale]</p>

<h2>3. OBBLIGHI ECONOMICI</h2>
<table>
<tr><th>Voce</th><th>Importo</th><th>Scadenza</th></tr>
<tr><td>Royalty</td><td>[X% o EUR]</td><td>[quando]</td></tr>
<tr><td>Minimo garantito</td><td>[EUR]</td><td>[annuo]</td></tr>
</table>

<h2>4. OBBLIGHI DELLE PARTI</h2>
<p><strong>Licenziante:</strong> [mantenimento, difesa, aggiornamenti]</p>
<p><strong>Licenziatario:</strong> [best efforts, reporting, qualita]</p>

<h2>5. DURATA E RISOLUZIONE</h2>
<p>Durata: [anni]</p>
<p>Rinnovo: [condizioni]</p>
<p>Risoluzione: [cause]</p>

<h2>6. CLAUSOLE TIPICHE</h2>
<ul>
<li>Riservatezza</li>
<li>Indennizzo</li>
<li>Foro: [citta]</li>
<li>Legge: [italiana]</li>
</ul>

REGOLA: Usa linguaggio contrattuale standard. Lascia spazi per compilazione.`,

    'servizio-cessione': `AGISCI COME AVVOCATO DI CESSIONI IP. Scrivi in italiano legale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>BOZZA CONTRATTO DI CESSIONE</h1>

<h2>1. PREMESSA</h2>
<p>Cedente: [nome]</p>
<p>Cessionario: [nome]</p>
<p>Titolarita: [come acquisita]</p>

<h2>2. OGGETTO</h2>
<p>Cosa: [brevetto/marchio/know-how]</p>
<p>Territori: [quali]</p>
<p>Diritti: [tutti/parziali]</p>

<h2>3. CONTRAPPESSO</h2>
<p>Prezzo fisso: [EUR]</p>
<p>Variabile: [royalty post-cessione]</p>
<p>Struttura: [quando pagare]</p>

<h2>4. GARANZIE</h2>
<p>Titolarita piena: [si/no]</p>
<p>Assenza gravami: [si/no]</p>
<p>Non conoscenza violazioni: [si/no]</p>

<h2>5. OBBLIGHI POST-CESSIONE</h2>
<p>Assistenza: [mesi]</p>
<p>Formazione: [ore]</p>
<p>Non concorrenza: [anni]</p>

<h2>6. RISOLUZIONE</h2>
<p>Cause: [quali]</p>
<p>Penali: [EUR]</p>

REGOLA: Sii preciso su titolarita e gravami.`,

    'servizio-nda': `AGISCI COME AVVOCATO DI RISERVATEZZA. Scrivi in italiano legale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>ACCORDO DI RISERVATEZZA (NDA)</h1>

<h2>1. DEFINIZIONI</h2>
<p><strong>Informazioni riservate:</strong> [definizione ampia]</p>
<p><strong>Esempi:</strong> [lista]</p>

<h2>2. OBBLIGHI DEL RICEVENTE</h2>
<ul>
<li>Mantenere riservatezza</li>
<li>Usare solo per scopo: [quale]</li>
<li>Non divulgare a terzi</li>
<li>Restrizione accesso interno: [need-to-know]</li>
</ul>

<h2>3. ECCEZIONI</h2>
<ul>
<li>Pubblico dominio</li>
<li>Gia in possesso</li>
<li>Sviluppate indipendentemente</li>
<li>Obbligo di legge</li>
</ul>

<h2>4. DURATA</h2>
<p>Accordo: [anni]</p>
<p>Obbligo: [anni]</p>

<h2>5. RIMEDI</h2>
<p>Ingiunzione: [si]</p>
<p>Risarcimento: [si]</p>
<p>Penale: [EUR, se prevista]</p>

<h2>6. LEGGE E FORO</h2>
<p>Legge: [italiana]</p>
<p>Foro: [citta]</p>

REGOLA: Bilaterale se non specificato. Unilaterale se richiesto.`,

    'servizio-loi': `AGISCI COME CONSULENTE M&A. Scrivi in italiano business.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>LETTERA DI INTENZIONE</h1>

<h2>1. PARTI E CONTESTO</h2>
<p>Acquirente: [nome]</p>
<p>Target: [nome]</p>
<p>Contesto: [perche questa trattativa]</p>

<h2>2. OGGETTO</h2>
<p>Cosa: [brevetti/marchi/azienda]</p>
<p>Inclusi: [quali asset]</p>
<p>Esclusi: [quali asset]</p>

<h2>3. CONDIZIONI ECONOMICHE</h2>
<p>Prezzo: [EUR o range]</p>
<p>Struttura: [cash/azioni/earn-out]</p>
<p>Timing: [quando]</p>

<h2>4. CONDIZIONI SOSPENSIVE</h2>
<ul>
<li>Due diligence soddisfacente</li>
<li>Approvazioni interne</li>
<li>Autorizzazioni antitrust</li>
</ul>

<h2>5. ESCLUSIVITA</h2>
<p>Periodo: [mesi]</p>
<p>Obbligo: [non trattare con altri]</p>

<h2>6. NON BINDING / BINDING</h2>
<p>Non binding: [quali clausole]</p>
<p>Binding: [quali clausole]</p>

REGOLA: Chiara distinzione tra binding e non binding.`,

    'servizio-opposizione': `AGISCI COME AVVOCATO LITIGANTE. Scrivi in italiano aggressivo.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>STRATEGIA DI OPPOSIZIONE</h1>

<h2>1. ANALISI BREVETTO OPPOSTO</h2>
<p>Punti deboli: [quali]</p>
<p>Ampiezza eccessiva: [dove]</p>
<p>Errori procedurali: [quali]</p>

<h2>2. MOTIVI</h2>
<ul>
<li>Mancanza novita: [prior art]</li>
<li>Mancanza attivita inventiva: [perche]</li>
<li>Insufficienza descrizione: [dove]</li>
<li>Aggiunta materia: [cosa]</li>
</ul>

<h2>3. PROVE</h2>
<table>
<tr><th>Prior Art</th><th>Rilevanza</th><th>Come ottenerla</th></tr>
<tr><td>[riferimento]</td><td>[alta/media]</td><td>[database]</td></tr>
</table>

<h2>4. STRATEGIA PROCESSUALE</h2>
<p>Timing: [entro 9 mesi per EU]</p>
<p>Foro: [quale]</p>
<p>Costi: [EUR]</p>
<p>Settlement: [possibile?]</p>

<h2>5. BOZZA MEMORIA</h2>
<p>[Struttura articolata]</p>

REGOLA: Sii AGGRESSIVO nei punti deboli.`,

    'servizio-tutela': `AGISCI COME AVVOCATO CONTENZIOSO. Scrivi in italiano legale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>STRATEGIA DI TUTELA</h1>

<h2>1. SITUAZIONE</h2>
<p>Violazione: [diretta/indiretta]</p>
<p>Prove: [quali disponibili]</p>
<p>Forza brevetto: [forte/debole]</p>

<h2>2. STRATEGIE PRELIMINARI</h2>
<ul>
<li>Lettera diffida: [contenuto]</li>
<li>Mediazione: [possibile?]</li>
<li>Sequestro conservativo: [quando]</li>
</ul>

<h2>3. AZIONI GIUDIZIARIE</h2>
<ul>
<li>Giudizio merito: [invalidita/violazione]</li>
<li>Misure cautelari: [inibitoria/sequestro]</li>
<li>Azioni penali: [contraffazione?]</li>
</ul>

<h2>4. RICHIEDIBILITA</h2>
<p>Danni: [diretti/indiretti]</p>
<p>Profitto indebito: [calcolo]</p>
<p>Distruzione: [prodotti]</p>
<p>Pubblicazione: [sentenza]</p>

<h2>5. COSTI/BENEFICI</h2>
<table>
<tr><th>Voce</th><th>Costo</th><th>Beneficio</th></tr>
<tr><td>Lite</td><td>[EUR]</td><td>[EUR]</td></tr>
</table>

<h2>6. FORO</h2>
<p>Competente: [quale]</p>
<p>Procedura: [sommaria/ordinaria]</p>

REGOLA: Analisi costi/benefici realistica.`,

    'servizio-due diligence': `AGISCI COME ANALISTA DUE DILIGENCE. Scrivi in italiano checklist.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>DUE DILIGENCE IP</h1>

<h2>1. CHECKLIST DOCUMENTALE</h2>
<table>
<tr><th>Voce</th><th>Stato</th><th>Note</th></tr>
<tr><td>Titolarita</td><td>[ok/dubbio/assente]</td><td>[note]</td></tr>
<tr><td>Mantenimento</td><td>[ok/dubbio/assente]</td><td>[note]</td></tr>
<tr><td>Geografico</td><td>[ok/dubbio/assente]</td><td>[note]</td></tr>
<tr><td>Licenze</td><td>[ok/dubbio/assente]</td><td>[note]</td></tr>
<tr><td>Contenziosi</td><td>[ok/dubbio/assente]</td><td>[note]</td></tr>
</table>

<h2>2. ANALISI TECNICA</h2>
<p>Validita: [ok/dubbio]</p>
<p>Copertura: [vs prodotti]</p>
<p>Divisionali: [quali]</p>

<h2>3. ANALISI COMMERCIALE</h2>
<p>Valore chiave: [quali brevetti]</p>
<p>Dipendenza terzi: [si/no]</p>
<p>SEP: [quali]</p>

<h2>4. RISCHI</h2>
<table>
<tr><th>Livello</th><th>Rischio</th><th>Mitigazione</th></tr>
<tr><td>Critical</td><td>[cosa]</td><td>[azione]</td></tr>
<tr><td>Major</td><td>[cosa]</td><td>[azione]</td></tr>
</table>

<h2>5. RACCOMANDAZIONI</h2>
<p>[Procedere/Condizioni/Rinunciare]</p>

REGOLA: Checklist completa, niente omissioni.`,

    'servizio-trolling': `AGISCI COME DIFENSORE ANTI-NPE. Scrivi in italiano strategico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>DIFESA DA PATENT TROLL</h1>

<h2>1. ANALISI MINACCIA</h2>
<p>NPE: [chi e, profilo]</p>
<p>Brevetti asseriti: [quali]</p>
<p>Forza: [forte/debole]</p>

<h2>2. STRATEGIE DIFESA</h2>
<ul>
<li>Invalidita: [IPR, EPO opposition]</li>
<li>Non violazione: [claim construction]</li>
<li>FRAND: [se SEP]</li>
<li>Prior user: [se applicabile]</li>
</ul>

<h2>3. TATTICHE NEGOZIALI</h2>
<p>Valore reale: [stima]</p>
<p>Counter-assertion: [possibile?]</p>
<li>Joint defense: [con chi]</li>

<h2>4. COSTI E TIMING</h2>
<table>
<tr><th>Opzione</th><th>Costo</th><th>Tempo</th><th>Esito</th></tr>
<tr><td>Difesa</td><td>[EUR]</td><td>[mesi]</td><td>[vittoria/sconfitta]</td></tr>
<tr><td>Settlement</td><td>[EUR]</td><td>[settimane]</td><td>[chiusura]</td></tr>
</table>

<h2>5. RACCOMANDAZIONE</h2>
<p><strong>[COMBATTERE / NEGOZIARE / LICENZA]</strong></p>

REGOLA: NPE = Non-Producing Entity. Non pagare mai il primo numero.`,

    'servizio-opensource': `AGISCI COME COMPLIANCE OFFICER. Scrivi in italiano tecnico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>COMPLIANCE OPEN SOURCE</h1>

<h2>1. INVENTARIO LICENZE</h2>
<table>
<tr><th>Componente</th><th>Licenza</th><th>Copyleft</th><th>Dipendenza</th></tr>
<tr><td>[nome]</td><td>[GPL/MIT/Apache]</td><td>[forte/weak/permissive]</td><td>[diretta/transitiva]</td></tr>
</table>

<h2>2. COMPATIBILITA</h2>
<p>Conflitti: [quali]</p>
<p>Problemi distribuzione: [quali]</p>

<h2>3. RISCHI IP</h2>
<p>Contaminazione: [si/no]</p>
<p>Rilascio sorgente: [obbligo?]</p>
<p>Brevetti: [impliciti?]</p>

<h2>4. AZIONI CORRETTIVE</h2>
<ul>
<li>Sostituzione: [componenti]</li>
<li>Separazione: [moduli]</li>
<li>Dual licensing: [possibile?]</li>
</ul>

<h2>5. POLICY</h2>
<p>[Template policy aziendale]</p>

REGOLA: Lista TUTTE le licenze, anche transitive.`,

    'servizio-startup': `AGISCI COME CONSULENTE STARTUP. Scrivi in italiano pratico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>FOUNDATION IP PER STARTUP</h1>

<h2>1. ASSET IP</h2>
<table>
<tr><th>Asset</th><th>Tipo</th><th>Priorita</th></tr>
<tr><td>[1]</td><td>[brevetto/marchio/secret]</td><td>[alta/media]</td></tr>
</table>

<h2>2. STRATEGIA EARLY</h2>
<p>Provisional: [US, se applicabile]</p>
<p>Marchi provvisori: [quali]</p>
<p>NDA: [fondatori/early]</p>

<h2>3. FONDAZIONE LEGALE</h2>
<p>Split IP: [persone vs societa]</p>
<p>Founder agreements: [checklist]</p>
<p>Employee assignments: [template]</p>

<h2>4. FUNDING</h2>
<p>Valutazione IP: [per investor]</p>
<p>Cap table: [come inserire]</p>

<h2>5. ROADMAP 12 MESI</h2>
<table>
<tr><th>Mese</th><th>Azione</th></tr>
<tr><td>1-3</td><td>[azione]</td></tr>
<tr><td>4-6</td><td>[azione]</td></tr>
<tr><td>7-12</td><td>[azione]</td></tr>
</table>

REGOLA: Focus su velocita e costo zero iniziale.`,

    'servizio-segreto': `AGISCI COME ESPERTO TRADE SECRET. Scrivi in italiano operativo.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>STRATEGIA TRADE SECRET</h1>

<h2>1. IDONEITA</h2>
<p>Segreto: [si/no]</p>
<p>Valore economico: [si/no]</p>
<p>Misure riservatezza: [si/no]</p>

<h2>2. MISURE TECNICHE</h2>
<ul>
<li>Accesso controllato: [badge/password]</li>
<li>Cifratura: [dati]</li>
<li>Network segmentation</li>
<li>DRM/watermark</li>
</ul>

<h2>3. MISURE LEGALI</h2>
<ul>
<li>NDA: [tutti i soggetti]</li>
<li>Clausole contrattuali</li>
<li>Employee handbook</li>
<li>Exit interviews</li>
</ul>

<h2>4. MISURE ORGANIZZATIVE</h2>
<ul>
<li>Classificazione</li>
<li>Need-to-know</li>
<li>Training</li>
<li>Audit</li>
</ul>

<h2>5. CONFRONTO BREVETTO</h2>
<table>
<tr><th>Scenario</th><th>Segreto</th><th>Brevetto</th></tr>
<tr><td>Durata</td><td>Illimitata</td><td>20 anni</td></tr>
<tr><td>Costo</td><td>Basso</td><td>Alto</td></tr>
<tr><td>Protezione</td><td>Attiva</td><td>Passiva</td></tr>
</table>

REGOLA: Trade secret = protezione attiva, non passiva.`,

    'servizio-sep': `AGISCI COME ESPERTO STANDARD. Scrivi in italiano tecnico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>ANALISI STANDARD ESSENTIAL PATENTS</h1>

<h2>1. ANALISI STANDARD</h2>
<p>Standard: [3G/4G/5G/WiFi/etc]</p>
<p>Essentiality: [assessment]</p>
<p>Claim mapping: [a quale parte dello standard]</p>

<h2>2. OBBLIGHI FRAND</h2>
<p>Fair: [cosa significa]</p>
<p>Reasonable: [cosa significa]</p>
<p>Non-discriminatory: [cosa significa]</p>

<h2>3. STRATEGIA LICENZING</h2>
<ul>
<li>Portfolio licensing</li>
<li>Patent pools</li>
<li>Cross-licensing</li>
</ul>

<h2>4. CONTENZIOSO</h2>
<p>Ingiunzione: [limitazioni EU]</p>
<p>Forum: [Germania/UK/Cina]</p>

<h2>5. REGISTRAZIONE</h2>
<p>Dichiarazione: [dove]</p>

REGOLA: FRAND = obbligo legale, non opzionale.`,

    'servizio-audit': `AGISCI COME AUDITOR IP. Scrivi in italiano checklist.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>IP AUDIT AZIENDALE</h1>

<h2>1. CHECKLIST PER AREA</h2>
<table>
<tr><th>Area</th><th>Stato</th><th>Azione</th></tr>
<tr><td>R&D</td><td>[ok/dubbio]</td><td>[azione]</td></tr>
<tr><td>Marketing</td><td>[ok/dubbio]</td><td>[azione]</td></tr>
<tr><td>HR</td><td>[ok/dubbio]</td><td>[azione]</td></tr>
<tr><td>IT</td><td>[ok/dubbio]</td><td>[azione]</td></tr>
</table>

<h2>2. TEMPLATE</h2>
<p>Invention disclosure form</p>
<p>Trade secret classification</p>
<p>IP assignment checklist</p>

<h2>3. REPORT</h2>
<p>KPI: [quali]</p>

REGOLA: Checklist completa, niente omissioni.`,

    'servizio-pct': `AGISCI COME ESPERTO DEPOSITI INTERNAZIONALI. Scrivi in italiano pratico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>STRATEGIA GEOGRAFICA IP</h1>

<h2>1. MERCATI TARGET</h2>
<p>Vende: [dove]</p>
<p>Competitor: [dove]</p>
<p>Futuro: [dove]</p>

<h2>2. STRATEGIE</h2>
<table>
<tr><th>Opzione</th><th>Costo</th><th>Tempo</th><th>Vantaggio</th></tr>
<tr><td>Convenzione Parigi</td><td>[EUR]</td><td>12 mesi</td><td>[pro]</td></tr>
<tr><td>PCT</td><td>[EUR]</td><td>30 mesi</td><td>[pro]</td></tr>
</table>

<h2>3. COSTI</h2>
<p>Deposito: [per paese]</p>
<p>Traduzioni: [PCT nazionale]</p>
<p>Tasse annue: [cumulative]</p>

<h2>4. TABELLA PAESI</h2>
<table>
<tr><th>Tier</th><th>Paesi</th><th>Priorita</th></tr>
<tr><td>1</td><td>[quali]</td><td>Must have</td></tr>
<tr><td>2</td><td>[quali]</td><td>Nice to have</td></tr>
</table>

<h2>5. ROADMAP 30 MESI</h2>
<p>[Timeline]</p>

REGOLA: Costi realistici per paese.`,

    'servizio-training': `AGISCI COME FORMATORE IP. Scrivi in italiano didattico.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>PROGRAMMA FORMAZIONE IP</h1>

<h2>1. BISOGNI</h2>
<p>Livello: [base/avanzato]</p>
<p>Ruoli: [R&D/legal/management]</p>
<p>Obiettivi: [quali]</p>

<h2>2. PROGRAMMA</h2>
<table>
<tr><th>Modulo</th><th>Durata</th><th>Contenuto</th></tr>
<tr><td>1</td><td>[ore]</td><td>Fondamenti</td></tr>
<tr><td>2</td><td>[ore]</td><td>Invention disclosure</td></tr>
<tr><td>3</td><td>[ore]</td><td>Open source</td></tr>
<tr><td>4</td><td>[ore]</td><td>Trade secret</td></tr>
<tr><td>5</td><td>[ore]</td><td>Monetizzazione</td></tr>
</table>

<h2>3. MATERIALI</h2>
<p>Slide: [outline]</p>
<p>Casi studio: [quali]</p>
<p>Quiz: [verifica]</p>

<h2>4. KPI</h2>
<p>Test pre/post</p>
<p>Invention disclosure aumentate</p>
<p>Incidenti ridotti</p>

<h2>5. CALENDARIO</h2>
<p>[Proposta]</p>

REGOLA: Pratico, non teorico.`,

    // =====================================================
    // PROMPT DEFAULT (fallback)
    // =====================================================
    'default': `AGISCI COME CONSULENTE IP. Scrivi in italiano professionale.

ARGOMENTO: {descrizione}

OUTPUT RICHIESTO (HTML):
<h1>ANALISI</h1>
<h2>1. Riassunto</h2>
<p>[sintesi]</p>
<h2>2. Analisi tecnica</h2>
<p>[dettagli]</p>
<h2>3. Analisi legale</h2>
<p>[dettagli]</p>
<h2>4. Raccomandazioni</h2>
<ul>
<li>[azione 1]</li>
<li>[azione 2]</li>
</ul>
<h2>5. Prossimi passi</h2>
<p>[concreti]</p>
<h2>6. Costi</h2>
<p>[stima]</p>

REGOLA: Sempre concreto, mai vago.`
};

// Esporta
if (typeof window !== 'undefined') {
    window.PROMPTS = PROMPTS;
}
