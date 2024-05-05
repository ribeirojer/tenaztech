<template>
    <div>
      <h1>Rastreamento de Pedido</h1>
      <p>Insira o número do seu pedido para rastrear o status:</p>
      <input type="text" v-model="orderNumber" placeholder="Número do Pedido">
      <button @click="trackOrder">Rastrear Pedido</button>
      <!-- Exibir informações de rastreamento aqui -->
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    name: 'OrderTrackingView',
    data() {
      return {
        orderNumber: '',
        orderStatus: ''
      };
    },
    methods: {
      trackOrder() {
        axios.get(`/api/orders/${this.orderNumber}/status`)
          .then(response => {
            this.orderStatus = response.data.status;
          })
          .catch(error => {
            console.error('Erro ao rastrear o pedido:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a página de rastreamento de pedido */
  </style>
  