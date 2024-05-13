<template>
  <section class="relative overflow-hidden z-10 pt-[180px] pb-[120px]">
    <div class="container">
      <div class="flex flex-wrap mx-[-16px]">
        <div class="w-full px-4">
          <div class="max-w-[500px] shadow mx-auto bg-purple-500 bg-opacity-5 dark:bg-dark rounded-md p-12 sm:p-[60px]">
            <h3 class="font-bold text-black dark:text-white text-2xl sm:text-3xl mb-3 text-center">Crie sua conta</h3>
            <p class="font-medium text-base text-body-color mb-11 text-center">É totalmente gratuito e super fácil</p>
            <form @submit.prevent="register">
              <div class="mb-8">
                <label for="name" class="block text-sm font-medium text-dark dark:text-white mb-3">Nome Completo</label>
                <input v-model="name" ref="nameInput" type="text" name="name" placeholder="Digite seu nome completo" class="w-full border border-transparent dark:bg-[#242B51] rounded-md shadow-one dark:shadow-signUp py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-purple-500">
                <span v-if="formErrors.name" class="text-red-500 text-sm">Por favor, preencha seu nome</span>
              </div>
              <div class="mb-8">
                <label for="email" class="block text-sm font-medium text-dark dark:text-white mb-3">E-mail</label>
                <input v-model="email" ref="emailInput" type="email" name="email" placeholder="Digite seu e-mail" class="w-full border border-transparent dark:bg-[#242B51] rounded-md shadow-one dark:shadow-signUp py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-purple-500">
                <span v-if="formErrors.email" class="text-red-500 text-sm">Por favor, preencha seu e-mail</span>
              </div>
              <div class="mb-8">
                <label for="password" class="block text-sm font-medium text-dark dark:text-white mb-3">Sua Senha</label>
                <input v-model="password" ref="passwordInput" type="password" name="password" placeholder="Digite sua senha" class="w-full border border-transparent dark:bg-[#242B51] rounded-md shadow-one dark:shadow-signUp py-3 px-6 text-body-color text-base placeholder-body-color outline-none focus-visible:shadow-none focus:border-purple-500">
                <span v-if="formErrors.password" class="text-red-500 text-sm">Por favor, preencha sua senha</span>
              </div>
              <div class="flex flex-col mb-8">

  <label class="flex items-center cursor-pointer select-none text-dark dark:text-white">
    <div class="relative">
      <input type="checkbox" v-model="acceptedTerms" class="sr-only" @input="toggle" />
      <div
        class="box mr-4 flex h-5 w-5 items-center justify-center rounded border-stroke dark:border-dark-3 border"
      >
        <span :class="{ '!bg-purple-500': acceptedTerms }" class="dot h-[10px] w-[10px] rounded-sm"></span>
      </div>
    </div>
    <span class="text-sm">
      Ao criar uma conta, você concorda com os
      <RouterLink to="/termos-de-servico" class="text-purple-500 hover:underline"> Termos e Condições </RouterLink>
      e nossa
      <RouterLink to="/politica-de-privacidade" class="text-purple-500 hover:underline"> Política de Privacidade </RouterLink>
    </span>  </label>
                <span v-if="formErrors.acceptedTerms" class="text-red-500 text-sm pt-2">{{formErrors.acceptedTerms}}</span>
              </div>
              <div class="mb-6">
                <button type="submit" class="w-full flex items-center justify-center text-base font-medium text-white bg-purple-500 py-4 px-9 hover:shadow-signUp hover:bg-opacity-80 transition duration-300 ease-in-out rounded-md">
                  Registrar
                </button>
              </div>
            </form>
            <p class="font-medium text-base text-body-color text-center">
              Já tem uma conta?
              <RouterLink to="/login" class="text-purple-500 hover:underline"> Entre </RouterLink>
            </p>
          </div>
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
        email: '',
        name: "",
        password: "",
        acceptedTerms: "",
      }

      if(!this.name){
        this.formErrors.name = 'Por favor, preencha seu nome'
        this.$refs.nameInput.focus();
        return;
      }
      if(!this.email){
        this.formErrors.email = 'Por favor, preencha seu e-mail'
        this.$refs.emailInput.focus();
        return;
      }
      if(!this.password){
        this.formErrors.password = 'Por favor, preencha sua senha'
        this.$refs.passwordInput.focus();
        return;
      }
      if(!this.acceptedTerms){
        this.formErrors.acceptedTerms = 'Por favor, aceite os termos e a politica.';
        return;
      }

      if (this.name && this.email && this.password && this.acceptedTerms) {
        // Aqui você faria a requisição HTTP para registrar o usuário
        axios.post('http://localhost:3000/api/register', data)
          .then(response => {
            // Lógica para lidar com a resposta do registro
            console.log('Usuário registrado:', response.data);
            // Redirecionar para a página da conta do usuário após o registro
            this.$router.push('/conta');
          })
          .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            // Exibir mensagem de erro ao usuário, se necessário
          });
      }
    },
      toggle() {
        this.acceptedTerms = !this.acceptedTerms;
      }
  }
};
</script>

<style scoped>
/* Estilos para a página de registro */
</style>
