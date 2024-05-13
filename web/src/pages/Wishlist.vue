<template>
  <div class="wishlist">
    <h1 class="text-2xl font-semibold mb-4">Lista de Desejos</h1>
    <div v-if="wishlist.length === 0" class="text-gray-600">Sua lista de desejos está vazia.</div>
    <div v-else>
      <div v-for="item in wishlist" :key="item.id" class="wishlist-item border-b py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="item.image" alt="Product Image" class="h-20 w-20 mr-4">
            <div>
              <h3 class="font-semibold text-lg">{{ item.name }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 mr-4">{{ item.price }}</span>
            <button @click="removeFromWishlistHandler(item.id)" class="text-red-500 hover:text-red-700 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { removeFromWishlist } from '../utils/localStorage.ts';

export default {
  name: 'WishlistView',
  data() {
    return {
      wishlist: [] as any,
    };
  },
  methods: {
    loadWishlist() {
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      localWishlist.forEach((item: { id: any; }) => {
        axios.get(`http://seuservidor.com/api/produtos/${item.id}`)
          .then(response => {
            this.wishlist.push(response.data);
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do produto:', error);
          });
      });
    },
    removeFromWishlistHandler(productId: any) {
      removeFromWishlist(productId);
      this.wishlist = this.wishlist.filter((item: { id: any; }) => item.id !== productId);
    },
  },
  mounted() {
    this.loadWishlist();
  },
};
</script>

<style scoped>
.wishlist-item {
  transition: background-color 0.3s;
}

.wishlist-item:hover {
  background-color: #f5f5f5;
}
</style>
