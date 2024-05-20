<template>
  <div class="container mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 md:px-0" :data-nav="navId">
              <ProductCard v-for="(product, index) in products as any" :key="index" :product="product" />
            </div>
          </div>
  </template>
  
  <script lang="ts">
import ProductCard from "./ProductCard.vue";

export default {
	props: {
		tabId: {
			type: String,
			required: true,
		},
		navId: {
			type: String,
			required: true,
		},
		products: {
			type: Array,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		ProductCard,
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  