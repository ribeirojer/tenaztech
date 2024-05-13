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
export default {
  name: 'OrderConfirmationView',
  data() {
    return {
      orderNumber: '123456',
      orderDate: '10/05/2024',
      products: [
        { name: 'Produto 1', price: '50,00' },
        { name: 'Produto 2', price: '30,00' },
        { name: 'Produto 3', price: '20,00' },
      ],
      deliveryAddress: 'Rua Agrolândia, 325, Joinville - SC',
      paymentMethod: 'Cartão de Crédito',
      paymentLink: '', // O link será obtido da query da URL
      deliveryDate: '15/05/2024',
    };
  },
  mounted() {
    this.getPaymentLinkFromQuery();
  },
  methods: {
    getPaymentLinkFromQuery() {
      const urlParams = new URLSearchParams(this.$route.query);
      this.paymentLink = urlParams.get('link') || 'Link de pagamento não encontrado';
    },
  },
};
</script>
