<template>
  <div>
    <BillingDetails :title="'Billing Address'" :billingDetails="billingDetails" @update-billing-details="updateBillingDetails" @submit-cep="handleCepSubmission('billing')" />
    <ShippingDetails :title="'Shipping Address'" :shippingDetails="shippingDetails" @update-shipping-details="updateShippingDetails" @submit-cep="handleCepSubmission('shipping')" />
    <OrderDetails :products="products" :placeOrder="placeOrder" />
  </div>
</template>

<script>
import BillingDetails from '../components/BillingDetails.vue';
import ShippingDetails from '../components/ShippingDetails.vue';
import OrderDetails from '../components/OrderDetails.vue';
import axios from 'axios';

export default {
  components: {
    BillingDetails,
    ShippingDetails,
    OrderDetails
  },
  data() {
    return {
      billingDetails: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        tel: '',
        createAccount: false,
        password: '',
      },
      shippingDetails: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        tel: '',
      },
      products: [
        { name: 'Product Name Goes Here', quantity: 1, price: 980.00 },
        { name: 'Product Name Goes Here', quantity: 2, price: 980.00 }
        // Adicione mais produtos conforme necessário
      ]
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    updateBillingDetails(updatedDetails) {
      this.billingDetails = { ...this.billingDetails, ...updatedDetails };
    },
    updateShippingDetails(updatedDetails) {
      this.shippingDetails = { ...this.shippingDetails, ...updatedDetails };
    },
    async handleCepSubmission(addressType) {
      const cep = addressType === 'billing' ? this.billingDetails.zipCode : this.shippingDetails.zipCode;
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const addressDetails = response.data;
        if (addressType === 'billing') {
          this.billingDetails = {
            ...this.billingDetails,
            address: addressDetails.logradouro,
            city: addressDetails.localidade,
            country: 'Brasil', // Supondo que todos os endereços sejam no Brasil
          };
        } else {
          this.shippingDetails = {
            ...this.shippingDetails,
            address: addressDetails.logradouro,
            city: addressDetails.localidade,
            country: 'Brasil', // Supondo que todos os endereços sejam no Brasil
          };
        }
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    },
    async fetchUserDetails() {
      try {
        const response = await axios.get('/api/user/details');
        const userData = response.data;
        // Atualizar os detalhes de cobrança e envio com os detalhes do usuário
        this.billingDetails = { ...this.billingDetails, ...userData };
        this.shippingDetails = { ...this.shippingDetails, ...userData };
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    placeOrder() {
      // Simulação de uma requisição HTTP para enviar o pedido
      setTimeout(() => {
        console.log('Pedido enviado!');
        // Redirecionamento ou ação após o pedido ser enviado
      }, 1000);
    },
  },
};
</script>
