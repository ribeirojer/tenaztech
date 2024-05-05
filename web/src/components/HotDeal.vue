<template>
	<div id="hot-deal" class="py-8 bg-gray-100">
	  <!-- container -->
	  <div class="container mx-auto">
		<!-- row -->
		<div class="flex flex-wrap justify-center">
		  <div class="w-full md:w-8/12 lg:w-6/12 px-4">
			<div class="hot-deal">
			  <ul class="hot-deal-countdown flex justify-center mb-8">
				<li class="text-center">
				  <div>
					<h3 class="text-3xl font-bold">{{ days }}</h3>
					<span class="text-gray-600">Dias</span>
				  </div>
				</li>
				<li class="text-center">
				  <div>
					<h3 class="text-3xl font-bold">{{ hours }}</h3>
					<span class="text-gray-600">Horas</span>
				  </div>
				</li>
				<li class="text-center">
				  <div>
					<h3 class="text-3xl font-bold">{{ minutes }}</h3>
					<span class="text-gray-600">Minutos</span>
				  </div>
				</li>
				<li class="text-center">
				  <div>
					<h3 class="text-3xl font-bold">{{ seconds }}</h3>
					<span class="text-gray-600">Segundos</span>
				  </div>
				</li>
			  </ul>
			  <h2 class="text-center text-2xl lg:text-3xl font-bold mb-4">Oferta especial desta semana</h2>
			  <p class="text-center text-lg text-gray-700 mb-8">Nova coleção com até 50% de desconto</p>
			  <a href="#" class="block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg text-lg font-bold">Compre agora</a>
			</div>
		  </div>
		</div>
		<!-- /row -->
	  </div>
	  <!-- /container -->
	</div>
  </template>
  
  <script lang="ts">
  export default {
	name: 'HotDealView',
	data() {
	  return {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	  };
	},
	mounted() {
	  // Definindo a data de término da oferta
	  const endTime = new Date('2024-05-10T00:00:00').getTime();
  
	  // Atualizando a contagem regressiva a cada segundo
	  setInterval(() => {
		// Obtendo a data e hora atual
		const now = new Date().getTime();
  
		// Calculando a diferença entre a data de término e a data atual
		const timeLeft = endTime - now;
  
		// Calculando dias, horas, minutos e segundos restantes
		this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		this.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		this.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	  }, 1000);
	}
  };
  </script>
  
  <style scoped>
  /* Estilos para a oferta especial */
  .hot-deal {
	max-width: 600px;
	margin: 0 auto;
  }
  .hot-deal-countdown li:not(:last-child) {
	margin-right: 2rem;
  }
  .hot-deal-countdown h3 {
	color: #333;
  }
  .hot-deal-countdown span {
	color: #666;
  }
  </style>
  