<template>
  <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
    <section class="relative p-8 bg-white rounded-lg shadow-lg dark:bg-dark-2 sm:p-12">
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <input type="text" placeholder="Seu Nome" v-model="name" class="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-purple-500 w-full rounded border py-3 px-[14px] text-base outline-none" ref="nameInput"/>
          <span v-if="nameError" class="text-red-500">{{ nameError }}</span>
        </div>
        <div class="mb-6">
          <input type="email" placeholder="Seu Email" v-model="email" class="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-purple-500 w-full rounded border py-3 px-[14px] text-base outline-none" ref="emailInput"/>
          <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
        </div>
        <div class="mb-6">
          <input type="tel" placeholder="Seu Telefone" v-model="phone" pattern="[0-9]{10,14}" class="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-purple-500 w-full rounded border py-3 px-[14px] text-base outline-none" ref="phoneInput"/>
          <span v-if="phoneError" class="text-red-500">{{ phoneError }}</span>
        </div>
        <div class="mb-6">
          <textarea rows="6" placeholder="Sua Mensagem" v-model="message" class="border-stroke dark:border-dark-3 dark:text-dark-6 dark:bg-dark text-body-color focus:border-purple-500 w-full resize-none rounded border py-3 px-[14px] text-base outline-none" ref="messageInput"></textarea>
          <span v-if="messageError" class="text-red-500">{{ messageError }}</span>
        </div>
        <div>
          <button type="submit" class="w-full p-3 text-white transition border rounded border-purple-500 bg-purple-500 hover:bg-opacity-90">Enviar Mensagem</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      nameError: '',
      emailError: '',
      phoneError: '',
      messageError: ''
    };
  },
  methods: {
    submitForm(this: any) {
      this.nameError = '';
      this.emailError = '';
      this.phoneError = '';
      this.messageError = '';

      let isValid = true;

      if (!this.name) {
        this.nameError = 'Por favor, insira seu nome.';
        isValid = false;
        this.$refs.nameInput.focus();
        return;
      }

      if (!this.email) {
        this.emailError = 'Por favor, insira um endereço de e-mail válido.';
        isValid = false;
        this.$refs.emailInput.focus();
        return;
      }

      if (!this.phone) {
        this.phoneError = 'Por favor, insira seu número de telefone.';
        isValid = false;
        this.$refs.phoneInput.focus();
        return;
      } else if (!this.phone.match('[0-9]{10,14}')) {
        this.phoneError = 'Por favor, insira um número de telefone válido.';
        isValid = false;
        this.$refs.phoneInput.focus();
        return;
      }

      if (!this.message) {
        this.messageError = 'Por favor, insira sua mensagem.';
        isValid = false;
        this.$refs.messageInput.focus();
        return;
      }

      if (isValid) {
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message
        };

        axios.post('https://api.example.com/optins', formData)
          .then(response => {
            console.log('Resposta do servidor:', response.data);
            // Aqui você pode manipular a resposta do servidor conforme necessário
          })
          .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            // Aqui você pode lidar com erros de requisição
          });
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para a seção de formulário de contato */
</style>
