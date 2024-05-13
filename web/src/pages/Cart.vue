<template>
  <div class="container mx-auto px-4 md:px-0">
    <h1 class="text-3xl text-center font-bold my-4">Carrinho de Compras</h1>
    <div class="flex flex-col md:flex-row justify-between">
      <CartItemList :cartItems="cartItems" :removeItem="removeItemFromCart"/>
      <div class="flex flex-col">              
        <CouponForm @applyCoupon="applyCoupon" :couponApplied="couponApplied" />
        <CartSummary :cartTotal="cartTotal" :shippingCost="shippingCost" />
        <button @click="checkout" class="px-4 py-2 rounded my-8 text-white font-bold bg-gradient-to-r from-sky-500 from-10% to-green-500 to-90%">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

import CartItemList from '../components/CartItemList.vue';
import CouponForm from '../components/CouponForm.vue';
import CartSummary from '../components/CartSummary.vue';
import { getCart, removeFromCart } from "../utils/localStorage.ts"

export default {
  name: 'CartView',
  components: {
    CartItemList,
    CouponForm,
    CartSummary
  },
  data() {
    return {
      cartItems: [] as any[],
      couponCode: '',
      couponApplied: false,
      discountDetails: null
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    shippingCost() {
      return 10;
    }
  },
  created() {
    const cartData = getCart();
    cartData.forEach((item) => {
      axios.get(`https://product-catalog-service.deno.dev/api/products/${item.slug}`)
        .then(response => {
          const productDetails = response.data;
          item.name = productDetails.name;
          item.price = productDetails.price;
          this.cartItems.push(item);
        })
        .catch(error => {
          console.error('Erro ao carregar detalhes do produto:', error);
        });
    });
  },
  methods: {
    applyCoupon(couponCode) {
      axios.post('http://seuservidor.com/api/coupon', { couponCode })
        .then(response => {
          this.couponApplied = true;
          this.discountDetails = response.data;
        })
        .catch(error => {
          console.error('Erro ao aplicar o cupom:', error);
        });
    },
    checkout() {
      this.$router.push('/checkout');
    },
    removeItemFromCart(itemId) {
      console.log(itemId)
      // Chama a função para remover o item do carrinho pelo ID
      removeFromCart(itemId);
      // Atualiza a lista de itens do carrinho após a remoção
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    }
  }
};
</script>

<style scoped>
/* Estilos para a página do carrinho */
</style>
