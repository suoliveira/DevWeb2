const data = [] 

fetch('https://graphqlpokemon.favware.tech/v8', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: `{
        getAllPokemon(offset: 298, take: 10) {
          num
          sprite
          species
        }
      }
    `
  })
})

  .then((res) => res.json())
  .then((json) => json.data.getAllPokemon.forEach(element => {
    data.push(element)
  }))
  .then(()=> {
    const pokemonContainer = document.querySelector(".pokemonContainer")
    data.forEach(data =>{
        const newDiv = document.createElement("div")
        newDiv.innerHTML = ` 
        <div class="card">
        <img class="gif" src= ${data.sprite}> 
        <h2> ${data.num}</h2>
        <h2>${data.species}</h2>
        </div>
    `
        pokemonContainer.appendChild(newDiv)
    })
  })
