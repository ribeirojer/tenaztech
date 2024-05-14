<template>
  <div class="container flex mx-auto gap-4">
    <div id="aside" class="flex flex-col lg:w-1/4">
      <div class="aside bg-gray-900 p-4">
        <h2 class="text-white text-2xl mb-4">Categorias</h2>
        <div class="checkbox-filter">
          <div class="input-checkbox" v-for="category in categories" :key="category.id">
            <input type="checkbox" :id="category.id" class="checkbox-purple" v-model="selectedCategories" :value="category.name">
            <label :for="category.id" class="text-white">{{ category.name }}</label>
          </div>
        </div>
      </div>
      <div class="aside bg-gray-900 p-4">
        <h2 class="text-white text-2xl mb-4">Preço</h2>
        <div class="price-slider">
          <input type="range" step="50" min="0" max="5000" class="input-range" v-model="selectedPrice">
          <h2 class="text-purple-500 text-2xl">R${{ selectedPrice }}</h2>
        </div>
      </div>
      <div class="aside bg-gray-900 p-4">
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
    <div class="lg:w-3/4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 md:px-0">
        <Product v-for="(product, index) in filteredProducts" :key="index" v-bind="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Product from "../components/Product.vue";
import axios from 'axios';

export default defineComponent({
  name: 'ProductListView',
  components: { Product },
  data() {
    return {
      products: [] as any[],
      bestSellers: [] as any[],
      categories: [
        { id: 'category-1', name: 'Laptops' },
        { id: 'category-2', name: 'Smartphones' },
        { id: 'category-3', name: 'Câmeras' },
        { id: 'category-4', name: 'Acessórios' },
        { id: 'category-5', name: 'Promoções' },
      ],
      brands: ['SAMSUNG', 'LG', 'SONY'],
      selectedCategories: [] as string[],
      selectedBrands: [] as string[],
      selectedPrice: 50,
      query: ''
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesCategory = this.selectedCategories.length ? this.selectedCategories.includes(product.category) : true;
        const matchesBrand = this.selectedBrands.length ? this.selectedBrands.includes(product.brand) : true;
        const matchesPrice = product.price <= this.selectedPrice;
        const matchesQuery = this.query ? product.category.toLowerCase().includes(this.query.toLowerCase()) : true;
        return matchesCategory && matchesBrand && matchesPrice && matchesQuery;
      });
    }
  },
  methods: {
    fetchProducts() {
      axios.get('https://product-catalog-service.deno.dev/api/products')
        .then(response => {
          console.log(response.data)
          this.products = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar produtos:', error);
        });
    },
    fetchBestSellers() {
      axios.get('https://product-catalog-service.deno.dev/api/best-sellers')
        .then(response => {
          this.bestSellers = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar mais vendidos:', error);
        });
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.query = urlParams.get('c') || '';
    this.fetchProducts();
    this.fetchBestSellers();
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

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

.grid {
  display: grid;
  gap: 20px;
}

.input-range {
  width: 100%;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
