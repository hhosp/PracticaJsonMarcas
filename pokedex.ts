const URL2 = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.getElementById("search") as HTMLInputElement;
const pokemonContainer = document.getElementById("pokemon-container");
const searchButton = document.getElementById("search-button");
const suggestionsContainer = document.getElementById("suggestions-container");

interface Pokemon {
  name: string;
  url: string;
  sprite: string;
}

interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string
    }
  }[]
}

let allPokemonNames: string[] = [];

async function fetchData() {
  try {
    const response = await fetch(URL2 + '?limit=1025');
    const data = await response.json();
    const pokemons: Pokemon[] = data.results;
    allPokemonNames = pokemons.map(pokemon => pokemon.name);
    console.log(allPokemonNames);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

function showSuggestions() {
  const query = searchInput.value.toLowerCase();
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Limpiar el contenedor de sugerencias
  }
  if (query.length > 0) {
    const filteredNames = allPokemonNames.filter(name => name.startsWith(query));
    filteredNames.forEach(name => {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.addEventListener('click', () => {
        searchInput.value = name;
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = ''; // Limpiar el contenedor de sugerencias al seleccionar una
        }
        searchPokemon();
      });
      suggestionsContainer?.appendChild(suggestionItem);
    });
  }
}

async function searchPokemon() {
  const searchedPokemon = searchInput?.value.toLowerCase();
  try {
    const response = await fetch(`${URL2}/${searchedPokemon}`);
    const data = await response.json();
    const pokemonData: PokemonData = data;
    let pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    if (pokemonContainer) {
      pokemonContainer.innerHTML = 
      `
        <h3 id="pokemon-name">${pokemonName}</h3>
        <img id="pokemon-img" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p id="pokemon-type">Type: ${pokemonData.types && pokemonData.types.length > 0 ? pokemonData.types.filter(typeInfo => typeInfo.type.name).map(typeInfo => typeInfo.type.name).join(', ') : 'Unknown'}</p>
      `;
    } else {
      console.error('Pokemon Container is null');
    }
  } catch (error) {
    console.error(error);
  }
}

// Event listener para llamar a la función searchPokemon si se da click en el botón de buscar
searchButton?.addEventListener("click", searchPokemon);

// Event listener para llamar a la función searchPokemon si se presiona una tecla
searchInput?.addEventListener("keypress", e => {
  // Si la tecla presionada es Enter se llama a la función searchPokemon
  if (e.key === "Enter") {
    searchPokemon();
  }
});

// Event listener para mostrar sugerencias mientras se escribe
searchInput?.addEventListener("input", showSuggestions);