<template>
  <div class="flex flex-col md:flex-row">
    <BarraLateral v-if="isShowSideBar" :categories="categories" :selectCategory="selectCategory" :applyPriceFilter="applyPriceFilter" />
  <div class="w-full md:w-3/4 p-4">
    <div class="flex justify-between items-center mb-4">

    <h1 class="text-2xl font-semibold">Produtos</h1>
    <button @click="toggleSideBar">
      <span v-if="isShowSideBar">Ocultar filtros</span>
      <span v-else>Mostrar filtros</span>
    </button></div>
    <Produtos :loading="loading" :error="error" :displayedProducts="displayedProducts" :searchTerm="searchTerm"/>
  </div>
</div>
  <!--<BestSellers :bestSellers="bestSellers" />-->
</template>

<script lang="ts">
import BarraLateral from '../components/BarraLateral.vue';
import Produtos from '../components/Produtos.vue';
import axios from 'axios';
import BestSellers from '../components/BestSellers.vue';

export default {
  components: {
    BarraLateral,
    Produtos,
    BestSellers,
  },
  data() {
    return {
      categories: [],
      products: [],
      bestSellers: [],
      selectedCategory: null,
      selectedPriceFilter: null,
      loading: false,
      isShowSideBar: false,
      searchTerm: '',
      category: '',
      error: null,
    };
  },
  mounted() {
    const urlParams = this.$route.fullPath.split("?")[1] || '';
    this.category = urlParams.split('c=')[1] || '';
    this.searchTerm = urlParams.split('p=')[1] || '';
    this.fetchProducts();
    this.fetchBestSellers();
  },
  computed: {
    displayedProducts() {
      let filteredProducts = this.products;
      if (this.selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
      }
      if (this.selectedPriceFilter) {
        const [minPrice, maxPrice] = this.selectedPriceFilter.split('-').map(parseFloat);
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
      }
      if (this.searchTerm) {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      return filteredProducts;
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('https://product-catalog-service.deno.dev/api/products');
        this.products = response.data;
        this.categories = [...new Set(this.products.map(product => product.category))];
      } catch (error) {
        this.error = 'Erro ao carregar produtos.';
      } finally {
        this.loading = false;
      }
    },
    async fetchBestSellers() {
      this.loading = true;
      try {
        const response = await axios.get('https://product-catalog-service.deno.dev/api/best-sellers');
        this.bestSellers = response.data;
      } catch (error) {
        this.error = 'Erro ao carregar best sellers.';
      } finally {
        this.loading = false;
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    applyPriceFilter(event) {
      this.selectedPriceFilter = event.target.value;
    },
    applySearchFilter(searchTerm) {
      this.searchTerm = searchTerm;
    },
    toggleSideBar(){
      this.isShowSideBar = !this.isShowSideBar
    }
  },
};
</script>
