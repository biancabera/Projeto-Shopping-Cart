const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // fail('Teste vazio');
  it('Verifica se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    const metodo = localStorage.getItem;
    expect(metodo).toHaveBeenCalled();
  })

  it('Verifica se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems();
    const metodo = localStorage.getItem;
    expect(metodo).toHaveBeenCalledWith('cartItems');
  })
  
});
