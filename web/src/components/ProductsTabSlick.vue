<template>
  <div class="container mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 md:px-0" :data-nav="navId">
              <Product v-for="(product, index) in products" :key="index" v-bind="product" />
            </div>
          </div>
  </template>
  
  <script lang="ts">
import Product from "./Product.vue";

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
		Product,
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  