<template>
  <div class="order-tracking container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Rastreamento de Pedido</h1>
    <p class="text-lg mb-6">Insira o número do seu pedido para rastrear o status:</p>
    <div class="flex items-center mb-4">
      <input 
        type="text" 
        v-model="orderNumber" 
        placeholder="Número do Pedido" 
        class="p-2 border rounded-l-lg flex-grow"
      />
      <button 
        @click="trackOrder" 
        :disabled="!isValidOrderNumber || loading" 
        class="p-2 bg-blue-500 text-white rounded-r-lg"
      >
        Rastrear Pedido
      </button>
    </div>
    <div v-if="loading" class="loading-indicator text-blue-500">
      <span class="loader"></span> Rastreando pedido...
    </div>
    <div v-if="error" class="error-message text-red-500">
      {{ errorMessage }}
    </div>
    <transition name="fade">
      <div v-if="orderStatus" class="order-status mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
        <p class="text-lg font-semibold">Status do Pedido: {{ orderStatus }}</p>
      </div>
    </transition>
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
      return this.orderNumber.trim() !== '';
    }
  },
  methods: {
    async trackOrder() {
      this.loading = true;
      this.error = false;

      try {
        const response = await axios.get(`/api/orders/${this.orderNumber}/status`);
        this.orderStatus = response.data.status;
        this.orderNumber = ''; // Limpa o campo do número do pedido após o rastreamento bem-sucedido
      } catch (error: any) {
        console.error('Erro ao rastrear o pedido:', error);
        this.error = true;
        if (error.response) {
          this.errorMessage = `Erro ${error.response.status}: ${error.response.data.message}`;
        } else if (error.request) {
          this.errorMessage = 'Erro de rede. Por favor, verifique sua conexão e tente novamente.';
        } else {
          this.errorMessage = 'Erro inesperado. Por favor, tente novamente mais tarde.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 10px;
}

.order-status {
  margin-top: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
