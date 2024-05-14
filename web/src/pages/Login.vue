<template>
  <section class="relative overflow-hidden z-10 pt-20 pb-10">
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <div class="w-full max-w-md shadow-lg bg-white dark:bg-dark rounded-lg p-8">
          <h3 class="font-bold text-black dark:text-white text-2xl sm:text-3xl mb-6 text-center">
            Faça login na sua conta
          </h3>
          <form @submit.prevent="login">
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                E-mail
              </label>
              <input
                v-model="email"
                ref="emailInput"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
              <span v-if="formErrors.email" class="text-red-500 text-sm">
                {{ formErrors.email }}
              </span>
            </div>
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Sua Senha
              </label>
              <input
                v-model="password"
                ref="passwordInput"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
              <span v-if="formErrors.password" class="text-red-500 text-sm">
                {{ formErrors.password }}
              </span>
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300"
              >
                Entrar
              </button>
            </div>
          </form>
          <p class="text-center text-gray-700 dark:text-gray-400">
            Ainda não tem uma conta?
            <RouterLink to="/registro" class="text-purple-500 hover:underline">
              Registre-se
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    login(this: any) {
      this.formErrors = {
        email: '',
        password: '',
      }

      if (!this.email) {
        this.formErrors.email = 'Por favor, preencha seu e-mail';
        this.$refs.emailInput.focus();
        return;
      }
      if (!this.password) {
        this.formErrors.password = 'Por favor, preencha sua senha';
        this.$refs.passwordInput.focus();
        return;
      }

      const data = { email: this.email, password: this.password };
      console.log(data);
      if (this.email && this.password) {
        // Aqui você faria a requisição HTTP para fazer login
        axios.post('http://localhost:3000/api/login', data)
          .then(response => {
            // Lógica para lidar com a resposta do login
            console.log('Usuário autenticado:', response.data);
            // Redirecionar para a página da conta do usuário após o login
            this.$router.push('/minha-conta');
          })
          .catch(error => {
            console.error('Erro ao fazer login:', error);
            // Exibir mensagem de erro ao usuário, se necessário
          });
      }
    },
  }
};
</script>

<style scoped>
/* Estilos para a página de login */
section {
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.container {
  max-width: 640px;
  margin: 0 auto;
}
</style>
