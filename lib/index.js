const fetch = require("node-fetch");

const consumePokemonApi = async (limit,offset) => {
  return await fetch('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset)
  .then(response => response.json())
  .then(data => {
    return data
  })
}
const getPokemonByType = async (type) => {
  return await fetch('https://pokeapi.co/api/v2/type/'+type)
  .then(response => response.json())
  .then(data => {
    return data
  })
}
const getDetailEachPokemon = async (list) => {
  return await Promise.all(list.map(url => {
    return fetch(url.url).then(r=> r.json())
  }))
  .then(resp => {
    let sumHeight = 0
    let sumWeight = 0
    for(let i=0;i<list.length;i++){
      list[i].height = resp[i].height
      sumHeight += resp[i].height
      list[i].weight = resp[i].weight
      sumWeight += resp[i].weight
    }
    return {list:list,averageHeight: (sumHeight/list.length),averageWeight: (sumWeight/list.length)}
  })
}
const getDetailEachPokemonType = async (list) => {
  return await Promise.all(list.map(url => {
    return fetch(url.pokemon.url).then(r=> r.json())
  }))
  .then(resp => {
    let sumHeight = 0
    let sumWeight = 0
    for(let i=0;i<list.length;i++){
      list[i].pokemon.height = resp[i].height
      sumHeight += resp[i].height
      list[i].pokemon.weight = resp[i].weight
      sumWeight += resp[i].weight
    }
    return {list:list,averageHeight: (sumHeight/list.length),averageWeight: (sumWeight/list.length)}
  })
}


module.exports = {
  consumePokemonApi,
  getDetailEachPokemon,
  getPokemonByType,
  getDetailEachPokemonType
}
