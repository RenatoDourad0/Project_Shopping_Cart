const fetchItem = async (id) => {
try {
  if (id === undefined) {
    throw new Error('You must provide an url');
  } else {
    const endPoint = `https://api.mercadolibre.com/items/${id}`;
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
    fetchItem,
  };
}
