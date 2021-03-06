const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  
  try {
  const response = await fetch(url);
  const data = response.json();
  return data;
  } catch (error) {
    return `${error}`;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
