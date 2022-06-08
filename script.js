const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  // Requisito 5
  // Aproveitei a função que já existia (cartItemClickListener) e que já recebia o parâmetro 'event'. Também já havia configurado um addEventlistener dentro da função 'createCartItemElement' para o evento do tipo 'click'. Na função atual fiz a execução de que ao clicar naquele 'alvo' que recebe o evento click, esse 'alvo' será removido do seu 'parentNode'. Ou seja, excluindo o elemento daquela 'ol'. (referente a linha 32 do arquivo 'index.html')
  // Tive que ignorar essa função para inserir dentro da função abaixo.
  // event.target.remove();
};

// Requisito 9
// Crio uma constante com o valor inicial 0, para somar p preço a cada item adicionado ao carrinho.
let sumPrice = 0;
// Crio uma constante manipulando o dom com a classe 'cart', que tem 'ol' (dos 'li' do carrinho de compras) e button (de esvaziar carrinho) como filhos.
const cartFather = document.getElementsByClassName('cart')[0];
// crio o elemento parágrafo na constante abaixo 
const elementPrice = document.createElement('p');
// Ao criar o elemento, atribuo a classe 'total-price'
elementPrice.className = 'total-price';
// Ao criar o elemento, adiciono o innerText sendo a minha variável 'sumPrice' que inicia do zero.
elementPrice.innerText = sumPrice;
// Atribuo como 'pai' do meu elemento criado a classe armazenada no cartFather.
cartFather.appendChild(elementPrice);

// dentro da função abaixo, alterei os parâmetros para que seja atribuído a chave correta do objeto utilizado.
const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // agora minha variável é somada com o preço do item adicionado no momento.
  sumPrice += salePrice;
  // o elemento que criei para mostrar na minha página o preço do total dos itens do carrinho, agora será o arredondamento da variável 'sumPrice', modificada. Além disso, precisei multiplicar por 100 para depois dividir por 100, para respeitar os decimais que o requisito pediu. 
  // http://ptcomputador.com/P/javascript-programming/90880.html utilizei como referência para resolver a linha abaixo.
  elementPrice.innerText = (Math.round(sumPrice * 100)) / 100;
  // Mantive o escutador de eventos do tipo click na listItem, porém agora inseri a função de remover cada listItem aqui dentro. Pois quando uma das duas funções estava fora, estava dando erro pois eu ainda não havia declarado a outra função. Por isso precisei juntá-las numa só.
  li.addEventListener('click', (event) => {
  // minha função continua removendo o nó filho, ao clicar em certo alvo dentro do carrinho de compras.
    event.target.remove();
  // além disso, agora a minha variável sumPrice subtrai o valor do item a ser removido.
    sumPrice -= salePrice;
  // Com o valor sumPrice atualizado, insiro novamente o innerText, do elementPrice, com a mesma regra de arredondamento já feita acima.
    elementPrice.innerText = (Math.round(sumPrice * 100)) / 100;
    });
  return li;
};

// // Requisito 4
// Criei uma função assíncrona que recebe um id para executar o fetchItem
const choosingItem = async (id) => {
// Crio uma constante que manipula o DOM (o primeiro e único elemento) da classe 'cart__items',
  const cartListItems = document.getElementsByClassName('cart__items')[0];
// eu tornei essa classe como 'pai' do item criado pela função 'createCartItemElement'. Esse item criado é baseado nas informações retornadas pela 'fetchItem' de acordo com o parâmetro 'id'. Como fetchItem é uma função assíncrona, chamei ela utilizando o await.
  cartListItems.appendChild(createCartItemElement(await fetchItem(id)));
};
// Abaixo, criei uma função para criar os botões de adicionar ao carrinho.
const createButton = (sku) => {
// Criei uma constante que cria o botão através da função 'createCustomElement', atribuindo aos parâmetros elemento:'button', classe:'item__add' e innerText:'Adicionar ao carrinho!'. 
  const buttonToCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
// Por fim, com esse botão já criado, adiciono o escutador de eventos à constante acima, do tipo que clica e executa a função choosingItem com o 'sku' passado pelo parâmetro. (que é o ID do item específico).
  buttonToCart.addEventListener('click', () => choosingItem(sku));
  return buttonToCart;
};

// dentro da função abaixo, alterei os parâmetros para que seja atribuído a chave correta do objeto utilizado.
const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
// criei uma constante que armazena o elemento que tenha classe 'items' na posição zero.
  const itemsClass = document.getElementsByClassName('items')[0];
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
// Abaixo, mantive a section se tornando 'pai' do botão criado, mas agora a criação do meu botão e de mais atribuições a ele são feitas na função 'createButton'.
  section.appendChild(createButton(sku));
// dentro da classe 'items' será recebido como filho a section criada.
  itemsClass.appendChild(section);
  return section;
};
  
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// Requisito 2
// Crio uma função assíncrona que ao receber um parâmetro com uma string, que é relacionada aos produtos desejados, criará uma listagem com as fotos, nomes e botões de adicionar ao carrinho.
  const productsList = async (searchData) => {
// Crio outra constante para cada item da lista ser executada a função que cria sua sessão correspondente no HTML.
  const createItem = (item) => createProductItemElement(item);
// Retorno a função abaixo que é a responsável pelo API com o parâmetro especificado na função 'productsList'
  return fetchProducts(searchData)
// Para cada item do array results, (que é a lista gerada), executa um forEach que cria as sections do HTML
  .then((data) => data.results.forEach(createItem));
};

// Requisito 10
// Criei uma constante para resgatar a ol que é o 'pai' das 'li' que foram criadas ao adicionar os itens no carrinho
const listFatherCart = document.querySelector('.cart__items');
// Tentei fazer uma função com arrow function abaixo, porém o código quebrava toda hora, acredito que seja por conta do 'while', então deixei como uma função normal.
function emptyCartButton() {
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  // Apesar de ainda não conhecer o 'while', após pesquisar como remover elementos filhos com manipulação DOM, consegui resolver utilizando o exemplo do site acima. Enquanto o while é verdade, ele executa o escopo das chaves, que seria a remoção de cada último filho por vez.
  while (listFatherCart.firstChild) {
    listFatherCart.removeChild(listFatherCart.lastChild);
  // Agora, ao esvaziar o carrinho, o sumPrice também zera. E seu innerText recebe atualização.
    sumPrice = 0;
    elementPrice.innerText = sumPrice;
  }
}
// Criei uma constante que resgata o botão de Esvaziar Carrinho cuja classe é '.empty-cart'
const buttonEmptyCart = document.querySelector('.empty-cart');
// Com isso faço o escutador de eventos do tipo click que executará a função abaixo no botão esvaziar'
buttonEmptyCart.addEventListener('click', emptyCartButton);

window.onload = () => {
// Ao iniciar a página, já é carregada a função 'productsList' com o parâmetro 'computador'
    productsList('computador');
 };
