<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Ajuda e Suporte</h1>
    <p class="text-lg mb-6">Bem-vindo à nossa página de ajuda e suporte! Como podemos ajudar você hoje?</p>
    
    <div class="search-section mb-6">
      <input
        type="text"
        placeholder="Digite sua dúvida..."
        class="w-full p-3 border rounded-lg"
      />
    </div>

    <div class="help-sections grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Seção de Perguntas Frequentes -->
      <div class="help-section">
        <h2 class="text-xl font-semibold mb-2">Perguntas Frequentes</h2>
        <p class="mb-4">Encontre respostas para perguntas comuns dos nossos clientes.</p>
        <router-link to="/faq" class="btn">Ver FAQ</router-link>
      </div>
      <!-- Seção de Contato -->
      <div class="help-section">
        <h2 class="text-xl font-semibold mb-2">Contato</h2>
        <p class="mb-4">Entre em contato conosco se precisar de assistência adicional.</p>
        <router-link to="/contact" class="btn">Entre em Contato</router-link>
      </div>
      <!-- Seção de Política de Devolução -->
      <div class="help-section">
        <h2 class="text-xl font-semibold mb-2">Política de Devolução</h2>
        <p class="mb-4">Saiba mais sobre nossa política de devolução e como devolver um produto.</p>
        <router-link to="/return-policy" class="btn">Ver Política de Devolução</router-link>
      </div>
      <!-- Seção de Chat ao Vivo -->
      <div class="help-section">
        <h2 class="text-xl font-semibold mb-2">Chat ao Vivo</h2>
        <p class="mb-4">Converse com um de nossos atendentes em tempo real para obter ajuda imediata.</p>
        <router-link to="/live-chat" class="btn">Iniciar Chat</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpView',
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.help-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
}

.help-section {
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

.help-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.help-section p {
  font-size: 16px;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

@media (min-width: 768px) {
  .help-section {
    width: 48%;
  }
}

@media (min-width: 1024px) {
  .help-section {
    width: 30%;
  }
}
</style>
