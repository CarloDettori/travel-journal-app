esercizio: Travel Journal
nome repo: `travel-journal-app`


CONSEGNA_________________________________________________________

**Crea il diario di viaggio delle tue vacanze estive**

### 🎯 **Obiettivo**

Progettare e sviluppare una Web App per la raccolta e visualizzazione di momenti significativi di un viaggio. Compiere scelte progettuali e saperle motivare, documentare e presentare.

### 📄 **Traccia**

Sviluppa una Web App per tenere traccia del tuo viaggio in modo personale e creativo. Ogni tappa sarà rappresentata da un post che può includere diverse tipologie di contenuti:

- foto e video (tramite upload o tramite URL);
- luogo (inserimento manuale o tramite geolocalizzazione del browser);
- descrizione;
- stato d'animo (es. felice, stressato, emozionato, rilassato…);
- cosa ti porterai da questo posto/esperienza (riflessione positiva);
- cosa invece ti ha convinto di meno (riflessione negativa);
- impegno fisico (valutazione da 1 a 5);
- effort economico (valutazione da 1 a 5);
- spesa effettiva (in euro);
- tags personalizzati.

Ogni tappa deve essere visualizzabile come preferisci, in griglia, lista o in formato timeline, purché al  click si possa vedere il dettaglio.

Implementa qualche funzionalità di filtro come:

- per testo;
- per stato d'animo;
- per raggio di distanza da un determinato punto;
- per tags.

E funzionalità di ordinamento, come:

- per spesa economica;
- per data;
- per raggio di distanza da un determinato punto.

Pubblica il codice su un servizio di hosting a tua scelta per condividere l’app. 

Per concludere, crea un file README che spieghi lo scopo del progetto e motivi le tecnologie scelte.

---

🌟 **BONUS 1**

Aggiungi una mappa con i luoghi visitati

🌟 **BONUS 2**

Crea una dashboard con la mappa dei luoghi visitati e il resoconto finale del viaggio (es. numero di giorni complessivi, km percorsi, spesa totale, umore più frequente).




DESCRIZIONE_________________________________________



AMATOMIA DEL SITO
per creare questo sito ho utilizzato ract + vite con linguaggio html e css.  Non è presente back end ma il sito lo prevede (per un eventuale riutilizzo futuro) infatti i dati si trovano nella cartella public nel file trips.json



FUNZIONALITA'
Lo scopo del progetto riguarda la visualizzazione di vari viaggi compiuti dall'utente.
ogni viaggio è composto da tappe che comprendono gli eventi della tappa e ogni evento comprende i momenti riguardanti l'evento. è presente un tipo diverso di pagina per renderizzare l'insieme delle card tra viaggi, tappe, eventi e momenti (anche le card si differenziano tra viaggi, tappe, eventi e momenti). è anche presente una HomePage

HomePage
Nella è solo specificato in cosa si imbattera l'utente esplorando la web app ovvero le caratteristiche di ogni card (a seconda della pagina in cui si trovano), le informazioni che le card contengono, e i criteri di filtraggio e ricerca presenti in ogni pagina. E' anche presente un button per portare l'utente alla pagina dei viaggi

TripPage
Nella pagina dei viaggi l'utente vedra tutti i suoi viaggi divisi in card cliccabili, ogni card mostra informazioni riguardanti il viaggio: titolo, luogo, decrizione, impegno fisico ed economico (da 1 a 5 con affinaco una barra che ripecchia il livello di impegno), prezzo complesivo e i tag di tutti i momenti di quel viaggio
E' possibile effettuare un filtraggio tramite titolo del viaggio e tag del viaggio, si possono anche riordinare le card in base al titolo (ordine alfabetico) e al prezzo complesivo (ordine numerico) entrambi sia crescente che decrescente.
cliccare su una card porta l'utente nella pagina delle tappe del viaggio ciccato

