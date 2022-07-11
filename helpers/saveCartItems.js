const saveCartItems = (arg) => {
  try {
    if (arg === undefined) {
      throw new Error('um argumento deve ser fornecido');
    } else {
      localStorage.setItem('cartItems', arg);
    }
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
