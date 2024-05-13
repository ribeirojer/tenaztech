<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-4">Minha Conta</h1>

    <!-- Informações da conta do usuário -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Informações da Conta</h2>
      <div class="bg-white p-4 rounded shadow-md">
        <div v-if="userData">
          <div class="mb-2">
            <strong>Nome:</strong> {{ userData.name }}
          </div>
          <div class="mb-2">
            <strong>E-mail:</strong> {{ userData.email }}
          </div>
          <!-- Adicione mais informações da conta conforme necessário -->
        </div>
        <div v-else>
          <p>Carregando informações da conta...</p>
        </div>
      </div>
    </section>

    <!-- Histórico de pedidos -->
    <section>
      <h2 class="text-xl font-semibold mb-2">Histórico de Pedidos</h2>
      <div class="bg-white p-4 rounded shadow-md">
        <div v-if="orderHistory">
          <div v-for="order in orderHistory" :key="order.id" class="flex items-center justify-between mb-4">
            <div>
              <strong>Número do Pedido:</strong> {{ order.orderNumber }}
            </div>
            <div>
              <strong>Status:</strong> {{ order.status }}
            </div>
            <div>
              <strong>Total:</strong> R$ {{ order.total }}
            </div>
          </div>
        </div>
        <div v-else>
          <p>Carregando histórico de pedidos...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'AccountView',
  data() {
    return {
      userData: null as any,
      orderHistory: null as any,
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchOrderHistory();
  },
  methods: {
    fetchUserData() {
      axios.get('https://api.example.com/user')
        .then(response => {
          this.userData = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar informações da conta:', error);
        });
    },
    fetchOrderHistory() {
      axios.get('https://api.example.com/orders')
        .then(response => {
          this.orderHistory = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar histórico de pedidos:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Estilos para a página da conta do usuário */
</style>
