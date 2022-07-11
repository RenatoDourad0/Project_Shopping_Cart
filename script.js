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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const placeholder = event.target;
  placeholder.innerHTML = '';
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const itens = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

window.onload = async () => {
  const productsArray = await fetchProducts('computador');
  productsArray.results.forEach((element) => {
    const section = createProductItemElement(element);
    itens.appendChild(section);
  });
  itens.addEventListener('click', async (event) => {
    const product = await fetchItem(event.target.parentElement.firstChild.innerText);
    const cartProduct = createCartItemElement(product);
    cartItems.appendChild(cartProduct);
  });
 };
