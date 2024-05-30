<template>
  <div class="col-md-4 col-xs-6">
    <div class="relative overflow-hidden border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <div class="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 py-2 bg-gradient-to-b from-transparent to-black text-white">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <router-link :to="'/produtos?c=' + slug" class="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">
          Ver produtos <i class="fas fa-arrow-circle-right ml-2"></i>
        </router-link>
      </div>
      <img :src="imageUrl" alt="" class="w-full h-auto">
      <div class="absolute inset-0 bg-purple-950 opacity-20"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  components: {
    RouterLink,
  },
});
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
