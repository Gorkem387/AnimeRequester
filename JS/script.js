let researchButton = document.getElementById("research-button");
let typeInput = document.getElementById("type");
let parameterInput = document.getElementById("parametre-input");
let resetButton = document.getElementById("reset-button");
const animeList = document.getElementById('anime-card');

resetButton.addEventListener('click', () => {
    document.getElementById('parametre-input').value = '';
    document.getElementById('type').value = '';
});

async function fetchAnime() {
    let url;
    if (typeInput.value === "genres") {
        url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=${parameterInput.value}&sortBy=ranking&sortOrder=asc`;
    } else {
        url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${parameterInput.value}&${typeInput.value}=${parameterInput.value}&sortBy=ranking&sortOrder=asc`;
    }
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
            <style>
                .anime-card h3, p, img {
                    margin-bottom: 14px;
                }
                hr {
                    border: none;
                    height: 1px;
                    background-color: var(--text-color);
                    margin: 20px 0;
                }
                .anime-card #synopsis{
                    max-width: 600px;
                    margin: 0 auto;
                    text-align: center;
                    margin-bottom: 14px;
                }
            </style>
            <div class="anime-card">
                <h3>${anime.title}</h3>
                <img src="${anime.image}" alt="${anime.title}" />
                <p id="synopsis"><strong>Synopsis : </strong>${anime.synopsis}</p>
                <p><strong>Genres : </strong>${anime.genres}</p>
                <p><strong>Classement : </strong>${anime.ranking}</p>
                <p><strong>Type : </strong>${anime.type}</p>
                <p><strong>Nombre d'épisodes : </strong>${anime.episodes}</p>
                <hr>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
    }
}

(function () {

    const root = document.documentElement;
  
    function toggleDarkMode() {
      const currentTheme = root.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  
    function init() {
      const storedPreference = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = storedPreference || (systemPrefersDark ? "dark" : "light");
      root.setAttribute("data-theme", theme);
    }
  
    init();
  
    document.addEventListener("DOMContentLoaded", function () {
      const togglers = document.querySelectorAll("[data-theme-toggler]");
      togglers.forEach((toggler) => {
        toggler.addEventListener("click", toggleDarkMode);
      });
    });
  
  })();

researchButton.addEventListener('click', () => {
    fetchAnime();
})