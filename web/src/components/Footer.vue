<template>
	<footer class="bg-gray-900 text-white py-8">
	  <div class="container mx-auto">
		<div class="text-center mb-8">
		  <h1 class="text-3xl font-bold text-gray-100">TenazTech</h1>
		  <p class="text-lg text-gray-400">Seu portal confiável para tecnologia inovadora.</p>
		</div>
		<div class="flex flex-wrap justify-center md:justify-between">
		  <div class="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
			<div class="footer">
			  <h3 class="footer-title text-lg font-semibold mb-4">Sobre Nós</h3>
			  <ul class="footer-links">
				<li><router-link to="/sobre" class="text-sm">Sobre Nós</router-link></li>
				<li><router-link to="/contato" class="text-sm">Contate-Nos</router-link></li>
				<li><router-link to="/politica-de-privacidade" class="text-sm">Política de Privacidade</router-link></li>
				<li><router-link to="/pedidos-e-devolucoes" class="text-sm">Pedidos e Devoluções</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
			<div class="footer">
			  <h3 class="footer-title text-lg font-semibold mb-4">Categorias</h3>
			  <ul class="footer-links">
				<li><router-link to="/produtos?c=ofertas" class="text-sm">Ofertas</router-link></li>
				<li><router-link to="/produtos?c=laptops" class="text-sm">Laptops</router-link></li>
				<li><router-link to="/produtos?c=smartphones" class="text-sm">Smartphones</router-link></li>
				<li><router-link to="/produtos?c=cameras" class="text-sm">Câmeras</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
			<div class="footer">
			  <h3 class="footer-title text-lg font-semibold mb-4">Informações</h3>
			  <ul class="footer-links">
				<li><router-link to="/termos-de-servico" class="text-sm">Termos de Serviço</router-link></li>
				<li><router-link to="/minha-conta" class="text-sm">Minha Conta</router-link></li>
				<li><router-link to="/carrinho" class="text-sm">Ver Carrinho</router-link></li>
				<li><router-link to="/lista-de-desejos" class="text-sm">Lista de Desejos</router-link></li>
			  </ul>
			</div>
		  </div>
  
		  <div class="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
			<div class="footer">
			  <h3 class="footer-title text-lg font-semibold mb-4">Serviço</h3>
			  <ul class="footer-links">
				<li><router-link to="/rastrear-meu-pedido" class="text-sm">Rastrear Meu Pedido</router-link></li>
				<li><router-link to="/ajuda" class="text-sm">Ajuda</router-link></li>
			  </ul>
			</div>
		  </div>
		</div>
		 <div class="flex justify-center mt-8">
			<ul class="social-links flex gap-4">
			  <li><a href="https://www.facebook.com/TenazTech" class="size-8 fill-gray-400 hover:fill-white transition-all mr-4" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="size-8"  width="24" height="24" viewBox="0 0 24 24"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path></svg></a></li>
			  <li><a href="https://twitter.com/TenazTech" class="size-8 fill-gray-400 hover:fill-white transition-all mr-4" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="size-8"  viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a></li>
			  <li><a href="https://www.instagram.com/TenazTech" class="size-8 fill-gray-400 hover:fill-white transition-all mr-4" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="size-8"  width="24" height="24" viewBox="0 0 24 24"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg></a></li>
			  <li><a href="https://www.linkedin.com/company/tenaztech" class="size-8 fill-gray-400 hover:fill-white transition-all mr-4" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="size-8"  width="24" height="24" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path></svg></a></li>
			</ul>
		  </div>
		  
		  <div class="text-center mt-8">
			<p class="text-sm text-gray-400">&copy; 2024 TenazTech. Todos os direitos reservados.</p>
		  </div>
		</div>
	  </footer>
	</template>
	
	<script lang="ts">
	export default {
	  name: 'Footer',
	};
	</script>
	
	<style scoped>
	/* Estilos para o componente de rodapé */
	.footer-title {
	  color: #FFF;
	}
	
	.footer-links {
	  list-style: none;
	  padding-left: 0;
	}
	
	.footer-links li {
	  margin-bottom: 0.5rem;
	}
	
	.footer-links li a {
	  color: #CCC;
	  transition: color 0.3s ease;
	}
	
	.footer-links li a:hover {
	  color: #FFF;
	}
	
	.social-links {
	  list-style: none;
	  padding-left: 0;
	}
	
	.social-links li {
	  display: inline-block;
	}
	
	.social-links li a {
	  color: #CCC;
	  font-size: 20px;
	  transition: color 0.3s ease;
	}
	
	.social-links li a:hover {
	  color: #FFF;
	}
	</style>