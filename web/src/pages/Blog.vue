<template>
  <div>
    <h1>Blog</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BlogView',
  data() {
    return {
      posts: [] as { id: number; title: string; content: string }[] // Definindo o tipo de dados para 'posts'
    };
  },
  created() {
    // Exemplo de como você pode carregar as postagens do blog (pode variar dependendo do seu backend)
    this.posts = [
      { id: 1, title: 'Postagem 1', content: 'Conteúdo da postagem 1' },
      { id: 2, title: 'Postagem 2', content: 'Conteúdo da postagem 2' },
      // Adicione mais postagens conforme necessário
    ];
  }
});
</script>

<style scoped>
/* Estilos para a página do blog */
</style>
