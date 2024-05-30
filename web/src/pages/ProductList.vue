<template>
  <div class="flex flex-col md:flex-row">
    <BarraLateral
      v-if="isShowSideBar || isLargeScreen"
      :categories="categories"
      :selectCategory="selectCategory"
      :applyPriceFilter="applyPriceFilter"
    />
    <div class="w-full md:w-3/4 p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Produtos</h1>
        <button @click="toggleSideBar" v-if="!isLargeScreen">
          <span v-if="isShowSideBar">Ocultar filtros</span>
          <span v-else>Mostrar filtros</span>
        </button>
      </div>
    <div v-if="searchTerm" class="text-gray-700 mb-4">
      Resultados para: <span class="font-semibold">{{ searchTerm }}</span>
    </div>
    <div v-if="loading" class="text-gray-600">Carregando...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <div v-if="displayedProducts.length === 0" class="text-gray-700">
        Nenhum produto encontrado para "{{ searchTerm }}".
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ProductCard v-for="product in displayedProducts as any" :key="product.id" :product="product"/>
      </div>
    </div>
      <div class="flex justify-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="mx-2 px-4 py-2 bg-gray-300 rounded">
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="mx-2 px-4 py-2 bg-gray-300 rounded">
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BarraLateral from '../components/BarraLateral.vue';
import ProductCard from '../components/ProductCard.vue';
import axios from 'axios';
import BestSellers from '../components/BestSellers.vue';

export default {
  components: {
    BarraLateral,
    ProductCard,
    BestSellers,
  },
  data() {
    return {
      categories: [] as any,
      products: [] as any,
      bestSellers: [] as any,
      selectedCategory: null,
      selectedPriceFilter: null as any,
      loading: false,
      isShowSideBar: false,
      isLargeScreen: false,
      searchTerm: '',
      category: '',
      error: '',
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  mounted() {
    const urlParams = this.$route.fullPath.split("?")[1] || '';
    this.category = urlParams.split('c=')[1] || '';
    this.searchTerm = urlParams.split('p=')[1] || '';
    this.fetchProducts();
    this.fetchBestSellers();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  computed: {
    displayedProducts() {
      let filteredProducts = this.products;
      if (this.selectedCategory) {
        filteredProducts = filteredProducts.filter((product: { category: null; }) => product.category === this.selectedCategory);
      }
      if (this.selectedPriceFilter) {
        const [minPrice, maxPrice] = this.selectedPriceFilter.split('-').map(parseFloat);
        filteredProducts = filteredProducts.filter((product: { price: number; }) => product.price >= minPrice && product.price <= maxPrice);
      }
      if (this.searchTerm) {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter((product: { name: string; }) =>
          product.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      return filteredProducts;
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.displayedProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.displayedProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('https://product-catalog-service.deno.dev/api/products');
        this.products = response.data;
        this.categories = [...new Set(this.products.map((product: { category: any; }) => product.category))];
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
    selectCategory(category: null) {
      this.selectedCategory = category;
    },
    applyPriceFilter(event: { target: { value: null; }; }) {
      this.selectedPriceFilter = event.target.value;
    },
    applySearchFilter(searchTerm: string) {
      this.searchTerm = searchTerm;
    },
    toggleSideBar(){
      this.isShowSideBar = !this.isShowSideBar;
    },
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 768;
      if (this.isLargeScreen) {
        this.isShowSideBar = true;
      } else {
        this.isShowSideBar = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
};
</script>

<style scoped>
/* Estilos para a página de lista de produtos */
</style>
