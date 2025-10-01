let researchButton = document.getElementById("research-button");
let typeInput = document.getElementById("type-input");
let parameterInput = document.getElementById("parametre-input");




researchButton.addEventListener('click', () => {
    if (typeInput.textContent === "" && parameterInput.textContent === "") return;
})
async function fetchAnime() {
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5eb46f1820msh197ed5417a31ffcp1f06c5jsne1c8bcb5202b',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchAnime(); // Call the async function

/*const url = new URL(`https://${API_HOST}/anime`);
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
        <p>${anime.synopsis ? anime.synopsis}</p>
        <span>Type: ${anime.type}</span>
        <span>Episodes: ${anime.episodes}</span>
    </div>
`).join('');*/