//URL de la API
const URL2 = 'https://pokeapi.co/api/v2/pokemon/';

//Variables on guardem els elements HTML segons l'Id
const searchInput = document.getElementById("search") as HTMLInputElement; //Sugerencia del IDE ja que era necesari
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

//Declarem un array de Strings buit per a emmagatzemar els noms dels pokemons més tard
let allPokemonNames: string[] = [];

//Funció assíncrona per a recollir dades de la API
async function fetchData() {
  try {
    const response = await fetch(URL2 + '?limit=1025'); //Variable per a recollir la resposta de la api amb fetch()
    const data = await response.json(); //Transformem la resposta en un .json i ho guardem a una variable
    const pokemons: Pokemon[] = data.results; //Guardem els resultats del .json en una variable
    allPokemonNames = pokemons.map(pokemon => pokemon.name); //Apliquem la funció .map per a recollir nomes els noms
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchData();

//Funció per a mostrar sugerencies segons l'entrada de l'usuari
function showSuggestions() {
  const query = searchInput.value.toLowerCase(); //Variable per a guardar el valor d'entrada en minuscules
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = ''; // Netejar el contenidor de sugerencies
  }
  if (query.length > 0) {
    const filteredNames = allPokemonNames.filter(name => name.startsWith(query)); //Filtrem els noms segons la combinació de lletres introduida per l'usuari
    filteredNames.forEach(name => {
      const suggestionItem = document.createElement('div'); //Fem un div per a cada name trobat amb filteredNames
      suggestionItem.textContent = name.charAt(0).toUpperCase() + name.slice(1); //Pasem la 1ra lletra del textContent a majuscules i ho juntem amb la resta menys la 1ra lletra
      suggestionItem.classList.add('suggestion-item'); //Afegim la clase suggestion-item al div
      suggestionItem.addEventListener('click', () => { //Listener per a cambiar el valor del searchInput si donem click a una sugerencia
        searchInput.value = name.charAt(0).toUpperCase() + name.slice(1);
        if (suggestionsContainer) {
          suggestionsContainer.innerHTML = ''; // Netejar el contenidor de sugerencies
        }
        searchPokemon(); //Cridem la funció de searchPokemon() una vegada cambiat el valor del searchInput
      });
      suggestionsContainer?.appendChild(suggestionItem); //Dins el suggestionContainer afegim cada div com a Child
    });
  }
}
//Funció assíncrona per a buscar el pokemon segons el searchInput
async function searchPokemon() {
  const searchedPokemon = searchInput?.value.toLowerCase();
  try {
    const response = await fetch(`${URL2}/${searchedPokemon}`); //Guardem la resposta de la API en una variable, utilitzem la variable searchedPokemon per a evitar errors per mayus o minus (o per si es null)
    const data = await response.json(); //Guardem la resposta en format .json
    const pokemonData: PokemonData = data; //Pasem les dades a la interface PokemonData
    let pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1); //Cambiem la 1ra lletra a majuscula
    if (pokemonContainer) {
      pokemonContainer.innerHTML = //Editem el innerHTML del pokemon Container per a mostrar les dades
      `
        <h3 id="pokemon-name">${pokemonName}  #${pokemonData.id}</h3>
        <img id="pokemon-img" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p id="pokemon-type">Type: ${pokemonData.types && pokemonData.types.length > 0 ? 
          pokemonData.types.filter(typeInfo => typeInfo.type.name).map(typeInfo => typeInfo.type.name).join(', ') : 'Unknown'}</p> <!--Condicional per a evitar errors, si té mes d'un tipus els juntem amb una coma-->
      `;
    } else {
      console.error('Pokemon Container is null');
    }
  } catch (error) {
    console.error(error);
  }
}

//Listener per a trucar a la funció searchPokemon si donem click
searchButton?.addEventListener("click", searchPokemon);

//Listener per a trucar la funció searchPokemon si la tecla presionada es Enter
searchInput?.addEventListener("keypress", e => {
  // Si la tecla presionada es Enter se llama a la función searchPokemon
  if (e.key === "Enter") {
    searchPokemon();
  }
});

//Listener per a cridar la funció showSuggestions si el input de SearchInput varia
searchInput?.addEventListener("input", showSuggestions);