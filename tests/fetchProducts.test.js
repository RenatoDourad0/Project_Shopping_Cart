require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Testa se a função fetchProducts', () => {
  it('tem o tipo function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  it('chamada com o argumento computador chama a funcao fetch', async () => {
    expect.assertions(1);
    const aswr = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('chamada com o argumento computador chama a funcao fetch com a string de endPoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);
    const aswr = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });
  it('chamada com o argumento computador retorna um objeto igual ao computadorSearch', async() => {
    expect.assertions(1);
    const fetch = await fetchProducts('computador');
    expect(fetch).toEqual(computadorSearch)
  });
  it('chamada sem argumentos retorna um erro: You must provide an url', async() => {
    expect.assertions(1);
    const fetch = await fetchProducts();
    expect(fetch).toEqual(new Error('You must provide an url'))
  });
});
