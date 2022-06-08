require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // fail('Teste vazio');
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento computador, a função fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento computador, a função fetch foi chamada com o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento computador, a função retorna uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const actual = await fetchProducts('computador');
    expect(actual).toBe(computadorSearch);
  })

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const actual = await fetchProducts();
    const error = new Error('You must provide an url');
    expect(actual).toEqual(error);
  })
});