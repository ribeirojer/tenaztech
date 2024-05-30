<template>
  <div class="grid gap-4">
    <div class="grid md:grid-cols-5 gap-3 items-start">
      <div class="hidden md:flex flex-col gap-3 items-start">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="setSelectedImage(index)"
          class="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
        >
          <img
            :alt="'Preview thumbnail ' + (index + 1)"
            :src="image"
            class="aspect-[5/6] object-cover"
            height="120"
            width="100"
          />
          <span class="sr-only">View Image {{ index + 1 }}</span>
        </button>
      </div>
      <div class="md:col-span-4">
        <div class="overflow-hidden">
          <img
            :alt="'Product Image'"
            :src="images[selectedImage]"
            class="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800 transition-transform duration-300 ease-in-out transform hover:scale-105"
            height="900"
            width="600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    images: {
      type: Array,
      required: true,
    } as any,
  },
  data() {
    return {
      selectedImage: 0,
    };
  },
  methods: {
    setSelectedImage(index: number) {
      this.selectedImage = index;
    },
  },
};
</script>

<style scoped>
/* Adiciona o efeito de zoom */
img:hover {
  transform: scale(1.05);
}
</style>
