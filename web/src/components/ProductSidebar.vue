<template>
    <div class="aside bg-gray-900 p-4 mb-4">
      <h2 class="text-white text-2xl mb-4">Categorias</h2>
      <div class="checkbox-filter">
        <div class="input-checkbox" v-for="category in categories" :key="category.id">
          <input type="checkbox" :id="category.id" class="checkbox-purple" v-model="selectedCategories" :value="category.name">
          <label :for="category.id" class="text-white">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <div class="aside bg-gray-900 p-4 mb-4">
      <h2 class="text-white text-2xl mb-4">Preço</h2>
      <div class="price-slider">
        <input type="range" step="50" min="0" max="5000" class="input-range" v-model="selectedPrice">
        <h2 class="text-purple-500 text-2xl">R${{ selectedPrice }}</h2>
      </div>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductSidebar',
  props: {
    categories: {
      type: Array as any,
      required: true
    },
    selectedCategories: {
      type: Array as any,
      required: true
    },
    selectedPrice: {
      type: Number,
      required: true
    },
    brands: {
      type: Array as any,
      required: true
    },
    selectedBrands: {
      type: Array as any,
      required: true
    },
    bestSellers: {
      type: Array as any,
      required: true
    }
  },
  methods: {
    formatCurrency(value: number) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },
});
</script>

<style scoped>
.aside {
  background-color: #1a202c;
  padding: 20px;
  border-radius: 8px;
}

.checkbox-filter .input-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-filter .input-checkbox input {
  margin-right: 10px;
}

.product-list .product-widget {
  display: flex;
  margin-bottom: 10px;
}

.product-widget .product-img img {
  width: 100%;
  border-radius: 8px;
}

.product-widget .product-body {
  margin-left: 10px;
}

.input-range {
  width: 100%;
}
</style>
