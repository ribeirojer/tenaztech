<template>
    <div class="col-md-4 col-xs-6">
      <div class="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <div class="flex justify-center">
          <img :src="imageUrl" alt="" class="w-32 h-auto">
        </div>
        <div class="text-center mt-4">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <a href="#" class="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300">
            Shop now <i class="fa fa-arrow-circle-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  