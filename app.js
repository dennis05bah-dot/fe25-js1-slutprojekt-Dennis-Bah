import {
    getHögstRankadFilm,
    getPopuläraFilmer,
    sökFilmer,
    sökPerson
} from './api.js';

import {
    rensaResultat,
    vissMeddelande,
    skapaFilmKort,
    skapaPersonKort
} from './ui.js';


// ===== HÄMTA HTML-ELEMENT =====
const btnTopRated = document.querySelector('#btnTopRated');
const btnPopular = document.querySelector('#btnPopular');

const movieSearchForm = document.querySelector('#movieSearchForm');
const movieQuery = document.querySelector('#movieQuery');

const personSearchForm = document.querySelector('#personSearchForm');
const personQuery = document.querySelector('#personQuery');

const results = document.querySelector('#results');
const message = document.querySelector('#message');


// ===== EVENTLYSSNARE =====
btnTopRated.addEventListener('click', visaTopRated);
btnPopular.addEventListener('click', visaPopular);

movieSearchForm.addEventListener('submit', sökFilm);
personSearchForm.addEventListener('submit', sökPersoner);


// ===== FUNKTIONER =====

// Top 10 högst rankade filmer
async function visaTopRated() {
    rensaResultat(results);
    vissMeddelande(message, 'Hämtar top rated...');

    try {
        const filmer = await getHögstRankadFilm();

        rensaResultat(results);
        filmer.forEach(film => {
            results.appendChild(skapaFilmKort(film));
        });

        anime({
            targets: '.kort',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });

        vissMeddelande(message, '');
    } catch (error) {
        vissMeddelande(message, 'Något gick fel. Försök igen senare.', true);
    }
}


// Top 10 populära filmer
async function visaPopular() {
    rensaResultat(results);
    vissMeddelande(message, 'Hämtar populära filmer...');

    try {
        const filmer = await getPopuläraFilmer();

        rensaResultat(results);
        filmer.forEach(film => {
            results.appendChild(skapaFilmKort(film));
        });

        anime({
            targets: '.kort',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });

        vissMeddelande(message, '');
    } catch (error) {
        vissMeddelande(message, 'Något gick fel. Försök igen senare.', true);
    }
}


// Sök film
async function sökFilm(event) {
    event.preventDefault();

    const query = movieQuery.value.trim();

    if (!query) {
        vissMeddelande(message, 'Skriv en filmtitel att söka efter.', true);
        return;
    }

    rensaResultat(results);
    vissMeddelande(message, 'Söker film...');

    try {
        const filmer = await sökFilmer(query);

        if (filmer.length === 0) {
            vissMeddelande(message, 'Inga filmer hittades.', true);
            return;
        }

        filmer.forEach(film => {
            results.appendChild(skapaFilmKort(film));
        });

         anime({
    targets: '.kort',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 600,
    easing: 'easeOutQuad'
});

        vissMeddelande(message, '');
    } catch (error) {
        vissMeddelande(message, 'Något gick fel vid sökningen.', true);
    }
}


// Sök person
async function sökPersoner(event) {
    event.preventDefault();

    const query = personQuery.value.trim();

    if (!query) {
        vissMeddelande(message, 'Skriv ett namn att söka efter.', true);
        return;
    }

    rensaResultat(results);
    vissMeddelande(message, 'Söker person...');

    try {
        const personer = await sökPerson(query);

        if (personer.length === 0) {
            vissMeddelande(message, 'Inga personer hittades.', true);
            return;
        }

        personer.forEach(person => {
            results.appendChild(skapaPersonKort(person));
        });

        anime({
    targets: '.kort-person',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 600,
    easing: 'easeOutQuad'
});

        vissMeddelande(message, '');
    } catch (error) {
        vissMeddelande(message, 'Något gick fel vid sökningen.', true);
    }
}
