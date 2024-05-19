<template>
  <div
    class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50"
    role="button"
    tabindex="0"
    aria-label="View product details"
  >
    <div class="aspect-[4/3] overflow-hidden border-b border-gray-200 dark:border-gray-800">
      <router-link
        :to="'/produto/' + product.slug"
      >
        <img
          :alt="product.name"
          :src="product.image"
          class="h-full w-full object-contain transition-all group-hover:scale-105 rounded-t-lg"
          width="400"
          height="300"
        />
      </router-link>
    </div>
    <div class="p-4">
      <div class="flex flex-col items-center justify-between">
        <router-link
        :to="'/produto/' + product.slug"
      ><h3 class="font-semibold text-center text-2xl md:text-base text-gray-800 hover:text-gray-600 dark:text-gray-200">{{ product.name }}</h3>
        </router-link><div class="flex items-center gap-1 mt-2">
          <StarIcon v-for="n in 5" :key="n" :class="starClass(n, product.rating)" />
        </div>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-2xl font-bold text-gray-600 dark:text-gray-200">{{ formatCurrency(product.price) }}</span>
        <button
          class="flex items-center border border-black text-white bg-gray-100 pr-2 pl-3 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950"
          aria-label="Add to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 fill-black text-white"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path><path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import StarIcon from './StarIcon.vue';

export default defineComponent({
  name: 'ProductCard',
  components: {
    StarIcon,
  },
  props: {
    product: {
      type: Object as PropType<{
        name: string;
        image: string;
        price: number;
        rating: number;
        slug: string;
      }>,
      required: true
    }
  },
  methods: {
    formatCurrency(value: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    },
    starClass(index: number, rating: number) {
      return {
        'fill-yellow-500': index <= rating,
        'fill-gray-300': index > rating
      };
    }
  }
});
</script>

<style scoped>
.group:hover img {
  transform: scale(1.05);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.button-icon {
  width: 16px;
  height: 16px;
}

.flex.items-center.gap-1.mt-2 {
  gap: 0.25rem; /* Aumenta a precisão visual */
}
</style>
