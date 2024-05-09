<template>
    <div class="container mx-auto">
      <h1 class="text-3xl text-center font-bold my-4">Carrinho de Compras</h1>
      <div class="flex justify-between">
          <CartItemList :cartItems="cartItems" />
          <div>              
              <CouponForm @applyCoupon="applyCoupon" :couponApplied="couponApplied" />
              <CartSummary :cartTotal="cartTotal" :shippingCost="shippingCost" :discountDetails="discountDetails" />
              <button @click="checkout">Finalizar Compra</button>
            </div>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  import CartItemList from '../components/CartItemList.vue';
  import CouponForm from '../components/CouponForm.vue';
  import CartSummary from '../components/CartSummary.vue';
  import { getCart } from "../utils/localStorage.ts"

  export default {
    name: 'CartView',
    components: {
      CartItemList,
      CouponForm,
      CartSummary
    },
    data() {
      return {
        cartItems: [],
        couponCode: '',
        couponApplied: false,
        discountDetails: null
      };
    },
    computed: {
      cartTotal() {
        // Calcular o total do carrinho
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      shippingCost() {
        // Definir o custo de envio (pode ser obtido do servidor ou calculado com base em algumas regras)
        return 10;
      }
    },
    created() {
      // Recuperar dados do carrinho do localStorage
      const cartData = getCart()
      // Para cada item no carrinho, fazer uma solicitação HTTP para obter os detalhes do produto
      cartData.forEach((item: { slug: any; name: any; price: any; }) => {
        axios.get(`https://product-catalog-service.deno.dev/api/products/${item.slug}`)
          .then(response => {
            // Adicionar detalhes do produto ao item do carrinho
            const productDetails = response.data;
            item.name = productDetails.name;
            item.price = productDetails.price;
            // Atualizar a lista de itens do carrinho com os detalhes do produto
            this.cartItems.push(item);
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do produto:', error);
          });
      });
    },
    methods: {
      applyCoupon(couponCode: any) {
        // Fazer solicitação HTTP para aplicar o cupom
        axios.post('http://seuservidor.com/api/coupon', { couponCode })
          .then(response => {
            // Atualizar o estado para indicar que o cupom foi aplicado
            this.couponApplied = true;
            // Salvar os detalhes do desconto
            this.discountDetails = response.data;
          })
          .catch(error => {
            console.error('Erro ao aplicar o cupom:', error);
          });
      },
      checkout() {
        // Redirecionar para a página de checkout
        this.$router.push('/checkout');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a página do carrinho */
  </style>
  