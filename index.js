#!/usr/bin/env node

const program = require('commander')

const { consumePokemonApi,getDetailEachPokemon, getPokemonByType,getDetailEachPokemonType } = require('./lib')

program
  .version('1.0.0')
  .name('GetListPokemon')
  .description('Pokémon Height/Weight Analyzer')
  .option('-l,--limit [number]', 'Limit of list','10')
  .option('-o,--offset [number]','Show rows after X number','10')
  .option('-t,--type [type]','Pokemon by type','false')
  .parse(process.argv)

const main = async () => {
  try {
    console.time("time")
    let { limit, offset, type } = program
    if(type !== 'false'){
      let listPokemon = await getPokemonByType(type)
      let listPokemonWithDetails = await getDetailEachPokemonType(listPokemon.pokemon)
      console.log(listPokemonWithDetails)
    }else{
      let listPokemon = await consumePokemonApi(limit || 10,offset || 10)
      let listPokemonWithDetails = await getDetailEachPokemon(listPokemon.results)
      console.log(listPokemonWithDetails)
    }
    console.timeEnd("time")
  } catch (error) {
    console.error(error,'Error')
  }
}

main()
