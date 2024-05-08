<template>
    <div class="billing-details">
      <div class="section-title">
        <h3 class="title">{{ title }}</h3>
      </div>
      <!-- Outros campos de endereço de cobrança -->
      <div class="form-group">
        <input class="input" type="text" v-model="billingDetails.address" name="address" placeholder="Address">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="billingDetails.city" name="city" placeholder="City">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="billingDetails.country" name="country" placeholder="Country">
      </div>
      <div class="form-group">
        <input class="input" type="text" v-model="billingDetails.zipCode" name="zip-code" placeholder="ZIP Code" @blur="submitCep">
      </div>
      <div class="form-group">
        <input class="input" type="tel" v-model="billingDetails.tel" name="tel" placeholder="Telephone">
      </div>
      <!-- Checkbox para criar conta -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      billingDetails: Object,
    },
    methods: {
      submitCep() {
        this.$emit('submit-cep', 'billing');
      },
    },
  };
  </script>
  