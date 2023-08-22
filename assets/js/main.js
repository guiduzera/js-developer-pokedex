const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="moreDetails">
                <span><span class="miniTitle">About</span><span><hr /></span></span>
                <span class="extras"><span class="extraTitle">Height</span><span class="extraText">${pokemon.height}</span></span>
                <span class="extras"><span class="extraTitle">Weight</span><span class="extraText">${pokemon.weight}</span></span>
                <ul class="abilities">
                    <span>Abilities</span> <span class="miniContainer">${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join(',')}</span>
                </ul>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        const pokeItemMoreDetails = document.querySelectorAll('.moreDetails')
        pokeItemMoreDetails.forEach((pokeItemMoreDetail) => {
            pokeItemMoreDetail.classList.add('hidden')
        })
        const pokeItems = document.querySelectorAll('.pokemon')
        pokeItems.forEach((pokeItem) => {
            pokeItem.addEventListener('click', (event) => {
                const pokeItemMoreDetails = event.currentTarget.querySelector('.moreDetails')
                pokeItemMoreDetails.classList.toggle('hidden')
                pokeItemMoreDetails.classList.toggle('show')
            })
        })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})