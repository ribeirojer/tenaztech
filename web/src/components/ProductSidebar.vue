<template>
  <div class="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Categorias</h2>
    <ul>
      <li
        v-for="category in categories as string[]"
        :key="category"
        @click="selectCategory(category)"
        class="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-2 transition-colors duration-200"
      >
        {{ category }}
      </li>
    </ul>
    <h2 class="text-xl font-semibold my-4 text-gray-900 dark:text-gray-100">Filtrar por Preço</h2>
    <div class="space-y-2">
      <label class="flex items-center">
        <input type="radio" name="priceFilter" value="0-50" @change="applyPriceFilter" class="mr-2">
        <span class="text-gray-700 dark:text-gray-300">$0 - $50</span>
      </label>
      <label class="flex items-center">
        <input type="radio" name="priceFilter" value="50-100" @change="applyPriceFilter" class="mr-2">
        <span class="text-gray-700 dark:text-gray-300">$50 - $100</span>
      </label>
      <label class="flex items-center">
        <input type="radio" name="priceFilter" value="100-200" @change="applyPriceFilter" class="mr-2">
        <span class="text-gray-700 dark:text-gray-300">$100 - $200</span>
      </label>
      <label class="flex items-center">
        <input type="radio" name="priceFilter" value="200+" @change="applyPriceFilter" class="mr-2">
        <span class="text-gray-700 dark:text-gray-300">$200+</span>
      </label>
    </div>
    <div class="aside bg-gray-900 p-4 mb-4">
      <h2 class="text-white text-2xl mb-4">Marca</h2>
      <div class="checkbox-filter">
        <div class="input-checkbox" v-for="brand in brands" :key="brand">
          <input type="checkbox" :id="brand" class="checkbox-purple" v-model="selectedBrands" :value="brand">
          <label :for="brand" class="text-white">{{ brand }}</label>
        </div>
      </div>
    </div>
    <div class="product-list bg-gray-900 p-4">
      <h2 class="text-white text-center text-2xl mb-4">Mais Vendidos</h2>
      <div class="product-widget" v-for="product in bestSellers" :key="product.id">
        <div class="product-img"><img :src="product.image" :alt="product.name"></div>
        <div class="product-body">
          <h2 class="text-white text-xs">{{ product.category }}</h2>
          <a :href="`/produto?produtoId=${product.id}`" class="text-purple-500 font-bold">{{ product.name }}</a>
          <p class="text-white">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductSidebar',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectCategory: {
      type: Function,
      required: true,
    },
    applyPriceFilter: {
      type: Function,
      required: true,
    } as any,
  },
};
</script>

<style scoped>
/* Estilos da barra lateral */
li:hover {
  color: #4a90e2;
}
</style>
