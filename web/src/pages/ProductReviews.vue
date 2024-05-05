<template>
  <div>
    <h1>Avaliações de Produtos</h1>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <p>{{ review.text }}</p>
        <p>Por: {{ review.author }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'ProductReviewsView',
  data() {
    return {
      reviews: [] as any
    };
  },
  created() {
    axios.get('/api/product-reviews')
      .then(response => {
        this.reviews = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar avaliações de produtos:', error);
      });
  }
};
</script>

<style scoped>
/* Estilos para a página de avaliações de produtos */
</style>
