<template>
  <div class="order-tracking">
    <h1>Rastreamento de Pedido</h1>
    <p>Insira o número do seu pedido para rastrear o status:</p>
    <input type="text" v-model="orderNumber" placeholder="Número do Pedido">
    <button @click="trackOrder" :disabled="!isValidOrderNumber">Rastrear Pedido</button>
    <div v-if="loading" class="loading-indicator">Rastreando pedido...</div>
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
    <div v-if="orderStatus" class="order-status">
      <p>Status do Pedido: {{ orderStatus }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'OrderTrackingView',
  data() {
    return {
      orderNumber: '',
      orderStatus: '',
      loading: false,
      error: false,
      errorMessage: ''
    };
  },
  computed: {
    isValidOrderNumber(): boolean {
      // Adicione sua lógica de validação aqui
      return this.orderNumber.trim() !== '';
    }
  },
  methods: {
    trackOrder() {
      this.loading = true;
      this.error = false;

      axios.get(`/api/orders/${this.orderNumber}/status`)
        .then(response => {
          this.orderStatus = response.data.status;
          this.orderNumber = ''; // Limpa o campo do número do pedido após o rastreamento bem-sucedido
        })
        .catch(error => {
          console.error('Erro ao rastrear o pedido:', error);
          this.error = true;
          if (error.response) {
            this.errorMessage = `Erro ${error.response.status}: ${error.response.data.message}`;
          } else if (error.request) {
            this.errorMessage = 'Erro de rede. Por favor, verifique sua conexão e tente novamente.';
          } else {
            this.errorMessage = 'Erro inesperado. Por favor, tente novamente mais tarde.';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
.order-tracking {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.loading-indicator {
  margin-top: 10px;
}

.error-message {
  margin-top: 10px;
  color: red;
}

.order-status {
  margin-top: 20px;
}
</style>
