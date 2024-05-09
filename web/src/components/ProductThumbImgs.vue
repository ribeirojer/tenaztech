<template>
    <div class="w-1/4">
      <div id="product-imgs">
        <div v-for="(image, index) in images" :key="index" class="product-preview">
          <img :src="getImagePath(image)" :alt="getAltText(index)">
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      images: {
        type: Array as any,
        required: true
      },
      altTexts: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getImagePath(imageName: string): string {
        return `./img/${imageName}`;
      },
      getAltText(index: number): any {
        if (this.altTexts && this.altTexts[index]) {
          return this.altTexts[index];
        }
        return `Product ${index + 1}`;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  