StepPage
Nella pagina delle tappe l'utente vedrà tutte le tappe divise in card cliccabili, ogni card mostra informazioni basilari riguardanti la tappa: titolo, decrizione. Clicare sulla card che motra solo il titolo e la decrizione la sostituisce con una card di anteprima che mostra le descrizioni degli eventi di quella tappa, in piu mostra informazioni riguardanti la tappa: titolo, luogo, descrizione, fattori positivi (contrassegnati da un'emoticon sorridente) e fattori negativi (contrasegnati da un emoticon triste).
E' possibile effettuare un filtraggio tramite titolo delle tappe riordinare le card in base al titolo (ordine alfabetico crecente e decrescente) 
ogni card ha un button che se cliccato porta l'utente nella pagina degli eventi della tappa in cui è presente il button.

EventPage
Nella pagina degli eventi l'utente vedrà tutti gli eventi divisi in card cliccabili, ogni card mostra informazioni basilari riguardanti l'evento: titolo, decrizione. Clicare sulla card che motra solo il titolo e la decrizione la sostituisce con una card di anteprima che mostra le descrizioni dei momenti di quell'evento, in piu mostra informazioni riguardanti l'evento: titolo, descrizione e il mood/vibe.
E' possibile effettuare un filtraggio tramite titolo del viaggio e vibes del viaggio e anche riordinare le card in base al titolo (ordine alfabetico) e al vibe (ordine alfabetico) entrambi sia crescente che decrescente.
ogni card ha un button che se cliccato porta l'utente nella pagina dei momenti dell' evento in cui è presente il button.

MomentPage
Nella pagina dei momenti l'utente vedrà tutti i momenti come post che racchiudono ogniuno un'immagine o un video divisi in card, ogni card mostra anche altre informazioni come descrizione e tags. solo le immagini sono cliccabili e (tramite una modale) verranno mostrate a schermo intero, per quanto riguard ai vide è gia preente nel vide l'icona per lo schermo intero.
E' possibile effettuare un filtraggio tramite titolo del momento e tag del momento, si possono anche riordinare le card in base al titolo (ordine alfabetico) e ai tag (ordine nalfabetico) entrambi sia crescente che decrescente.

AllMediaPage
Nella pagina delle foto e dei video verranno renderizzate delle card che conterranno o le foto o i video dei momenti di tutti i viaggi. ogni foto è ingrandibile a schermo intero, e ogni video pure

FilterComponent
ogni qualvolta che abbiamo delle card renderizzate (tranne per la AllMediaPage), queste presntano sempre una logica di filtraggio e eriordinamento, ma queste logiche vengono definite un dei compinenti chemati [nome-variabile]FilterComponent in modo tale da separare la costruzione delle card dall filtraggio di esse, e anche per mantenere piu pulita la logica delle pagine. inoltre è possibile possibile riutilizzare il componente di filtraggio senza doverne copiare la logica ogni qualvolta sia necessario.



ESTETICA
Ho scelto un'estetica in pixel art per esercitarmi con la gestione al pixel degli spazzi (texture e sprites provnegono dai videogiochi pokemon di terza generazione)

Tema
Nel footer è presente un'interfaccia che permette di alternare 4 temi per il sito: prateria, spiaggia, citta o neve (in realtà la scelta del tema non è persistente perchè  essere salvato nel file file trips.jsx, e dovrebbe cambiare a seconda della pagina che si sta guardando o della card cliccata ma non è possibile senza back end) per ora è presente solo la logica di alternanza tra i temi senza possibilita di poterli salvare 

FrameComponent
ogni card circonda il suo contenuto con una cornice personalizzabile (26 varianti) (in realtà la scelta della cornice non è persistente perchè dovrebbe essere salvata nel file file trips.jsx, e dovrebbe cambiare a seconda della card ma non è possibile senza back end) per ora è presente solo la logica di alternanza tra le cornici senza possibilitadi poterli salvarle

per quanto riguarda la persistenza delle cornici e del tema non ho voluto usare il broser storage per 2 motivi:
1 dovrebbe essere generale e non specifica a seconda del broser dal quale si visita il sito.
2 la mole di post (momenti) è troppo elevata (109 post in tutto) e l'utente deve avere la possibilità di modificare tema e cornici in ogni pagina e per ogni viaggio, tappa, evento, momento e card