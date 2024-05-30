<template>
  <div>
    <h2 class="font-bold text-2xl">Product Details</h2>
    <div class="grid gap-4 md:grid-cols-2 mt-4">
      <div class="grid gap-2">
        <h3 class="font-semibold">Specifications</h3>
        <div class="grid gap-2 text-gray-500 dark:text-gray-400">
          <div v-if="product.connectivity_options" class="flex justify-between">
            <span>Connectivity Options</span>
            <span>{{ product.connectivity_options }}</span>
          </div>
          <div v-if="product.power_requirements" class="flex justify-between">
            <span>Power Requirements</span>
            <span>{{ product.power_requirements }}</span>
          </div>
          <div v-if="product.weight" class="flex justify-between">
            <span>Weight</span>
            <span>{{ product.weight }} kg</span>
          </div>
          <div v-if="product.dimensions" class="flex justify-between">
            <span>Dimensions</span>
            <span>{{ product.dimensions }}</span>
          </div>
          <!-- Adicione mais especificações conforme necessário -->
        </div>
      </div>
      <div class="grid gap-2">
        <h3 class="font-semibold">Features</h3>
        <div class="grid gap-2 text-gray-500 dark:text-gray-400">
          <div v-if="product.features" v-for="feature in product.features.split(', ')" :key="feature" class="flex justify-between">
            <span>{{ feature }}</span>
            <span>Yes</span>
          </div>
          <!-- Adicione mais características conforme necessário -->
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Computed property para retornar as dimensões do produto
    dimensions() {
      if (this.product.length && this.product.width && this.product.height) {
        return `${this.product.length} x ${this.product.width} x ${this.product.height} cm`;
      }
      return null;
    },
  },
  };
  </script>
  