<template>
	<div id="newsletter" class="py-8 bg-gray-100">
	  <!-- container -->
	  <div class="container mx-auto">
		<!-- row -->
		<div class="flex justify-center">
		  <div class="w-full md:w-8/12 lg:w-6/12 px-4">
			<div class="newsletter bg-white p-8 rounded-lg shadow-md">
			  <p class="text-lg font-bold mb-4">Cadastre-se para receber a <strong>NEWSLETTER</strong></p>
			  <form @submit.prevent="subscribe">
				<input v-model="email" class="input w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500" type="email" placeholder="Digite seu e-mail" required>
				<button type="submit" class="newsletter-btn bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 focus:outline-none"><i class="fa fa-envelope"></i> Inscrever-se</button>
				<p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
			  </form>
			  <ul class="newsletter-follow flex justify-center mt-4">
				<li class="mr-4">
				  <a href="#" class="text-gray-500 hover:text-blue-500"><i class="fa fa-facebook"></i></a>
				</li>
				<li class="mr-4">
				  <a href="#" class="text-gray-500 hover:text-blue-500"><i class="fa fa-twitter"></i></a>
				</li>
				<li class="mr-4">
				  <a href="#" class="text-gray-500 hover:text-blue-500"><i class="fa fa-instagram"></i></a>
				</li>
				<li>
				  <a href="#" class="text-gray-500 hover:text-blue-500"><i class="fa fa-pinterest"></i></a>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
		<!-- /row -->
	  </div>
	  <!-- /container -->
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
	name: 'NewsletterView',
	data() {
	  return {
		email: '',
		errorMessage: ''
	  };
	},
	methods: {
	  async subscribe() {
		// Validação do campo de e-mail
		if (!this.email || !this.isValidEmail(this.email)) {
		  this.errorMessage = 'Por favor, insira um e-mail válido.';
		  return;
		}
  
		try {
		  // Enviar a requisição para o servidor usando Axios
		  await axios.post('URL_DO_SERVIDOR', { email: this.email });
		  // Limpar o campo de e-mail e exibir mensagem de sucesso
		  this.email = '';
		  alert('Inscrição realizada com sucesso para o e-mail: ' + this.email);
		  this.errorMessage = '';
		} catch (error) {
		  // Em caso de erro na requisição, exibir mensagem de erro
		  this.errorMessage = 'Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde.';
		}
	  },
	  isValidEmail(email) {
		// Expressão regular para validar e-mails
		const emailRegex = /\S+@\S+\.\S+/;
		return emailRegex.test(email);
	  }
	}
  };
  </script>
  
  <style scoped>
  /* Estilos para o componente Newsletter */
  </style>
  