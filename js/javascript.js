const pokeNumber = document.querySelector('.poke_number')
const pokeName = document.querySelector('.poke_name')
const pokeImg = document.querySelector('.poke_img')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
const btnShiny = document.querySelector('.btn-shiny')
const btnDefault = document.querySelector('.btn-default')
const pokeType1 = document.querySelector('.type-1')
const pokeType2 = document.querySelector('.type-2')
const pokeAlt = document.querySelector('.alt-poke')
let numberSearch = 1



const fetchPoke = async (pokemon) =>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIresponse.status == 200){
        const data = await APIresponse.json()
        return data
    }
}


const mainPoke = async (pokemon) =>{
    pokeNumber.innerHTML = ' '
    pokeName.innerHTML = 'Carregando...'

    const data = await fetchPoke(pokemon)
    
    if (data) {
        pokeName.innerHTML = data.name
        pokeNumber.innerHTML = data.id
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokeImg.style.display = 'block'
        input.value = ''
        numberSearch = data.id
        pokeAlt.innerHTML = (`Altura: ${data.height}`)

        if(data.types['1']){
            pokeType1.innerHTML = data.types[0].type.name
            pokeType2.innerHTML = data.types[1].type.name
            
        }
        else{
            pokeType1.innerHTML = data.types[0].type.name
            pokeType2.innerHTML = ''
        }
        
        btnShiny.addEventListener('click', () => {
            pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
        })

        btnDefault.addEventListener('click', () => {
            pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        })

        
    }
    else{
        pokeImg.style.display = 'none'
        pokeName.innerHTML = 'Não encontrado'
        pokeNumber.innerHTML = ' '
    }
    
    
    
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    mainPoke(input.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
    if(numberSearch > 1){
        numberSearch -=1
        mainPoke(numberSearch)
    }
})

btnNext.addEventListener('click', () => {
    numberSearch += 1
    mainPoke(numberSearch)
})

mainPoke(numberSearch)



