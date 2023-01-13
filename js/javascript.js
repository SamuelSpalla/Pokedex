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
const pokePESO = document.querySelector('.peso-poke')
const pokeHP = document.querySelector('.stats-hp')
const pokeATK = document.querySelector('.stats-atk')
const pokeDEF = document.querySelector('.stats-def')
const pokeSpATK = document.querySelector('.stats-sp-atk')
const pokeSpDEF = document.querySelector('.stats-sp-def')
const pokeSPEED = document.querySelector('.stats-speed')
const pokeStatus = document.querySelector('.btn-status')
const pokeImgStatic = document.querySelector('.poke_img-static')
const btnPesq = document.querySelector('.btn-pesquisar')
const Gen = document.querySelector('.span-gen')


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
        pokeImgStatic.src = data['sprites']['front_default']
        pokeImg.style.display = 'block'
        pokeImgStatic.style.display = 'block'
        input.value = ''
        numberSearch = data.id
        pokeAlt.innerHTML = (`Altura: ${data.height}`)
        pokePESO.innerHTML = (`Peso: ${data.weight}`)
        
        
        pokeHP.innerHTML = (`HP: ${data.stats[0].base_stat}`)
        pokeATK.innerHTML = (`ATAQUE: ${data.stats[1].base_stat}`)
        pokeDEF.innerHTML = (`DEFESA: ${data.stats[2].base_stat}`)
        pokeSpATK.innerHTML = (`SP-ATAQUE: ${data.stats[3].base_stat}`)
        pokeSpDEF.innerHTML = (`SP-DEFESA: ${data.stats[4].base_stat}`)
        pokeSPEED.innerHTML = (`VELOCIDADE: ${data.stats[5].base_stat}`)

        if(data.types[1]){
            pokeType1.innerHTML = data.types[0].type.name
            pokeType2.innerHTML = data.types[1].type.name
            
        }
        else{
            pokeType1.innerHTML = data.types[0].type.name
            pokeType2.innerHTML = ''
        }

        if (data.id){
            let verificador = data.id
            if(verificador >= 1 && verificador <= 151 ){
                Gen.innerHTML = '1'
                document.querySelector('body').setAttribute('class', 'fundo-1')
            } else {
                if(verificador > 151 && verificador <= 251){
                    Gen.innerHTML = '2'
                    document.querySelector('body').setAttribute('class', 'fundo-2')
                } else{
                    if(verificador > 251 && verificador <= 386){
                        Gen.innerHTML = '3'
                        document.querySelector('body').setAttribute('class', 'fundo-3')
                    } else{
                        if(verificador > 386 && verificador <= 493){
                            Gen.innerHTML = '4'
                            document.querySelector('body').setAttribute('class', 'fundo-4')
                        } else{
                            if(verificador > 493 && verificador <= 649){
                                Gen.innerHTML = '5'
                                document.querySelector('body').setAttribute('class', 'fundo-5')
                            } else{
                                if(verificador > 649 && verificador <= 721){
                                    Gen.innerHTML = '6'
                                    document.querySelector('body').setAttribute('class', 'fundo-6')
                                } else{
                                    if(verificador > 721 && verificador <= 809){
                                        Gen.innerHTML = '7'
                                        document.querySelector('body').setAttribute('class', 'fundo-7')
                                    } else{
                                        if(verificador > 809 && verificador <= 890){
                                            Gen.innerHTML = '8'
                                            document.querySelector('body').setAttribute('class', 'fundo-8')
                                        } else{
                                            Gen.innerHTML = ''
                                            document.querySelector('body').setAttribute('class', 'fundo-normal')
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }            
        btnShiny.addEventListener('click', () => {
            pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
            pokeImgStatic.src = data['sprites']['front_shiny']
        })

        btnDefault.addEventListener('click', () => {
            pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            pokeImgStatic.src = data['sprites']['front_default']
        })
        if(pokeImg.src != data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']){
            pokeImg.src = data['sprites']['front_default']
        }
    }    
    else{
        pokeImg.style.display = 'none'
        pokeName.innerHTML = 'Não encontrado'
        pokeNumber.innerHTML = ' '
       
    }
    
    
    
}

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    mainPoke(input.value.toLowerCase())
})

btnPesq.addEventListener('click', (e) =>{
    e.preventDefault()
    mainPoke(input.value.toLowerCase())
})

function PokePrev(){
    if(numberSearch > 1){
        numberSearch -=1
        mainPoke(numberSearch)
    }
    
}

function PokeNext(){
    numberSearch += 1
    mainPoke(numberSearch)
}

btnPrev.addEventListener('click', () => {
   PokePrev()
})

btnNext.addEventListener('click', () => {
    PokeNext()
})

document.addEventListener('keydown', (e) =>{
    if(e.keyCode == 37 ){
        PokePrev()
    }
    if(e.keyCode == 39){
        PokeNext()
    }
})



pokeStatus.addEventListener('click', ()=>{
    let status = document.querySelector('.stats')
    status.classList.toggle('hide')

    let seta = document.querySelector('.btn-status')
    seta.classList.toggle('seta')
})


mainPoke(numberSearch)