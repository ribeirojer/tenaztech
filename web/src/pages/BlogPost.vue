<template>
    <div class="blog-post-view">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <p class="text-gray-600 mb-4">Publicado em {{ formatDate(post.date) }}</p>
      <div v-html="post.content" class="prose"></div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'BlogPostView',
    data() {
      return {
        post: { title: '', date: '', content: '' } as { title: string; date: string; content: string; },
      };
    },
    mounted() {
      this.fetchPost();
    },
    methods: {
      async fetchPost() {
        const route = useRoute();
        const slug = route.params.slug as string;
        try {
          const response = await axios.get(`/api/blog/${slug}`);
          this.post = response.data;
        } catch (error) {
          console.error('Erro ao buscar post do blog:', error);
        }
      },
      formatDate(date: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      }
    }
  });
  </script>
  
  <style scoped>
  .blog-post-view {
    padding: 20px;
  }
  .prose {
    max-width: none;
  }
  </style>
  