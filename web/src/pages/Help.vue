<template>
  <div>
    <h1>Ajuda e Suporte</h1>
    <p>Bem-vindo à nossa página de ajuda e suporte!</p>
    <div class="help-sections">
      <!-- Seção de Perguntas Frequentes -->
      <div class="help-section">
        <h2>Perguntas Frequentes</h2>
        <p>Encontre respostas para perguntas comuns dos nossos clientes.</p>
        <router-link to="/faq" class="btn">Ver FAQ</router-link>
      </div>
      <!-- Seção de Contato -->
      <div class="help-section">
        <h2>Contato</h2>
        <p>Entre em contato conosco se precisar de assistência adicional.</p>
        <router-link to="/contact" class="btn">Entre em Contato</router-link>
      </div>
      <!-- Seção de Política de Devolução -->
      <div class="help-section">
        <h2>Política de Devolução</h2>
        <p>Saiba mais sobre nossa política de devolução e como devolver um produto.</p>
        <router-link to="/return-policy" class="btn">Ver Política de Devolução</router-link>
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
/* Estilos para a página de ajuda/suporte */
.help-sections {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.help-section {
  width: 30%;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
</style>
