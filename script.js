function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// Função de Click
 const addClick = async (event) => {
  const elementId = event.target.parentNode.firstChild.innerText;
  const { id, title, price } = await fetchItem(elementId);
  const liProduct = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olList = document.querySelector('.cart__items');
  olList.appendChild(liProduct);
};

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const products = async (productName) => { // Criar const para chamar funcões
  const { results: arrayProducts } = await fetchProducts(productName);
  arrayProducts.forEach((product) => {
    const { id, title, thumbnail } = product;
    const productObj = { sku: id, name: title, image: thumbnail };
    createProductItemElement(productObj);
  });
};

window.onload = async () => { 
    await products('computador'); // chamar função no onload
 };
