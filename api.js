import { apiKey } from './index.js';

const tmdBaseUrl = 'https://api.themoviedb.org/3';

async function fetchFromTmdb(path, params = {}) {
const url = new URL(`${tmdBaseUrl}${path}`);
url.searchParams.set('api_key', apiKey);
url.searchParams.set('language', 'sv-SE');

Object.keys(params).forEach(k => url.searchParams.set(k, params[k]));

const response = await fetch(url.toString());
if
(!response.ok) {
    throw new Error(`nätverksfel: ${response.status} ${response.statusText}`);

}
return response.json();

}

export async function getHögstRankadFilm(page = 1, count = 10) {
const data = await fetchFromTmdb('/movie/top_rated', { page });
return data.results.slice(0, count);
    
}
export async function getPopuläraFilmer(page = 1, count = 10) {
    const data = await fetchFromTmdb('/movie/popular', { page });
    return data.results.slice(0, count);
    
}
export async function sökFilmer(query, page = 1) {
    if (!query) return { results: []};
    const data = await fetchFromTmdb('/search/movie', { query, page });
    return data.results;
}
export async function sökPerson(query, page = 1) {
    if (!query) return { results: []};
    const data = await fetchFromTmdb('/search/person', { query, page });
    return data.results;
    
}