<template>
    <div class="offers-view">
      <h1 class="text-2xl font-semibold mb-4">Ofertas Especiais</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(offer, index) in offers" :key="index" class="offer-item p-4 border rounded-lg shadow">
          <img :src="offer.image" :alt="offer.name" class="w-full h-48 object-cover mb-4 rounded">
          <h2 class="text-lg font-medium">{{ offer.name }}</h2>
          <p class="text-gray-600 mb-2">{{ formatCurrency(offer.price) }}</p>
          <button class="btn-primary" @click="addToCart(offer)">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'OffersView',
    data() {
      return {
        offers: [] as Array<{ name: string; price: number; image: string; }>,
      };
    },
    mounted() {
      this.fetchOffers();
    },
    methods: {
      async fetchOffers() {
        try {
          const response = await axios.get('/api/offers');
          this.offers = response.data;
        } catch (error) {
          console.error('Erro ao buscar ofertas:', error);
        }
      },
      formatCurrency(value: number) {
        return `$${value.toFixed(2)}`;
      },
      addToCart(_offer: { name: string; price: number; image: string; }) {
        // Lógica para adicionar a oferta ao carrinho
      }
    }
  });
  </script>
  
  <style scoped>
  .offers-view {
    padding: 20px;
  }
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  