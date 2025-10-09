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

  document.addEventListener("DOMContentLoaded", () => {
    const selectType = document.getElementById("type");
    const inputText = document.getElementById("parametre-input");
    const selectGenres = document.getElementById("parametre-select");

    selectType.addEventListener("change", () => {
        const selected = selectType.value;

        if (selected === "genres") {
            inputText.style.display = "none";
            selectGenres.style.display = "inline-block";
        } else {
            inputText.style.display = "inline-block";
            selectGenres.style.display = "none";
        }
    });
});

researchButton.addEventListener('click', () => {
    fetchAnime();
})

function demanderCleApi(){
    apiKey = prompt("Veuillez entrer votre clé API :");
}

window.onload = demanderCleApi;
