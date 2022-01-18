require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem deve ser uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });
  it('fetch foi chamada após executar a função fetchItem com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveReturned();
  });
  it('Ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  });
  it('O retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item.', async () => {
    expect(await fetchItem('MLB1615760527')).toBe(item);
  });
  it('Ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect(await fetchItem()).toBe('Error: You must provide an url');
  });
});
