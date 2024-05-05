<template>
	<div class="bg-gray-100 rounded-lg border border-purple-500 shadow-lg p-4">
	  <div class="flex flex-col">
		<div>
		  <RouterLink :to="'/produto/' + product.slug">
			<img :src="product.imageUrl" alt="Product image" class="w-full rounded-lg">
		  </RouterLink>
		  <div class="flex justify-between mt-2">
			<span v-if="product.discount" class="bg-red-500 text-white text-xs py-1 px-2 rounded">{{ product.discount }}% OFF</span>
			<span v-if="product.isNew" class="bg-green-500 text-white text-xs py-1 px-2 rounded">NEW</span>
		  </div>
		</div>
		<div>
		  <p class="text-gray-600">{{ product.category }}</p>
		  <h3 class="text-lg font-semibold mt-1">
			<RouterLink :to="'/produto/' + product.slug" class="hover:text-blue-500">{{ product.name }}</RouterLink>
		  </h3>
		  <h4 class="text-gray-800 mt-1">{{ product.price }} <del v-if="product.oldPrice" class="text-gray-500">{{ product.oldPrice }}</del></h4>
		  <div class="flex mt-1">
			<template v-for=" in product.stars">
			  <i class="fa fa-star text-yellow-500"></i>
			</template>
			<template v-for=" in product.emptyStars">
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
  import { defineComponent } from 'vue';
  import RouterLink from 'vue-router';
  
  interface Product {
	imageUrl: string;
	category: string;
	name: string;
	slug: string;
	price: number;
	oldPrice?: number;
	discount?: number;
	isNew?: boolean;
	rating?: number;
	stars?: any[];
	emptyStars?: any[];
  }
  
  export default defineComponent({
	props: {
	  product: {
		type: Object as () => Product,
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
  