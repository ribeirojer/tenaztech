<template>
  <div class="bg-gray-100 rounded-lg border border-purple-500 shadow-lg p-4">
    <div class="flex flex-col">
      <div class="">
        <RouterLink :to="'/produto/' + slug"><img :src="imageUrl" alt="Product image" class="w-full rounded-lg"></RouterLink>
        <div class="flex justify-between mt-2">
          <span v-if="discount" class="bg-red-500 text-white text-xs py-1 px-2 rounded">{{ discount }}% OFF</span>
          <span v-if="isNew" class="bg-green-500 text-white text-xs py-1 px-2 rounded">NEW</span>
        </div>
      </div>
      <div class="">
        <p class="text-gray-600">{{ category }}</p>
        <h3 class="text-lg font-semibold mt-1"><RouterLink :to="'/produto/' + slug" class="hover:text-blue-500">{{ name }}</RouterLink></h3>
        <h4 class="text-gray-800 mt-1">{{ price }} <del v-if="oldPrice" class="text-gray-500">{{ oldPrice }}</del></h4>
        <div class="flex mt-1">
          <template v-for="star in stars">
            <i class="fa fa-star text-yellow-500"></i>
          </template>
          <template v-for="emptyStar in emptyStars">
            <i class="fa fa-star-o text-gray-400"></i>
          </template>
        </div>
        <div class="flex mt-2">
          <button class="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2"><i class="fa fa-heart-o"></i> <span class="ml-1">Add to wishlist</span></button>
          <button class="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2"><i class="fa fa-exchange"></i> <span class="ml-1">Add to compare</span></button>
          <button class="bg-blue-500 text-white py-1 px-3 rounded-lg"><i class="fa fa-eye"></i> <span class="ml-1">Quick view</span></button>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <button class="bg-blue-500 text-white py-1 px-3 rounded-lg"><i class="fa fa-shopping-cart"></i> <span class="ml-1">Add to cart</span></button>
    </div>
  </div>
</template>

  
  <script lang="ts">
  import RouterLink from "vue-router"

export default {
	props: {
		imageUrl: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		oldPrice: {
			type: Number,
			default: null,
		},
		discount: {
			type: Number,
			default: null,
		},
		isNew: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		stars() {
			return Array(this.rating).fill(0);
		},
		emptyStars() {
			return Array(5 - this.rating).fill(0);
		},
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  