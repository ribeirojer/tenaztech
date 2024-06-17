<template>
  <div>
    <div v-if="loading" class="text-center py-6">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="text-center py-6 text-red-500">
      {{ error }}
    </div>
    <div v-else-if="product" class="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <ProductImages v-if="product.images" :images="product.images" />
      <div class="grid gap-4 md:gap-10 items-start">
        <ProductDetails :product="product" />
        <ProductForm v-if="product" />
      </div>
    </div>
    <div v-else class="text-center py-6">Product not found.</div>

    <div v-if="product" class="border-t py-6 px-4 md:px-6 max-w-6xl mx-auto">
      <Tabs :tabs="tabs" :selectedTab="selectedTab" @selectTab="selectTab"/>
      <transition name="fade" mode="out-in">
        <div class="mt-6" :key="selectedTab">
          <div v-if="selectedTab === 'description'">
            <h2 class="font-bold text-2xl">Product Description</h2>
            <div class="grid gap-4 mt-4 text-gray-500 dark:text-gray-400">
              <p>{{ product.description }}</p>
            </div>
          </div>
          <div v-if="selectedTab === 'specifications'">
            <ProductSpecifications :product="product" />
          </div>
          <div v-if="selectedTab === 'reviews'">
            <ProductReviews :rating="5" :reviews="[]" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import ProductImages from '../components/product/ProductImages.vue';
import ProductDetails from '../components/product/ProductDetails.vue';
import ProductForm from '../components/product/ProductForm.vue';
import ProductSpecifications from '../components/product/ProductSpecifications.vue';
import ProductReviews from '../components/product/ProductReviews.vue';
import Tabs from '../components/product/Tabs.vue';
import LoadingSpinner from '../components/core/LoadingSpinner.vue';

export default {
  components: {
    ProductImages,
    ProductDetails,
    ProductForm,
    ProductSpecifications,
    ProductReviews,
    Tabs,
    LoadingSpinner,
  },
  data() {
    return {
      product: null as any,
      loading: true,
      error: null,
      selectedTab: 'description', // Aba ativa inicial
      tabs: [
        { name: 'Description', value: 'description' },
        { name: 'Specifications', value: 'specifications' },
        { name: 'Reviews', value: 'reviews' }
      ],
    };
  },
  methods: {
    fetchProduct() {
      const productSlug = this.$route.params.slug;
      fetch(`https://product-catalog-service.deno.dev/api/products/${productSlug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching product: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          this.product = data;
          this.loading = false;
        })
        .catch(err => {
          this.error = err;
          this.loading = false;
        });
    },
    selectTab(value: string){
      this.selectedTab = value;
    }
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
