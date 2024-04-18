<template>
    <div>
      <img :src="product.image" :alt="product.name" />
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: { /* Product details */ }
      };
    },
    methods: {
      addToCart(product) {
        // Implement add to cart functionality
      }
    }
  };
  </script>
  