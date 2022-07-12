const itens = document.querySelector('.items');
// const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const bodyelement = document.querySelector('body');
const totalPrice = document.querySelector('.total-price');
const cartProductsArray = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const priceLogic = (priceString) => {
    let price = '';
  for (let index = 0; index < priceString.length; index += 1) {
    if (priceString[index].match(/[0-9]/) || priceString[index].match(/\./)) {
      price += priceString[index];
    }
  }
  return parseFloat(price);
};

const cartItemClickListener = (event) => {
  const placeholder = event.target.parentElement;
  placeholder.removeChild(event.target);
  localStorage.removeItem('cartItems');
  const product = event.target.innerText;
  const priceString = product.substring(product.length - 13, product.length);
  const price = priceLogic(priceString);
  console.log(price);
  const currentPrice = parseFloat(totalPrice.innerText, 10);
  console.log(currentPrice, price);
  totalPrice.innerText = `${currentPrice - price}`;
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getLocalStorageSavedCartItems = () => {
  if (localStorage.length > 0) {
    const savedStringItems = getSavedCartItems();
    const savedItems = savedStringItems.substring(0, savedStringItems.length - 3).split(' / ,');
    savedItems.forEach((item) => {
      const newLi = document.createElement('li');
      newLi.className = 'cart__item';
      newLi.innerText = item;
      newLi.addEventListener('click', cartItemClickListener);
      cartItems.appendChild(newLi);
    });
  }
};

const emptyCartOnClick = () => {
  emptyCart.addEventListener('click', () => {
    const childrenElements = Array.from(cartItems.children);
    childrenElements.forEach((element) => cartItems.removeChild(element));
    localStorage.removeItem('cartItems');
    totalPrice.innerText = '0';
  });
};

const createLoadingElement = () => {
  const newDiv = document.createElement('h2');
  newDiv.className = 'loading';
  newDiv.innerText = 'carregando...';
  newDiv.style.backgroundColor = 'white';
  newDiv.style.position = 'absolute';
  newDiv.style.padding = '20px';
  newDiv.style.top = '50vh';
  newDiv.style.left = '50vw';
  return newDiv;
};

const getProductsArrayFunc = async () => {
  const loading = bodyelement.appendChild(createLoadingElement());
  const productsArray = await fetchProducts('computador');
  bodyelement.removeChild(loading);
  productsArray.results.forEach((element) => {
  const section = createProductItemElement(element);
  itens.appendChild(section);
  });
};

const getCartProductsOnClick = () => {
  itens.addEventListener('click', async (event) => {
    const product = await fetchItem(event.target.parentElement.firstChild.innerText);
    const cartProduct = createCartItemElement(product);
    cartItems.appendChild(cartProduct);
    cartProductsArray.push(`${cartProduct.innerText} / `);
    saveCartItems(cartProductsArray);
    const productPrice = parseFloat(product.price, 10);
    const currentPrice = parseFloat(totalPrice.innerText, 10);
    totalPrice.innerText = `${productPrice + currentPrice}`;
  });
};

window.onload = () => {
  getLocalStorageSavedCartItems();
  getProductsArrayFunc();
  emptyCartOnClick();
  getCartProductsOnClick();
 };
