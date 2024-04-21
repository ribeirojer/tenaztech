<template>
  <div class="header flex justify-between items-center py-4 px-6">
    <a href="/">
<Logo />    </a>
    <form class="form-header flex items-center space-x-4" @submit.prevent="submitForm">
      <div class="relative">
        <select v-model="selectedCategory" class="rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700">
          <option value="" disabled selected>Categorias</option>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Câmeras">Câmeras</option>
          <option value="Acessórios">Acessórios</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-purple-500">
          <SvgsArrowIcon />
        </div>
      </div>
      <div class="form-input flex items-center border-b border-purple py-1">
        <SvgsMagnifyGlassIcon />
        <input v-model="searchQuery" placeholder="Busca pelo nome" class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none text-purple-500">
      </div>
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4 transition duration-300">Pesquisar</button>
    </form>
    <div class="header-ctn flex items-center space-x-4">
      <button @click="viewWishlist" class="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        <SvgsHearthIcon />
        <p class="text-sm text-white">Lista de Desejos</p>
        <div class="qty text-white">0</div>
      </button>
      <button @click="viewCart" class="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        <SvgsCartIcon />
        <p class="text-sm text-white">Carrinho</p>
        <div class="qty text-white">1</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			selectedCategory: "",
			searchQuery: "",
		};
	},
	methods: {
		submitForm() {
			console.log("Form submitted");
			// Adicione a lógica para enviar o formulário aqui
			// Por exemplo, você pode redirecionar para uma página de resultados com a pesquisa atual
			this.$router.push({
				name: "search-results",
				query: { q: this.searchQuery },
			});
		},
		viewWishlist() {
			console.log("View Wishlist clicked");
			// Adicione a lógica para visualizar a lista de desejos aqui
		},
		viewCart() {
			console.log("View Cart clicked");
			// Adicione a lógica para visualizar o carrinho aqui
		},
	},
};
</script>
