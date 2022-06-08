require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // fail('Teste vazio');
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  it('Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch foi chamada com o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('Verifica se ao chamar a função fetchItem com o argumento "MLB1615760527", a função retorna uma estrutura de dados igual objeto item', async () => {
    const actual = await fetchItem('MLB1615760527');
    expect(actual).toEqual(item);
  })

  it('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const actual = await fetchItem();
    const error = new Error('You must provide an url');
    expect(actual).toEqual(error);
  })
});
