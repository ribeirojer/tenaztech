<template>
  <div class="wishlist container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Lista de Desejos</h1>
    <div v-if="isLoading" class="text-center text-gray-600">
      <span class="loader"></span> Carregando...
    </div>
    <div v-else>
      <div v-if="wishlist.length === 0" class="flex flex-col justify-center items-center">
          <img src="../../public/assets/19-5.png" alt="" class="size-80 -m-4 ">
          <span class="text-center text-gray-600">Sua lista de desejos está vazia.</span>
          <RouterLink to="/produtos" class="px-6 my-4 text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300">
            Ver produtos
          </RouterLink>
      </div>
      <div v-else>
        <div v-for="item in wishlist" :key="item.id" class="wishlist-item border rounded-lg shadow-lg p-4 mb-4">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="flex items-center mb-4 md:mb-0">
              <img :src="item.image" alt="Imagem do produto" class="h-20 w-20 object-cover rounded mr-4">
              <div>
                <h3 class="font-semibold text-lg">{{ item.name }}</h3>
                <p class="text-gray-600">{{ item.description }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 font-medium mr-4">{{ formatCurrency(item.price) }}</span>
              <button @click="removeFromWishlistHandler(item.id)" class="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" aria-label="Remover da lista de desejos">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <button @click="addToCartHandler(item)" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-4" aria-label="Adicionar ao carrinho">
                <i class="fas fa-shopping-cart"></i> Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { removeFromWishlist, getWishlist, addToCart } from '../utils/localStorage.ts';

export default {
  name: 'WishlistView',
  data() {
    return {
      wishlist: [] as any[],
      isLoading: true,
    };
  },
  methods: {
    loadWishlist() {
      const localWishlist = getWishlist();
      const promises = localWishlist.map((item: { slug: string; }) => {
        return axios.get(`https://product-catalog-service.deno.dev/api/products/${item.slug}`)
          .then(response => {
            this.wishlist.push(response.data);
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do produto:', error);
          });
      });

      Promise.all(promises).finally(() => {
        this.isLoading = false;
      });
    },
    removeFromWishlistHandler(productId: number) {
      removeFromWishlist(productId);
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
    },
    addToCartHandler(item: any) {
      addToCart(item, 1); // Adiciona 1 unidade do item ao carrinho
      this.removeFromWishlistHandler(item.id); // Remove o item da lista de desejos após adicioná-lo ao carrinho
    },
    formatCurrency(value: number) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },
  mounted() {
    this.loadWishlist();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.wishlist-item {
  transition: background-color 0.3s, transform 0.3s;
}

.wishlist-item:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

button {
  transition: color 0.3s ease;
}

h1 {
  color: #333;
}

.text-red-500 {
  transition: color 0.3s ease;
}

.text-red-500:hover {
  color: #e3342f;
}

.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
