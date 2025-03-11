//1ra versió de la pokedex on a traves d'una funció map retornem els noms dels pokemons al url de la api a la consola
const URL2 = 'https://pokeapi.co/api/v2/pokemon?limit=649';

async function fetchData() {
  try {
    const response = await fetch(URL2);
    const data = await response.json();
    const pokemons = data.results;
    const pokemonNames = pokemons.map(pokemon => pokemon.name);
    console.log(pokemonNames);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();