const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 150;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);
const allPokemons = [];

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (pokemonNumber) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
  const resp = await fetch(url);
  const data = await resp.json();
  allPokemons.push(data);
  createPokemonCard(data);
};

const createPokemonCard = (poke) => {
  const card = document.createElement('div');
  card.classList.add('pokemon');

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, '0');

  const pokeTypes = poke.types.map(type => type.type.name);
  const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>  
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  card.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(card);
};

// Função para realizar a busca
const searchPokemon = () => {
  const searchInput = document.querySelector("#search-input").value.toLowerCase();
  const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchInput));
  pokeContainer.innerHTML = '';
  filteredPokemons.forEach(pokemon => createPokemonCard(pokemon));
};

// Adiciona um evento de digitação no campo de busca
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener('input', searchPokemon);

fetchPokemons();
