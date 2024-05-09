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
            <button @click="removeFromWishlist(item.id)" class="text-red-500 hover:text-red-700 focus:outline-none">
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
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { removeFromWishlist } from '../utils/localStorage.ts'; // Importando a função de remoção da lista de desejos

export default defineComponent({
  name: 'WishlistView',
  setup() {
    const wishlist = ref([]); // Referência reativa para a lista de desejos

    // Função para carregar a lista de desejos do local storage e fazer requisições HTTP para cada item
    const loadWishlist = () => {
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      localWishlist.forEach((item: any) => {
        axios.get(`http://seuservidor.com/api/produtos/${item.id}`)
          .then(response => {
            wishlist.value.push(response.data);
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do produto:', error);
          });
      });
    };

    // Função para remover um item da lista de desejos
    const removeFromWishlistHandler = (productId: any) => {
      removeFromWishlist(productId); // Chamando a função para remover o item da lista de desejos
      wishlist.value = wishlist.value.filter((item: any) => item.id !== productId); // Atualizando a lista de desejos localmente
    };

    onMounted(() => {
      loadWishlist(); // Chamando a função para carregar a lista de desejos quando o componente é montado
    });

    return { wishlist, removeFromWishlistHandler };
  },
});
</script>

<style scoped>
/* Estilos para a página de lista de desejos */
.wishlist-item {
  transition: background-color 0.3s;
}

.wishlist-item:hover {
  background-color: #f5f5f5;
}
</style>
