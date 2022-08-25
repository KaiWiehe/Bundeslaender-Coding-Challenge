let searchLetters = [];
bundesländer = [];

async function init() {
    let resp = await fetch('./bundesländer.json');
    bundesländer = await resp.json();

    loadAll();
}

function loadAll() {
    let contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '';

    let search = document.getElementById('search');
    search.innerHTML = '';

    showCards();
    showSearchLetters();
}

function sorting(letter) {
    let contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '';

    showSearchCards(letter)
}

/* #############################################   Hilfsfunktionen   ############################################# */

/** Zeigt mit einer For Schleife alle Karten an und fügt alle Anfangsbuchstaben in das Array searchLetters */
function showCards() {
    for (let i = 0; i < bundesländer.length; i++) {
        const bundesland = bundesländer[i];
        let population = (bundesland['population'] + '').replace('.', ',');
        let firstChar = bundesland['name'].charAt(0);

        /** Pusht die Anfangsbuchstaben jedes Bundeslandes (falls sie noch nicht vorhanden sind),
         *  Damit die showSearchLetters Funktion weiß welche Buchstaben angezeigt werden müssen */
        if (!searchLetters.includes(firstChar)) {
            searchLetters.push(firstChar);
        }

        contentContainer.innerHTML += generateCard(population, bundesland);
    }
}

/** Zeigt alle Anfangsbuchstaben aus dem Array searchLetters an */
function showSearchLetters() {
    for (let s = 0; s < searchLetters.length; s++) {
        const letter = searchLetters[s];

        search.innerHTML += `
        <div onclick="sorting('${letter}')" class="letter">${letter}</div>`;
    }
}

/** Zeigt nur die gesuchten Karten an, also die mit dem gewünschten Anfangsbuchstaben */
function showSearchCards(letter) {
    for (let i = 0; i < bundesländer.length; i++) {
        const bundesland = bundesländer[i];
        let population = (bundesland['population'] + '').replace('.', ',');
        let firstChar = bundesland['name'].charAt(0);

        if (firstChar.includes(letter)) { /* .includes(search) damit vergleicht er die Namen mit dem was ich im Inputfeld eingebe */
            contentContainer.innerHTML += generateCard(population, bundesland);
        }
    }
}

/** Gibt die HTML Struktur zurück */
function generateCard(population, bundesland) {
    return `<a class="card" href="${bundesland['url']}" target="_blank">
            <h2>${bundesland['name']}</h2>
            <span>${population} Milionen</span>
        </a>`;
}