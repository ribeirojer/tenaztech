<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Confirmação de Pedido</h1>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <p class="text-lg mb-4">Obrigado por fazer seu pedido conosco!</p>
      <p class="text-gray-600 mb-4">Aqui estão os detalhes do seu pedido:</p>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Número do Pedido:</p>
        <p class="text-gray-600">{{ orderNumber }}</p>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Data do Pedido:</p>
        <p class="text-gray-600">{{ orderDate }}</p>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Produtos:</p>
        <ul>
          <li v-for="(product, index) in products" :key="index" class="text-gray-600">{{ product.name }} - R$ {{ product.price }}</li>
        </ul>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Endereço de Entrega:</p>
        <p class="text-gray-600">{{ deliveryAddress }}</p>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Método de Pagamento:</p>
        <p class="text-gray-600">{{ paymentMethod }}</p>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Link para Pagamento:</p>
        <p class="text-blue-500 underline">{{ paymentLink }}</p>
      </div>
      <div class="border-b border-gray-300 pb-4 mb-4">
        <p class="text-lg font-semibold">Data Estimada de Entrega:</p>
        <p class="text-gray-600">{{ deliveryDate }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderConfirmationView',
  data() {
    return {
      orderNumber: '',
      orderDate: '',
      products: [] as any,
      deliveryAddress: '',
      paymentMethod: '',
      paymentLink: '', // O link será obtido da query da URL
      deliveryDate: '',
    };
  },
  mounted() {
    this.getPaymentLinkFromQuery();
    this.fetchOrderDetails();
  },
  methods: {
    getPaymentLinkFromQuery() {
      const urlParams = new URLSearchParams(this.$route.fullPath);
      this.orderNumber = urlParams.get('link') || 'Link de pagamento não encontrado';
    },
    async fetchOrderDetails() {
      const orderId = this.orderNumber
      try {
        const response = await axios.get(`https://api.example.com/orders/${orderId}`);
        const orderData = response.data;

        this.orderNumber = orderData.id;
        this.orderDate = new Date(orderData.date).toLocaleDateString();
        this.products = orderData.products;
        this.deliveryAddress = orderData.deliveryAddress;
        this.paymentMethod = orderData.paymentMethod;
        this.deliveryDate = new Date(orderData.deliveryDate).toLocaleDateString();
      } catch (error) {
        console.error('Erro ao buscar os detalhes do pedido:', error);
      }
    },
  },
});
</script>
