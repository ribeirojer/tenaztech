<template>
	<section class="flex justify-center space-x-4 bg-gray-900 px-4 py-2">
	  <li class="">
		<NuxtLink to="/" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Início</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/produtos?c=hotdeals" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Promoções</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/produtos?c=Laptops" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Laptops</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/produtos?c=Smartphones" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Smartphones</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/produtos?c=Câmeras" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Câmeras</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/produtos?c=Acessórios" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Acessórios</NuxtLink>
	  </li>
	  <li class="">
		<NuxtLink to="/compare" class="text-white hover:text-purple-300 transition duration-300 ease-in-out">Ver Comparação</NuxtLink>
	  </li>
	</section>
  </template>
  
  <style scoped>
	li {
	  list-style-type: none; /* Remover o ponto na frente das listas */
	}
  </style>
  