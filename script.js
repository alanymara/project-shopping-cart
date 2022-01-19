const loadingFetch = () => {
  const div = document.createElement('div');
  div.className = 'loading';
  const body = document.querySelector('body');
  body.appendChild(div);
  div.innerText = 'carregando...';
};
loadingFetch();
const clearCart = () => {
  const olCart = document.querySelector('.cart__items');
  olCart.innerText = '';
};
const button = document.querySelector('.empty-cart');
button.addEventListener('click', clearCart);

const loadingFetchRemove = () => {
  const div = document.querySelector('.loading');
  div.remove();
};
/* const totalPrice = (price) => {
  const h3Price = document.querySelector('#total-price');
  const ol = document.querySelector('.cart__items');
  let total = 0;
  for (let index = 0; index < ol.childElementCount; index++) {
    const element = array[index];
  }
  total += price;
  h3Price.innerText = `Subtotal: ${total}`;
}; */

function cartItemClickListener(event) {
  return event.target.remove(); //  remove() Função para remover o item selecionado
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  /* const button = document.querySelector('.empty-cart');
  button.addEventListener('click', clearCart); */
  return li;
}
// Função de Click
 const addClick = async (event) => {
  const elementId = event.target.parentNode.firstChild.innerText;
  const { id, title, price } = await fetchItem(elementId);
  const liProduct = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olList = document.querySelector('.cart__items');
  olList.appendChild(liProduct);
 /*  let acumulador;
  acumulador += price; */
  // totalPrice(price);
};

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
/* 
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

const products = async (productName) => { // Criar const para chamar funcões
  const { results: arrayProducts } = await fetchProducts(productName);
  arrayProducts.forEach((product) => {
    const { id, title, thumbnail } = product;
    const productObj = { sku: id, name: title, image: thumbnail };
    createProductItemElement(productObj);
  });
};

window.onload = async () => { 
    await products('computador');
    loadingFetchRemove();
    /* totalPrice(0); */
     // chamar função no onload
 };
