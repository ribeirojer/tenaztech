<template>
	<head>
    
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		 <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

		<title>Electro - HTML Ecommerce Template</title>

		<!-- Google font -->
		<link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700" rel="stylesheet">

    </head>
	<Header 
	:isMenuOpen="isMenuOpen" 
	:cartItems="cartItems" 
	:wishlist="wishlist" 
	:user="user" 
	@toggle-menu="toggleMenu" 
	@toggle-search="toggleSearch"
  />
  <Navigation />
  <ShopsSection />
  <SecondSection />
  <ThirdSection />
  <FourthSection />
</template>
  
  <script>
export default {
	data() {
		return {
			isMenuOpen: false,
			cartItems: [
				/* Aqui você pode passar os itens do carrinho */
			],
			wishlist: [
				/* Aqui você pode passar os itens da lista de desejos */
			],
			user: {
				/* Aqui você pode passar os dados do usuário */
			},
		};
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
		toggleSearch() {
			// Lógica para abrir/fechar a barra de pesquisa
		},
	},
};
</script>
  