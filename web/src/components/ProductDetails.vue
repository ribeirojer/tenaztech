<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col gap-4">
        <h1 class="font-bold text-3xl lg:text-4xl">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-0.5">
            <StarIcon v-for="n in 5" :key="n" class="w-5 h-5" :class="getStarClass(n)" />
          </div>
          <span>({{ product.rating }})</span>
        </div>
        <div class="text-4xl font-bold text-primary">${{ product.price.toFixed(2) }}</div>
        <button @click="addCart(product)" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-4">Adicionar ao Carrinho</button>
        <div v-if="feedbackMessage" class="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {{ feedbackMessage }}
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StarIcon from './StarIcon.vue';
import { addToCart } from "../utils/localStorage"
export default defineComponent({
  components: {
    StarIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      feedbackMessage: '',
    };
  },
  methods: {
    getStarClass(n: number) {
      return n <= this.product.rating ? 'text-yellow-500' : 'text-gray-300';
    },
    getReviewStarClass(rating: number, n: number) {
      return n <= rating ? 'text-yellow-500' : 'text-gray-300';
    },
    addCart(product: any) {
      addToCart(product, 1)
      // Lógica para adicionar o produto ao carrinho
      console.log('Produto adicionado ao carrinho:', product);
      this.feedbackMessage = 'Produto adicionado ao carrinho com sucesso!';
      setTimeout(() => {
        this.feedbackMessage = '';
      }, 3000);
    },
    changeMainImage(thumbnail: string) {
      this.product.image = thumbnail;
    }
  },
});
</script>
