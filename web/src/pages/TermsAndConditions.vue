<template>
    <div class="terms-and-conditions-view p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Termos e Condições</h1>
      <div v-html="content" class="prose"></div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'TermsAndConditionsView',
    data() {
      return {
        content: '',
      };
    },
    mounted() {
      this.fetchTermsAndConditions();
    },
    methods: {
      async fetchTermsAndConditions() {
        try {
          const response = await axios.get('/api/terms-and-conditions');
          this.content = response.data.content;
        } catch (error) {
          console.error('Erro ao buscar termos e condições:', error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .terms-and-conditions-view {
    padding: 20px;
  }
  .prose {
    max-width: none;
  }
  </style>
  