<template>
		  <SectionTitle :title="'New Products'" :items="['Laptops', 'Smartphones', 'Cameras', 'Accessories']" />
  		  <ProductsTabSlick
			tabId="tab1"
			navId="slick-nav-1"
			:products="products.slice(0,4)"
			:active="true"
		  />
  </template>
  
  <script lang="ts">
  import ProductsTabSlick from "./ProductsTabSlick.vue";
  import SectionTitle from "./SectionTitle.vue";
  import { productList } from "../utils/data.ts";
  
export default {
	data() {
		return {
			products: productList as any
		};
	},
	components: {
		SectionTitle,
		ProductsTabSlick
	}
};
</script>
  