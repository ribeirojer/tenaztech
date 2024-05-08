<template>
    <div class="col-md-5 order-details">
      <div class="section-title text-center">
        <h3 class="title">Your Order</h3>
      </div>
      <div class="order-summary">
        <div class="order-col">
          <div><strong>PRODUCT</strong></div>
          <div><strong>TOTAL</strong></div>
        </div>
        <div class="order-products">
          <div class="order-col" v-for="(product, index) in products" :key="index">
            <div>{{ product.quantity }}x {{ product.name }}</div>
            <div>{{ formatCurrency(product.price) }}</div>
          </div>
        </div>
        <div class="order-col">
          <div>Shipping</div>
          <div><strong>FREE</strong></div>
        </div>
        <div class="order-col">
          <div><strong>TOTAL</strong></div>
          <div><strong class="order-total">{{ formatCurrency(total) }}</strong></div>
        </div>
      </div>
      <div class="payment-method">
        <div class="input-radio" v-for="(method, index) in paymentMethods" :key="index">
          <input type="radio" :id="'payment-' + (index + 1)" name="payment" :value="method">
          <label :for="'payment-' + (index + 1)">
            <span></span>
            {{ method.name }}
          </label>
          <div class="caption">
            <p>{{ method.description }}</p>
          </div>
        </div>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="terms" v-model="termsAccepted">
        <label for="terms">
          <span></span>
          I've read and accept the <a href="#">terms & conditions</a>
        </label>
      </div>
      <button class="primary-btn order-submit" @click="placeOrderHandler" :disabled="!termsAccepted">Place order</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      products: {
        type: Array,
        required: true
      },
      placeOrder: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        total: 0,
        paymentMethods: [
          { name: 'Direct Bank Transfer', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          { name: 'Cheque Payment', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          { name: 'Paypal System', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
        ],
        termsAccepted: false
      };
    },
    methods: {
      formatCurrency(value) {
        return `$${value.toFixed(2)}`;
      },
      placeOrderHandler() {
        this.placeOrder();
      }
    },
    watch: {
      products: {
        handler(products) {
          this.total = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
        },
        deep: true
      }
    }
  };
  </script>
  