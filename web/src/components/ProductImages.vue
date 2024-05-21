<template>
    <div class="grid gap-4">
      <div class="grid md:grid-cols-5 gap-3 items-start">
        <div class="hidden md:flex flex-col gap-3 items-start">
          <button
            v-for="(image, index) in images"
            :key="index"
            class="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
          >
            <img :alt="'Preview thumbnail ' + (index + 1)" :src="image" class="aspect-[5/6] object-cover" height="120" width="100" />
            <span class="sr-only">View Image {{ index + 1 }}</span>
          </button>
        </div>
        <div class="md:col-span-4">
          <img :alt="'Product Image'" :src="images[0]" class="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800" height="900" width="600" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['images'],
  };
  </script>
  