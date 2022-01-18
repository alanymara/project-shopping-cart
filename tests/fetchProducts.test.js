require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts deve ser uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });
  it('fetch foi chamada após executar a função fetchProducts com o argumento "computador"', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveReturned();
  });
  it('Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it('O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
    expect(await fetchProducts('computador')).toBe(computadorSearch);
  });
  it('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchProducts()).toBe('Error: You must provide an url');
  });
});
