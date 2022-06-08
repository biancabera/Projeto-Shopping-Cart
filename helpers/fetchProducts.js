  // Tornei a função assíncrona pois como ela é dependente de API, fica mais adequado
const fetchProducts = async (product) => {
  // criei uma constante para armazenar o link da API já personalizada de acordo com o parâmetro passado, (product).
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  // criei uma constante para armazenar a fetch (com await) já que se trata de uma função assíncrona, na fetch passei o link da API utilizada como parâmetro.
  const resultados = await fetch(url)
  // dentro da fetch criei o 'em caso de sucesso' para que me retorne o response no formato 'json' ou 'object notation'.
    .then((response) => response.json())
    // e em caso de erro, o catch retorna o erro
    .catch((error) => error);
    // depois retorno a constante resultados dentro da função fetchProducts.
    return resultados;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
