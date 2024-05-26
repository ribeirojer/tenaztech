<template>
    <div class="return-policy-view p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Política de Devolução</h1>
      <div v-html="content" class="prose"></div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ReturnPolicyView',
    data() {
      return {
        content: '',
      };
    },
    mounted() {
      this.fetchReturnPolicy();
    },
    methods: {
      async fetchReturnPolicy() {
        try {
          const response = await axios.get('/api/return-policy');
          this.content = response.data.content;
        } catch (error) {
          console.error('Erro ao buscar política de devolução:', error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .return-policy-view {
    padding: 20px;
  }
  .prose {
    max-width: none;
  }
  </style>
  