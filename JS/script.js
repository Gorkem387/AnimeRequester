let researchButton = document.getElementById("research-button");
let typeInput = document.getElementById("type");
let parameterInput = document.getElementById("parametre-input");
let resetButton = document.getElementById("reset-button");
const animeList = document.getElementById('anime-card');


// Ce code change le textInput en Selector
const genresList = [
    "Action","Adventure","Avant Garde","Award Winning","Boys Love","Comedy","Drama","Erotica","Ecchi","Fantasy","Girls Love","Gourmet","Hentai","Horror","Mystery","Romance","Sci-Fi","Slice of Life","Sports","Supernatural","Suspense"
];
typeInput.addEventListener('change', () => {
    if (typeInput.value === "genres") {
        // Crée le select
        const select = document.createElement('select')
        select.id = "parametre-input"
        genresList.forEach(genre => {
            const option = document.createElement('option')
            option.value = genre
            option.textContent = genre
            select.appendChild(option);
        });
        // Remplace l'input par le select
        parameterInput.replaceWith(select);
        parameterInput = select
    } else {
        // Remets l'input texte si ce n'est pas déjà un input
        if (parameterInput.tagName.toLowerCase() !== 'input') {
            const input = document.createElement('input');
            input.type = "text"
            input.id = "parametre-input"
            parameterInput.replaceWith(input);
            parameterInput = input
        }
    }
});

resetButton.addEventListener('click', () => {
    document.getElementById('parametre-input').value = '';
    document.getElementById('type').value = '';
});

let apiKey;

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
            'x-rapidapi-key': apiKey,
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

function demanderCleApi(){
    apiKey = prompt("Veuillez entrer votre clé API :");
}

window.onload = demanderCleApi;