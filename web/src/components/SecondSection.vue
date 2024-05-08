<template>
	<div>
	  <SectionTitle :title="'New Products'" :items="['Laptops', 'Smartphones', 'Cameras', 'Accessories']" />
	  <ProductsTabSlick
		tabId="tab1"
		navId="slick-nav-1"
		:products="products.slice(0,4)"
		:active="true"
	  />
	</div>
  </template>
  
  <script lang="ts">
  import ProductsTabSlick from "./ProductsTabSlick.vue";
  import SectionTitle from "./SectionTitle.vue";
  import axios from 'axios';
  
  export default {
	data() {
	  return {
		products: [] as any
	  };
	},
	components: {
	  SectionTitle,
	  ProductsTabSlick
	},
	mounted() {
	  // Faz a requisição HTTP para obter os produtos
	  axios.get('https://product-catalog-service.deno.dev/api/products')
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
  