<template>
  <section class="relative overflow-hidden z-10 pt-20 pb-10">
    <div class="container mx-auto px-4">
      <div class="flex justify-center">
        <div class="w-full max-w-md shadow-lg bg-white dark:bg-dark rounded-lg p-8">
          <h3 class="font-bold text-black dark:text-white text-2xl sm:text-3xl mb-6 text-center">
            Crie sua conta
          </h3>
          <p class="font-medium text-base text-gray-700 dark:text-gray-400 mb-8 text-center">
            É totalmente gratuito e super fácil
          </p>
          <form @submit.prevent="register">
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Nome Completo
              </label>
              <input
                v-model="name"
                ref="nameInput"
                type="text"
                name="name"
                placeholder="Digite seu nome completo"
                class="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              />
              <span v-if="formErrors.name" class="text-red-500 text-sm">
                {{ formErrors.name }}
              </span>
            </div>
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
              <label class="flex items-center cursor-pointer select-none text-gray-700 dark:text-white">
                <input type="checkbox" v-model="acceptedTerms" class="form-checkbox h-5 w-5 text-purple-500 transition duration-150 ease-in-out">
                <span class="ml-2 text-sm">
                  Ao criar uma conta, você concorda com os
                  <RouterLink to="/termos-de-servico" class="text-purple-500 hover:underline"> Termos e Condições </RouterLink>
                  e nossa
                  <RouterLink to="/politica-de-privacidade" class="text-purple-500 hover:underline"> Política de Privacidade </RouterLink>
                </span>
              </label>
              <span v-if="formErrors.acceptedTerms" class="text-red-500 text-sm pt-2">
                {{ formErrors.acceptedTerms }}
              </span>
            </div>
            <div class="mb-6">
              <button
                type="submit"
                class="w-full text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300"
              >
                Registrar
              </button>
            </div>
          </form>
          <p class="text-center text-gray-700 dark:text-gray-400">
            Já tem uma conta?
            <RouterLink to="/login" class="text-purple-500 hover:underline">
              Entre
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
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      acceptedTerms: false,
      formErrors: {
        name: '',
        email: '',
        password: '',
        acceptedTerms: '',
      }
    };
  },
  methods: {
    register(this: any) {
      this.formErrors = {
        name: '',
        email: '',
        password: '',
        acceptedTerms: '',
      }

      if (!this.name) {
        this.formErrors.name = 'Por favor, preencha seu nome';
        this.$refs.nameInput.focus();
        return;
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
      if (!this.acceptedTerms) {
        this.formErrors.acceptedTerms = 'Por favor, aceite os termos e a política.';
        return;
      }

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      if (this.name && this.email && this.password && this.acceptedTerms) {
        axios.post('http://localhost:3000/api/register', data)
          .then(response => {
            console.log('Usuário registrado:', response.data);
            this.$router.push('/minha-conta');
          })
          .catch(error => {
            console.error('Erro ao registrar usuário:', error);
          });
      }
    },
  }
};
</script>

<style scoped>
/* Estilos para a página de registro */
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
