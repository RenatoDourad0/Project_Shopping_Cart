const itens = document.querySelector('.items'); 
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
  e.style.textAlign = 'left';
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image.replace('-I.jpg', '-W.jpg')));
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
  if (event.target.tagName === 'LI') {
    placeholder.removeChild(event.target);
    localStorage.removeItem('cartItems');
    const product = event.target.innerText;
    const priceString = product.substring(product.length - 13, product.length);
    const price = priceLogic(priceString);
    const currentPrice = parseFloat(totalPrice.innerText, 10);
    totalPrice.innerText = `${currentPrice - price}`;
  }
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice, thumbnail }) => {
  const img = document.createElement('img');
  img.src = `${thumbnail.replace('-I.jpg', '-W.jpg')}`;
  img.style.width = '100px';
  img.style.borderRadius = '100px';
  img.style.marginRight = '10px';
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.background = 'rgb(246, 246, 246)';
  li.style.margin = '10px';
  li.style.padding = '10px';
  li.style.height = 'fit-content';
  li.className = 'cart__item';
  li.innerText = `${name} \n \n Valor: $${salePrice}`;
  li.insertAdjacentElement('afterbegin', img);
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const localStorageLiProperties = (item, img) => {
  const newLi = document.createElement('li');
  newLi.style.display = 'flex';
  newLi.style.alignItems = 'center';
  newLi.className = 'cart__item';
  newLi.innerText = item.substring(item.indexOf(' '), item.length);
  newLi.style.background = 'rgb(246, 246, 246)';
  newLi.style.margin = '10px';
  newLi.style.padding = '10px';
  newLi.insertAdjacentElement('afterbegin', img);
  newLi.addEventListener('click', cartItemClickListener);
  return newLi;
};

const localStorageImgProperties = (url) => {
  const img = document.createElement('img');
  img.src = `${url}`;
  img.style.width = '100px';
  img.style.borderRadius = '100px';
  img.style.marginRight = '10px';
  return img;
};

const getLocalStorageSavedCartItems = () => {
  if (localStorage.length > 0) {
    const savedStringItems = getSavedCartItems();
    const savedItems = savedStringItems.substring(0, savedStringItems.length - 3)
      .split(' / ,');
    savedItems.forEach((item) => {
      const url = item.substring(0, item.indexOf(' '));
      const img = localStorageImgProperties(url);
      const newLi = localStorageLiProperties(item, img);
      cartItems.appendChild(newLi);
      const priceString = item.substring(item.length - 13, item.length);
      const price = priceLogic(priceString);
      const currentPrice = parseFloat(totalPrice.innerText, 10);
      totalPrice.innerText = `${currentPrice + price}`;
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
  newDiv.style.borderRadius = '20px';
  return newDiv;
};

const getProductsArrayFunc = async () => {
  const input = document.getElementById('searchBar');
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = input.value;
    const loading = bodyelement.appendChild(createLoadingElement());
    const productsArray = await fetchProducts(inputValue);
    console.log(productsArray)
    bodyelement.removeChild(loading);
    itens.innerHTML = '';
    productsArray.results.forEach((element) => {
    const section = createProductItemElement(element);
    itens.appendChild(section);
  })
  })
};

const getCartProductsOnClick = () => {
  itens.addEventListener('click', async (event) => {
    if(event.target.parentElement.firstChild.innerText !== undefined) {
      const product = await fetchItem(event.target.parentElement.firstChild.innerText);
      const cartProduct = createCartItemElement(product);
      cartItems.appendChild(cartProduct);
      cartProductsArray.push(`${product.thumbnail} ${cartProduct.innerText} / `);
      saveCartItems(cartProductsArray);
      const productPrice = parseFloat(product.price, 10);
      const currentPrice = parseFloat(totalPrice.innerText, 10);
      totalPrice.innerText = `${productPrice + currentPrice}`;
    }
  });
};

window.onload = () => {
  getLocalStorageSavedCartItems();
  getProductsArrayFunc();
  emptyCartOnClick();
  getCartProductsOnClick();
 };
