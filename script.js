async function renderizaCards() {
    const lista = document.querySelector('#listaCartas')
  
    lista.innerHTML = ""
  
    const listaDeDados = await fetch('https://swapi.dev/api/people', {
      method: "GET"
    })
    .then(function(resposta) {
      return resposta.json()
    })
    
    for(let indice = 0; indice < listaDeDados.results.length; indice++){
        const elemento = listaDeDados.results[indice]

        const li = document.createElement("li")
        const divFrente = document.createElement('div')
        const divVerso = document.createElement('div')
        const divNomeFrente = document.createElement('div')
        const divNomeVerso = document.createElement('div')
        const ListaDados = document.createElement('ul')
        const anoNasc = document.createElement('li')
        const planeta = document.createElement('li')
        const imagem = document.createElement('img')

        li.classList.add('carta', 'listCard')
        divFrente.classList.add("face")
        divFrente.classList.add("front")
        divNomeFrente.classList.add('nome')
        divNomeFrente.innerText =  elemento.name
        divNomeVerso.classList.add('nome')
        divNomeVerso.innerText =  elemento.name
        
        ListaDados.classList.add('data')
        
        anoNasc.innerText = 'Ano de nascimento - ' + elemento.birth_year

        const nomePlaneta = await fetch(elemento.homeworld, {
            method: "GET"
          })
          .then(function(resposta) {
            return resposta.json()
          })
      
        planeta.innerText = 'Planeta: ' + nomePlaneta.name
        
        divVerso.classList.add('face', 'back')
        imagem.classList.add('pato')
        imagem.src = "./assets/starduck.png"
        imagem.alt = "starduck"


        ListaDados.append(anoNasc, planeta)
        divFrente.append(divNomeFrente, ListaDados)   
        divVerso.append(divNomeVerso, imagem)
        li.append(divFrente, divVerso)

        lista.append(li)
    }
    viraCard()
}

function viraCard() {
    const cards = document.querySelectorAll('.listCard')
  
    for(let indice = 0; indice < cards.length; indice++) {
      const card = cards[indice]
  
      card.addEventListener('click', function() {
        card.classList.toggle('flip')
      })
    }
}

renderizaCards()
