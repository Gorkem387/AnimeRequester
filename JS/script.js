let researchButton = document.getElementById("research-button");
let typeInput = document.getElementById("type-input");
let parameterInput = document.getElementById("parametre-input");
const animeList = document.getElementById('anime-list');

console.log(parameterInput.value)

async function fetchAnime() {
    const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10${parameterInput.value === "" ? `&search=${parameterInput.value}` : ''}${type.value === "" ? `&genres=${type.value}` : ''}&sortBy=ranking&sortOrder=asc`;
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '5eb46f1820msh197ed5417a31ffcp1f06c5jsne1c8bcb5202b',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Get JSON result

        animeList.innerHTML = data.data.map(anime => `
            <div class="anime-card">
                <img src="${anime.image}" alt="${anime.title}" />
                <h3>${anime.title}</h3>
                <p>${anime.synopsis ? anime.synopsis.substring(0, 100000000) + '...' : ''}</p>
                <span>Type: ${anime.type}</span>
                <span>Episodes: ${anime.episodes}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
    }
}

researchButton.addEventListener('click', () => {
    fetchAnime();
})