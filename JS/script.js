let researchButton = document.getElementById("research-button");
let typeInput = document.getElementById("type");
let parameterInput = document.getElementById("parametre-input");
const animeList = document.getElementById('anime-list');

async function fetchAnime() {
    const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&${typeInput.value}=${parameterInput.value}&sortBy=ranking&sortOrder=asc`;
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
                <h3>${anime.title}</h3>
                <img src="${anime.image}" alt="${anime.title}" />
                <p><strong>Synopsis : </strong>${anime.synopsis ? anime.synopsis.substring(0, 100000000) + '...' : ''}<br></p>
                <span><strong>Genres : </strong>${anime.genres}<br></span>
                <span><strong>Classement : </strong>${anime.ranking}<br></span>
                <span><strong>Type : </strong>${anime.type}<br></span>
                <span id="nbEpisode"><strong>Nombre d'épisodes : </strong>${anime.episodes}<br></span>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
    }
}

researchButton.addEventListener('click', () => {
    fetchAnime();
})