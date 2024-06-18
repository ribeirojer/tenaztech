<template>
  <div>
    <div class="flex items-center">
      <h1 class="font-semibold text-lg md:text-2xl">All Products</h1>
      <button class="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Add product</button>
    </div>
    <div class="border shadow-sm rounded-lg mt-4">
      <table class="w-full">
        <thead>
          <tr>
            <th class="py-2 px-3 w-[80px]">Image</th>
            <th class="py-2 px-3 max-w-[150px]">Name</th>
            <th class="py-2 px-3 hidden md:table-cell">Status</th>
            <th class="py-2 px-3 hidden md:table-cell">Inventory</th>
            <th class="py-2 px-3">Vendor</th>
            <th class="py-2 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="py-2 px-3">
              <img :src="product.image || '/motivation.svg'" :alt="product.name" class="aspect-square rounded-md object-cover" width="64" height="64">
            </td>
            <td class="py-2 px-3 font-medium">{{ product.name }}</td>
            <td class="py-2 px-3 hidden md:table-cell">{{ product.status }}</td>
            <td class="py-2 px-3">{{ product.inventory }}</td>
            <td class="py-2 px-3">{{ product.vendor }}</td>
            <td class="py-2 px-3 text-right">
              <div class="relative">
                <button @click="toggleDropdown(product.id)" class="px-2 py-1 text-gray-500 hover:text-gray-900 focus:outline-none">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 12h.01M9 12h.01M12 9v.01M12 15v.01M12 12v.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"/>
                  </svg>
                  <span class="sr-only">Actions</span>
                </button>
                <div v-if="dropdownVisible === product.id" class="absolute right-0 z-10 bg-white shadow-lg rounded-lg mt-1">
                  <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</a>
                  <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      products: [] as any,
      dropdownVisible: null
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://api.example.com/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    toggleDropdown(id: any) {
      this.dropdownVisible = this.dropdownVisible === id ? null : id;
    }
  }
};
</script>

<style scoped>
/* Adicione seu CSS aqui, se necessário */
</style>
