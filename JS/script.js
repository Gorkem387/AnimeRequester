const nb_resultats = { size: 10 }; // Nombre max d'anime à afficher (c'est marqué 10 dans le sujet)

const url = new URL(`https://${API_HOST}/anime`);
Object.entries(nb_resultats).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
        url.searchParams.append(k, v);
    }
});

const res = await fetch(url, {
    method: 'GET',
    headers: {
        "X-RapidAPI-Host": API_HOST,
        "X-RapidAPI-Key": API_KEY
    }
});

if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();

// After fetching data
const animeList = document.getElementById('anime-list');
animeList.innerHTML = data.data.map(anime => `
    <div class="anime-card">
        <img src="${anime.image}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : ''}</p>
        <span>Type: ${anime.type}</span>
        <span>Episodes: ${anime.episodes}</span>
    </div>
`).join('');