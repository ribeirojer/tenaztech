<template>
  <div>
    <h1>Detalhes do Produto</h1>
    <h1>Slug: {{$route.params.slug}} do produto</h1>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'ProductDetailsView',
  data() {
    return {
      product: {} // Aqui você carregaria os detalhes do produto com base no ID da rota
    };
  },
  created() {
    // Exemplo de como você pode carregar os detalhes do produto (pode variar dependendo do seu backend)
    const productSlug = this.$route.params.slug;
    // Substitua a próxima linha pela lógica real para buscar os detalhes do produto do seu backend
    axios.get(`http://seuservidor.com/api/produtos/${productSlug}`)
      .then(response => {
        // Assumindo que o servidor retorna os detalhes do produto no formato de objeto JSON
        this.product = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar os detalhes do produto:', error);
      });
  }
};
</script>

<style scoped>
/* Estilos para a página de detalhes do produto */
</style>
