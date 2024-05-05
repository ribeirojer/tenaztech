<template>
	<footer id="footer" class="bg-gray-900 text-white py-8">
	  <!-- top footer -->
	  <div class="container mx-auto">
		<!-- row -->
		<div class="flex flex-wrap -mx-4">
		  <div class="w-full md:w-1/4 px-4">
			<div class="footer">
			  <h3 class="footer-title">Sobre Nós</h3>
			  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
			  <ul class="footer-links">
				<li><router-link to="/sobre"><i class="fa fa-map-marker"></i>1734 Stonecoal Road</router-link></li>
				<li><router-link to="/contato"><i class="fa fa-phone"></i>+021-95-51-84</router-link></li>
				<li><router-link to="/contato"><i class="fa fa-envelope-o"></i>email@email.com</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-full md:w-1/4 px-4">
			<div class="footer">
			  <h3 class="footer-title">Categorias</h3>
			  <ul class="footer-links">
				<li><router-link to="/ofertas">Ofertas</router-link></li>
				<li><router-link to="/laptops">Laptops</router-link></li>
				<li><router-link to="/smartphones">Smartphones</router-link></li>
				<li><router-link to="/cameras">Câmeras</router-link></li>
				<li><router-link to="/acessorios">Acessórios</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-full md:w-1/4 px-4">
			<div class="footer">
			  <h3 class="footer-title">Informações</h3>
			  <ul class="footer-links">
				<li><router-link to="/sobre">Sobre Nós</router-link></li>
				<li><router-link to="/contato">Contate-Nos</router-link></li>
				<li><router-link to="/politica-de-privacidade">Política de Privacidade</router-link></li>
				<li><router-link to="/pedidos-e-devolucoes">Pedidos e Devoluções</router-link></li>
				<li><router-link to="/termos-e-condicoes">Termos e Condições</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-full md:w-1/4 px-4">
			<div class="footer">
			  <h3 class="footer-title">Serviço</h3>
			  <ul class="footer-links">
				<li><router-link to="/minha-conta">Minha Conta</router-link></li>
				<li><router-link to="/carrinho">Ver Carrinho</router-link></li>
				<li><router-link to="/lista-de-desejos">Lista de Desejos</router-link></li>
				<li><router-link to="/rastrear-meu-pedido">Rastrear Meu Pedido</router-link></li>
				<li><router-link to="/ajuda">Ajuda</router-link></li>
			  </ul>
			</div>
		  </div>
		</div>
		<!-- /row -->
	  </div>
	  <!-- /container -->
  
	  <!-- bottom footer -->
	  <div id="bottom-footer" class="section mt-8">
		<div class="container mx-auto">
		  <!-- row -->
		  <div class="flex justify-center">
			<div class="text-center">
			  <ul class="footer-payments">
				<li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
				<li><a href="#"><i class="fa fa-credit-card"></i></a></li>
				<li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
				<li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
				<li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
				<li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
			  </ul>
			  <p class="copyright">
				&copy; Todos os direitos reservados | Este template é feito com <i class="fa fa-heart-o" aria-hidden="true"></i> por <a href="https://colorlib.com" target="_blank">Colorlib</a>
			  </p>
			</div>
		  </div>
		  <!-- /row -->
		</div>
		<!-- /container -->
	  </div>
	  <!-- /bottom footer -->
	</footer>
  </template>
  
  <script lang="ts">
  export default {
	name: 'Footer',
  };
  </script>
  
  <style scoped>
  /* Estilos para o componente de rodapé */
  </style>
  