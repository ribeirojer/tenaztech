<template>
  <div>
    <h1>Perguntas Frequentes</h1>
    <div v-for="faq in faqs" :key="faq.id">
      <h2>{{ faq.question }}</h2>
      <p>{{ faq.answer }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FAQView',
  data() {
    return {
      faqs: [] // Aqui você carregaria as perguntas frequentes e suas respostas
    };
  },
  created() {
    // Exemplo de como você pode carregar as perguntas frequentes (pode variar dependendo do seu backend)
    this.faqs = [
      { id: 1, question: 'Como faço para fazer uma devolução?', answer: 'Você pode fazer uma devolução...' },
      { id: 2, question: 'Quanto tempo leva para a entrega?', answer: 'O tempo de entrega...' },
      // Adicione mais perguntas frequentes conforme necessário
    ];
  }
};
</script>

<style scoped>
/* Estilos para a página de FAQ */
</style>
