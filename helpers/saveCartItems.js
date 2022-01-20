const saveCartItems = (productsString) => {
  localStorage.setItem('cartItems', productsString);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
