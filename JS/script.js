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
    const typeInput = document.getElementById("type");
    const parameterInput = document.getElementById("parametre-input");
    const animeList = document.getElementById("anime-list");

    let url;
    if (typeInput.value === "genres") {
        url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=${parameterInput.value}&sortBy=ranking&sortOrder=asc`;
    } else if (typeInput.value === "id") {
        url = `https://anime-db.p.rapidapi.com/anime/by-id/${parameterInput.value}`;
    } else if (typeInput.value === "rank") {
        url = `https://anime-db.p.rapidapi.com/anime/by-ranking/${parameterInput.value}`;
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
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();

        // Normalisation de la réponse pour toujours avoir un tableau
        let animeData;
        if (typeInput.value === "id" || typeInput.value === "rank") {
            // Si c'est un objet unique, on le met dans un tableau
            animeData = [data];
        } else {
            // Sinon, on vérifie si data.data existe et est un tableau
            animeData = data.data || data;
            if (!Array.isArray(animeData)) {
                throw new Error("La réponse de l'API n'est pas un tableau valide.");
            }
        }

        // Affichage des résultats
        if (animeData.length === 0) {
            animeList.innerHTML = "<p>Aucun anime trouvé.</p>";
            return;
        }

        animeList.innerHTML = animeData.map(anime => `
            <div class="anime-card">
                <h3>${anime.title || "Titre inconnu"}</h3>
                ${anime.image ? `<img src="${anime.image}" alt="${anime.title}" />` : "<p>Pas d'image disponible</p>"}
                <p id="synopsis"><strong>Synopsis : </strong>${anime.synopsis || "Aucun synopsis"}</p>
                <p><strong>Genres : </strong>${Array.isArray(anime.genres) ? anime.genres.join(", ") : anime.genres || "Inconnu"}</p>
                <p><strong>Classement : </strong>${anime.ranking || "Inconnu"}</p>
                <p><strong>Type : </strong>${anime.type || "Inconnu"}</p>
                <p><strong>Nombre d'épisodes : </strong>${anime.episodes || "Inconnu"}</p>
                <hr>
            </div>
        `).join('');

    } catch (error) {
        console.error("Erreur :", error);
        animeList.innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
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
