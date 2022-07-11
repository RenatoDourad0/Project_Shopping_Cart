const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Testa se a função saveCartItems', () => {
  it('quando chamada com o argumento: <ol><li>Item</li></ol>. chama o metodo localStorage.setItem ', () => {
    expect.assertions(1);
    const aswr = saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('quando chamada com o argumento: <ol><li>Item</li></ol>. chama o metodo localStorage.setItem ', () => {
    expect.assertions(1);
    const aswr = saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
  it('quando chamada sem argumentos lanca erro', () => {
    expect.assertions(1);
    expect(saveCartItems()).toEqual(new Error('um argumento deve ser fornecido'));
  });
});
