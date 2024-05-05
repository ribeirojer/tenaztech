<template>
  <div>
    <h1>Promoções e Vendas</h1>
    <div v-for="promotion in promotions" :key="promotion.id">
      <h2>{{ promotion.title }}</h2>
      <p>{{ promotion.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PromotionsView',
  data() {
    return {
      promotions: [] as any // Aqui você carregaria as promoções do seu ecommerce
    };
  },
  created() {
    // Exemplo de como você pode carregar as promoções (pode variar dependendo do seu backend)
    this.promotions = [
      { id: 1, title: 'Promoção de Verão', description: 'Descontos imperdíveis em nossa coleção de verão!' },
      { id: 2, title: 'Oferta da Semana', description: 'Produtos em oferta por tempo limitado!' },
      // Adicione mais promoções conforme necessário
    ];
  }
};
</script>

<style scoped>
/* Estilos para a página de promoções/vendas */
</style>
