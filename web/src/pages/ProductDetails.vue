<template>
  <div class="container mx-auto" v-if="product">
    <div class="flex">
      <div class="w-1/2 flex">
        <ProductThumbImgs :images="productImages" :altTexts="altTexts" />
        <ProductMainImg :productImage="product.image" altText="Product Image" />
      </div>
      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
        <div class="flex items-center mb-4">
          <div class="flex gap-1 text-yellow-400">
            <i v-for="star in 4" :key="star" class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </div>
          <a class="text-sm text-gray-600 ml-2" href="#">10 Review(s) | Add your review</a>
        </div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold">{{ formatCurrency(product.price) }} <del class="text-gray-500">{{ formatCurrency(product.oldprice) }}</del></h3>
          <span class="text-sm text-green-500">{{ product.availability }}</span>
        </div>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>

        <div class="flex flex-col md:flex-row md:gap-4 mb-4">
          <div class="w-full md:w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="size">Size</label>
            <select v-model="selectedSize" id="size" class="input-select">
              <option v-for="(size, index) in product.sizes" :key="index" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="w-full md:w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="color">Color</label>
            <select v-model="selectedColor" id="color" class="input-select">
              <option v-for="(color, index) in product.colors" :key="index" :value="color">{{ color }}</option>
            </select>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <div class="mr-4">
            <label class="block text-sm font-medium text-gray-700 mb-1" for="quantity">Qty</label>
            <div class="input-number flex items-center">
              <input v-model.number="quantity" type="number" id="quantity" class="input-text w-20 text-center" min="1">
              <span class="qty-up ml-1 cursor-pointer" @click="incrementQuantity">+</span>
              <span class="qty-down ml-1 cursor-pointer" @click="decrementQuantity">-</span>
            </div>
          </div>
          <button @click="addCart" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            <i class="fas fa-shopping-cart"></i> Add to cart
          </button>
        </div>

        <ul class="flex items-center gap-4">
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fas fa-heart"></i> Add to wishlist</a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fas fa-exchange-alt"></i> Add to compare</a></li>
        </ul>

        <ul class="flex items-center gap-4 mt-4">
          <li v-for="(category, index) in product.categories" :key="index">
            <span class="text-gray-500">Category:</span>
            <a href="#" class="text-green-500 hover:underline">{{ category }}</a>
          </li>
        </ul>

        <ul class="flex items-center gap-4 mt-2">
          <li class="text-gray-500">Share:</li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fab fa-google-plus"></i></a></li>
          <li><a href="#" class="text-gray-700 hover:text-gray-900"><i class="fas fa-envelope"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-700">Carregando...</div>
</template>

<script lang="ts">
import axios from 'axios';
import ProductThumbImgs from '../components/ProductThumbImgs.vue';
import ProductMainImg from '../components/ProductMainImg.vue';
import { addToCart } from "../utils/localStorage.ts"

export default {
  data() {
    return {
      product: null,
      selectedSize: '',
      selectedColor: '',
      quantity: 1,
      productImages: ['product01.png', 'product08.png'],
      altTexts: ['Product 1', 'Product 2']
    };
  },
  components: {
    ProductThumbImgs,
    ProductMainImg
  },
  created() {
    const productSlug = this.$route.params.slug;
    axios.get(`https://product-catalog-service.deno.dev/api/products/${productSlug}`)
      .then(response => {
        this.product = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar os detalhes do produto:', error);
      });
  },
  methods: {
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addCart() {
      addToCart(this.product, this.quantity)
      // Lógica para adicionar o produto ao carrinho
    },
    formatCurrency(value) {
      // Função para formatar o valor monetário (pode variar dependendo do seu formato)
      return `$${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
