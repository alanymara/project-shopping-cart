// Função para aparecer o elemento 'carregando...' na tela enquanto recebo os itens do retorno da Fetch
const loadingFetch = () => {
  const div = document.createElement('div');
  div.className = 'loading';
  const section = document.querySelector('.items');
  section.appendChild(div);
  div.innerText = 'carregando...';
};

// Função para remover o elemento 'carregando...' na tela depois que recebo os itens do retorno da Fetch
const loadingFetchRemove = () => {
  const div = document.querySelector('.loading');
  div.remove();
};

// Função para gerar o preço total dos itens que estão no carrinho de compra
const totalPrice = () => {
  const h3Price = document.querySelector('.total-price');
  const ol = document.querySelectorAll('.cart__item');
  let total = 0;
  for (let index = 0; index < ol.length; index += 1) {
    const itemProduct = ol[index];
    const itemPrice = itemProduct.innerText.split('$')[1];
    total += +itemPrice;
  }
  h3Price.innerText = total;
};

// Função para limpar a lista de itens no carrinho
const clearCart = () => {
  const olCart = document.querySelector('.cart__items');
  olCart.innerText = '';
  totalPrice();
};

// Recuperando o botão do DOM e adicionando evento de click para chamar a função de limpar o carrinho
const button = document.querySelector('.empty-cart');
button.addEventListener('click', clearCart);

// Função para tirar item do carrinho ao clicar nele e chamando a função totalPrice para atualizar o preço total
function cartItemClickListener(event) {
  event.target.remove();
  totalPrice();
}

// Função para criar li com item clicado
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função de click do botão 'adicionar ao carrinho' para add itens na lista do carrinho, chamando função totalPrice para ser atualizado o preço
 const addClick = async (event) => {
  const elementId = event.target.parentNode.firstChild.innerText;
  const { id, title, price } = await fetchItem(elementId);
  const liProduct = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olList = document.querySelector('.cart__items');
  olList.appendChild(liProduct);
  totalPrice();
};

// Função para criar imagem de cada item
function createProductImageElement(imageSource) {
  const imagem = imageSource.replace('I.jpg', 'W.webp');
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imagem;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Função para criar os elemento de cada item
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', addClick);

  const newItem = document.getElementsByClassName('items')[0];
  newItem.appendChild(section);
  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

// Função para filtrar informações da chave results e chm
const productsResults = async (productName) => { // Criar const para chamar funcões
  const { results: arrayProducts } = await fetchProducts(productName);
  arrayProducts.forEach((product) => {
    const { id, title, thumbnail } = product;
    const productObj = { sku: id, name: title, image: thumbnail };
    createProductItemElement(productObj);
  });
};

window.onload = async () => { 
    loadingFetch();
    totalPrice();
    await productsResults('computador');
    loadingFetchRemove();
     // chamar função no onload
 };
