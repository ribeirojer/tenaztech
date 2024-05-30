<template>
    <div class="shiping-details">
      <div class="section-title">
        <h3 class="title">{{ title }}</h3>
      </div>
      <!-- Outros campos de endereço de envio -->
      <div class="form-group">
        <input class="input" type="text" v-model="shippingDetails.address" name="address" placeholder="Address">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="shippingDetails.city" name="city" placeholder="City">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="shippingDetails.country" name="country" placeholder="Country">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="shippingDetails.zipCode" name="zip-code" placeholder="ZIP Code" @blur="submitCep">
      </div>
      <div class="form-group">
        <input class="input" type="tel" v-model="shippingDetails.tel" name="tel" placeholder="Telephone">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      shippingDetails: Object,
    },
    methods: {
      submitCep() {
        this.$emit('submit-cep', 'shipping');
      },
    },
  };
  </script>
  