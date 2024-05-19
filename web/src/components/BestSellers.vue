<template>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Best Sellers</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="product in bestSellers" :key="product.id" class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
          <div class="aspect-[4/3] overflow-hidden">
            <img :src="product.image" alt="Product Image" class="h-full w-full object-cover transition-all group-hover:scale-105" />
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <StarIcon class="h-4 w-4 fill-primary" v-for="n in Math.floor(product.rating)" :key="n" />
                <StarIcon class="h-4 w-4 fill-muted stroke-muted-foreground" v-for="n in 5 - Math.floor(product.rating)" :key="n + Math.floor(product.rating)" />
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ product.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-2xl font-bold">${{ product.price }}</span>
              <button size="sm">
                <ShoppingCartIcon class="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ShoppingCartIcon from './ShoppingCartIcon.vue';
  import StarIcon from './StarIcon.vue';
  
  export default {
    components: {
      ShoppingCartIcon,
      StarIcon,
    },
    props: {
      bestSellers: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  