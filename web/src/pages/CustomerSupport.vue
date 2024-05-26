<template>
    <div class="customer-support-view p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Suporte ao Cliente</h1>
      <p>Se precisar de ajuda, entre em contato conosco pelos seguintes meios:</p>
      <ul class="contact-methods mt-4">
        <li><strong>Email:</strong> suporte@empresa.com</li>
        <li><strong>Telefone:</strong> (11) 1234-5678</li>
        <li><strong>Chat ao Vivo:</strong> Clique no botão de chat no canto inferior direito</li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CustomerSupportView',
  });
  </script>
  
  <style scoped>
  .customer-support-view {
    padding: 20px;
  }
  .contact-methods {
    list-style-type: none;
    padding: 0;
  }
  .contact-methods li {
    margin-bottom: 10px;
  }
  </style>
  