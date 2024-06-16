<template>
	<div>
		<h3 class="text-center text-2xl font-semibold text-gray-800">Novos produtos</h3>
  <div class="container mx-auto">
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-0">
	  <ProductCard v-for="(product, index) in products as any" :key="index" :product="product" />
	</div>
  </div>
	</div>
  </template>
  
  <script lang="ts">
  import ProductCard from "../ProductCard.vue";
  import axios from 'axios';
  
  export default {
	data() {
	  return {
		products: [] as any
	  };
	},
	components: {
	  ProductCard
	},
	mounted() {
	  // Faz a requisição HTTP para obter os produtos
	  axios.get('https://product-service.deno.dev/api/products')
		.then(response => {
		  // Define os produtos retornados na resposta da requisição
		  this.products = response.data;
		})
		.catch(error => {
		  console.error('Erro ao carregar os produtos:', error);
		});
	}
  };
  </script>
  