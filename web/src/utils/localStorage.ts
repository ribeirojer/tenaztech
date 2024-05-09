// Função genérica para obter dados do localStorage
function getLocalStorageData(key: string): any[] {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// Função genérica para definir dados no localStorage
function setLocalStorageData(key: string, data: any[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Função para adicionar um item a uma lista no localStorage
function addItemToList(key: string, item: { id: any; }) {
  const list = getLocalStorageData(key);
  if (!list.find((listItem: { id: any; }) => listItem.id === item.id)) {
    list.push(item);
    setLocalStorageData(key, list);
    console.log('Item adicionado à lista:', key);
  } else {
    console.log('O item já está na lista:', key);
  }
}

// Função para remover um item de uma lista no localStorage
function removeItemFromList(key: string, itemId: any) {
  let list = getLocalStorageData(key);
  const index = list.findIndex((item: { id: any; }) => item.id === itemId);
  if (index !== -1) {
    list.splice(index, 1);
    setLocalStorageData(key, list);
    console.log('Item removido da lista:', key);
  } else {
    console.log('Item não encontrado na lista:', key);
  }
}

// Função para obter a lista de desejos do localStorage
export function getWishlist() {
  return getLocalStorageData('wishlist');
}

// Função para obter o carrinho do localStorage
export function getCart() {
  return getLocalStorageData('cart');
}

// Função para obter a lista de comparação do localStorage
export function getComparisonList() {
  return getLocalStorageData('comparison');
}

// Função para adicionar um produto à lista de desejos
export function addToWishlist(product: { id: any; }) {
  addItemToList('wishlist', product);
}

// Função para remover um produto da lista de desejos
export function removeFromWishlist(productId: any) {
  removeItemFromList('wishlist', productId);
}

// Função para adicionar um produto ao carrinho
export function addToCart(product: { id: any; }, quantity: any) {
  const cartItem = { ...product, quantity };
  addItemToList('cart', cartItem);
}

// Função para remover um produto do carrinho
export function removeFromCart(productId: any) {
  removeItemFromList('cart', productId);
}

// Função para adicionar um produto à lista de comparação
export function addToComparison(product: { id: any; }) {
  addItemToList('comparison', product);
}

// Função para remover um produto da lista de comparação
export function removeFromComparison(productId: any) {
  removeItemFromList('comparison', productId);
}
