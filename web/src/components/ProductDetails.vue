<template>
    <div class="grid gap-4">
      <h1 class="font-bold text-3xl lg:text-4xl">{{ product.name }}</h1>
      <div>
        <p>{{ product.description }}</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-0.5">
          <StarIcon v-for="n in 5" :key="n" class="w-5 h-5" :class="getStarClass(n)" />
        </div>
        <div class="text-4xl font-bold">${{ product.price }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import StarIcon from './StarIcon.vue';
  
  export default {
    components: {
      StarIcon,
    },
    props: ['product'],
    methods: {
      getStarClass(n: number) {
        return n <= this.product.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground';
      },
    },
  };
  </script>
  