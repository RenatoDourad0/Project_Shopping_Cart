const fetchProducts = async (arg) => {
try {
  if (arg === undefined) {
    throw new Error('You must provide an url');
  } else {
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${arg}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  }
} catch (error) {
  return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
