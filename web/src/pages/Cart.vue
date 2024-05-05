<template>
    <div>
      <h1>Carrinho de Compras</h1>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x {{ item.price }}
        </li>
      </ul>
      <button @click="checkout">Finalizar Compra</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'CartView',
    data() {
      return {
        cartItems: [] as { id: number; name: string; quantity: string, price: number }[] // Definindo o tipo de dados para 'posts' do usuário
      };
    },
    methods: {
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
  