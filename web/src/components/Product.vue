<template>
	<div class="product shadow-lg rounded-lg overflow-hidden bg-white">
	  <div class="product-image">
		<router-link :to="'/produto/' + product.slug">
		  <img :src="product.image" alt="Product Image" class="w-full h-auto">
		</router-link>
	  </div>
	  <div class="product-details p-4">
		<h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
		<div class="product-price mb-2">
		  <span class="current-price font-bold text-blue-600">{{ product.price }}</span>
		  <span v-if="product.oldPrice" class="old-price text-gray-500 line-through">{{ product.oldPrice }}</span>
		</div>
		<button @click="addToCart" class="add-to-cart-button bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out">Add to Cart</button>
	  </div>
	</div>
  </template>
  
  <script lang="ts">
  export default {
	props: {
	  product: {
		type: Object,
		required: true
	  }
	},
	methods: {
	  addToCart() {
		// Emit an event to notify the parent component that the product is added to cart
		this.$emit('add-to-cart', this.product);
	  }
	}
  };
  </script>
  
  <style scoped>
  .product {
	transition: transform 0.3s ease-in-out;
  }
  
  .product:hover {
	transform: translateY(-5px);
  }
  
  .product-image img {
	transition: transform 0.3s ease-in-out;
  }
  
  .product:hover .product-image img {
	transform: scale(1.05);
  }
  </style>
  