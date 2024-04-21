<template>
    <div>
      <h1>Our Products</h1>
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <div v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </template>
  
  <script>
export default {
	data() {
		return {
			selectedCategory: "",
			categories: [
				/* Array of categories */
			],
			products: [
				/* Array of products */
			],
		};
	},
	computed: {
		filteredProducts() {
			if (!this.selectedCategory) {
				return this.products;
			}
			return this.products.filter(
				(product) => product.categoryId === this.selectedCategory,
			);
		},
	},
	methods: {
		addToCart(product) {
			// Implement add to cart functionality
		},
	},
};
</script>
  