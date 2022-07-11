require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Testa se a função fetchItem', () => {
  it('tem o tipo function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  it('chamada com o argumento: MLB1615760527. Chama fetch', async () => {
    expect.assertions(1);
    const aswr = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('chamada com o argumento: MLB1615760527. Chama fetch com o endPoint especificado', async () => {
    expect.assertions(1);
    const aswr = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('chamada com o argumento: MLB1615760527. retorna o objeto especificado', async () => {
    expect.assertions(1);
    const aswr = await fetchItem('MLB1615760527')
    expect(aswr).toEqual(item);
  });
  it('chamada sem argumentos retorna o erro especificado', async () => {
    expect.assertions(1);
    const aswr = await fetchItem()
    expect(aswr).toEqual(new Error('You must provide an url'));
  });
});
