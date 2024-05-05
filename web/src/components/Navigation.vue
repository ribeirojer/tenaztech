<template>
	<section class="flex justify-center space-x-4 bg-gray-900 px-4 py-2">
	  <li class="">
		<RouterLink to="/" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Início</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/produtos?c=hotdeals" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Promoções</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/produtos?c=Laptops" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Laptops</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/produtos?c=Smartphones" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Smartphones</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/produtos?c=Câmeras" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Câmeras</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/produtos?c=Acessórios" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Acessórios</RouterLink>
	  </li>
	  <li class="">
		<RouterLink to="/compare" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Ver Comparação</RouterLink>
	  </li>
	</section>
  </template>
  <script lang="ts">

import RouterLink from "vue-router"
export default {
    name: 'Navigation',
  };

</script>
  
  <style scoped>
	li {
	  list-style-type: none; /* Remover o ponto na frente das listas */
	}
  </style>
  