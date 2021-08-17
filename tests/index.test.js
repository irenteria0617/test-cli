/* Modules */
const { consumePokemonApi,getDetailEachPokemon } = require('../lib')

describe('consumePokemonApi', () => {
  it('List should be an array', async () => {
    let limit = 10
    let offset = 10
    let r = await consumePokemonApi(limit,offset)
    expect(r.results).toEqual(expect.arrayContaining(r.results));
  })

  it('List should have 10 elements', async () => {
    let limit = 10
    let offset = 10
    let r = await consumePokemonApi(limit,offset)
    expect(r.results.length).toBe(limit)
  })  
})

describe('getDetailEachPokemon', () => {
  it('Must be a json', async () => {
    let list = await consumePokemonApi(10,10)
    let r = await getDetailEachPokemon(list.results)
    expect(r).toEqual(expect.objectContaining(r))
  })
  it('Must contain property averageHeight & be type number', async () => {
    let list = await consumePokemonApi(10,10)
    let r = await getDetailEachPokemon(list.results)
    expect(r).toHaveProperty('averageHeight')
    expect(typeof r.averageHeight).toEqual('number')
  })
  it('Must contain property averageWeight & be type number', async () => {
    let list = await consumePokemonApi(10,10)
    let r = await getDetailEachPokemon(list.results)
    expect(r).toHaveProperty('averageWeight')
    expect(typeof r.averageWeight).toEqual('number')
  })
})