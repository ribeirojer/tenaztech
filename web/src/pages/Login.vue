<template>
  <section class="relative overflow-hidden z-10 pt-[180px] pb-[120px]">
    <div class="container">
      <div class="flex flex-wrap mx-[-16px]">
        <div class="w-full px-4">
          <div class="max-w-[500px] shadow mx-auto bg-purple-500 bg-opacity-5 dark:bg-dark rounded-md p-12 sm:p-[60px]">
            <h3 class="font-bold text-black dark:text-white text-2xl sm:text-3xl mb-3 text-center">Faça login na sua conta</h3>
            <form @submit.prevent="login">
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
              <div class="mb-6">
                <button type="submit" class="w-full flex items-center justify-center text-base font-medium text-white bg-purple-500 py-4 px-9 hover:shadow-signUp hover:bg-opacity-80 transition duration-300 ease-in-out rounded-md">
                  Entrar
                </button>
              </div>
            </form>
            <p class="font-medium text-base text-body-color text-center">
              Ainda não tem uma conta?
              <RouterLink to="/registro" class="text-purple-500 hover:underline"> Registre-se </RouterLink>
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

      const data = { email: this.email, password: this.password }
      console.log(data)
      if (this.email && this.password) {
        // Aqui você faria a requisição HTTP para fazer login
        axios.post('http://localhost:3000/api/login', data)
          .then(response => {
            // Lógica para lidar com a resposta do login
            console.log('Usuário autenticado:', response.data);
            // Redirecionar para a página da conta do usuário após o login
            this.$router.push('/conta');
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
</style>
