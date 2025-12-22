import { imageBaseUrl } from './index.js';

// Rensa tidigare resultat från en container
export function rensaResultat(container) {
    container.innerHTML = '';
}

// Visa ett meddelande i en container
export function vissMeddelande(container, text, isError = false) {
    container.textContent = text;
    container.style.color = isError ? 'red' : 'black';
}


// skapar kort för film i en topplista eller sökresultat
export function skapaFilmKort(film) {
    const kort = document.createElement(`article`);
    kort.className = 'kort';

    const img = document.createElement('img');
    img.className = `film-poster`;
    img.alt = film.title || film.name;
    img.src = film.poster_path ? imageBaseUrl + film.poster_path : `https://via.placeholder.com/500x750?text=No+Image`;
    kort.appendChild(img) 

    const title = document.createElement(`h3`);
    title.className = 'film-titel';
    title.textContent = film.title || `ingen titel`;
    kort.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'film-meta';
    meta.textContent = `släppdatum: ${film.release_date || 'okänt'}`;
    kort.appendChild(meta);

    const overview = document.createElement('p');
    overview.className = 'film-overview';
    overview.textContent = film.overview || 'ingen översikt tillgänglig';
    kort.appendChild(overview);

    return kort;
}

// skapar kort för person i sökresultat

export function skapaPersonKort(person) {
    const kort = document.createElement('article');
    kort.className = 'kort-person';

    const img = document.createElement('img');
    img.className = 'person-poster';
    img.alt = person.name;
    img.src = person.profile_path ? imageBaseUrl + person.profile_path : `https://via.placeholder.com/500x750?text=No+Image`;
    kort.appendChild(img);

    const name = document.createElement('h3');
    name.className = 'person-title';
    name.textContent = person.name;
    kort.appendChild(name);

    const avdelning = document.createElement('div');
    avdelning.className = 'meta person-avdelning';
    avdelning.textContent = `Känd för: ${person.known_for_department || 'okänt'}`;
    kort.appendChild(avdelning);

    const popularity = document.createElement('div');
    popularity.className = 'meta person-popularity';
    const items = (person.known_for || []).slice(0,3);

    items.forEach(k => {
        const li = document.createElement('div');
        li.className = 'known-for-item';
        const type = k.media_type === 'movie' ? 'Film' : k.media_type === 'tv' ? 'TV-serie' : k.media_type;
        li.textContent = `${type}: ${k.title || k.name || 'N/A'}`;
        popularity.appendChild(li);
    });

    kort.appendChild(popularity);

    return kort;
}
