const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // fail('Teste vazio');
  it('Verifica se ao executar a função com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const metodo = localStorage.setItem;
    expect(metodo).toHaveBeenCalled();
  })

  it('Verifica se ao executar a função com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const metodo = localStorage.setItem;
    expect(metodo).toHaveBeenCalledWith(('cartItems', '<ol><li>Item</li></ol>'));
  })

});
