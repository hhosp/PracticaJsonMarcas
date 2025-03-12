const URL2 = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.getElementById("search") as HTMLInputElement;
const pokemonContainer = document.getElementById("pokemon-container");
const searchButton = document.getElementById("search-button");

interface Pokemon {
  name: string;
  url: string;
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

async function fetchData() {
  try {
    const response = await fetch(URL2+'?limit=1000');
    const data = await response.json();
    const pokemons: Pokemon[] = data.results;
    const pokemonNames = pokemons.map(pokemon => pokemon.name);
    console.log(pokemonNames);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

async function searchPokemon() {
  const searchedPokemon = searchInput?.value.toLowerCase();
  try {
    const response = await fetch(`${URL2}/${searchedPokemon}`);
    const data: PokemonData = await response.json();
    if (pokemonContainer) {
      pokemonContainer.innerHTML = 
      `
        <h3>${data.name}</h3>
        <p>Numero: ${data.id}</p>
        <p>Tipos: ${data.types[0].type.name} ${data.types[1]?.type.name ?? ''}</p>
        <img src="${data.sprites.front_default}">
      `;
    } else {
      console.error('Pokemon Container is null');
    }
  } catch (error) {
    console.error(error);
  }
}
//Event listener per a trucar la funció searchPokemon si es dona click en el botó de buscar
searchButton?.addEventListener("click", searchPokemon);
//Event listener per a trucar la funció e si es presiona una tecla
searchInput?.addEventListener("keypress", e => {
  //Si la tecla presionada es Enter es truca a la funcio searchPokemon
  if (e.key === "Enter") {
    searchPokemon();
  }
});