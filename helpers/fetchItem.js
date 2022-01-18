const fetchItem = async (itemId) => {
  const url = `https://api.mercadolibre.com/items/${itemId}`;

  try {
    const response = await fetch(url);
    const productJason = await response.json();
    return productJason;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
