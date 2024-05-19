<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="product in products" :key="product.name" :product="product" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ProductCard from './ProductCard.vue';
  
  export default defineComponent({
    name: 'ProductGrid',
    components: {
      ProductCard
    },
    props: {
      products: {
        type: Array as PropType<Array<{
          name: string;
          image: string;
          description: string;
          price: number;
          rating: number;
        }>>,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  