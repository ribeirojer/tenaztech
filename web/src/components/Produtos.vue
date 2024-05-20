<template>
    <div v-if="searchTerm" class="text-gray-700 mb-4">
      Resultados para: <span class="font-semibold">{{ searchTerm }}</span>
    </div>
    <div v-if="loading" class="text-gray-600">Carregando...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <div v-if="displayedProducts.length === 0" class="text-gray-700">
        Nenhum produto encontrado para "{{ searchTerm }}".
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard v-for="product in displayedProducts as any" :key="product.id" :product="product"/>
      </div>
    </div>
</template>

<script lang="ts">
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    displayedProducts: {
      type: Array,
      required: true,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
};
</script>
