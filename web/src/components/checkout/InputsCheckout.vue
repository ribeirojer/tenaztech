<template>
    <div class="">
      <h2 class="text-2xl font-bold text-center mb-4">{{ title }}</h2>
      <div class="flex flex-col md:flex-row w-full gap-4">
        <div class="flex flex-col w-full md:w-1/2">
          <Input
            id="first-name"
            label="Primeiro nome"
            type="text"
            placeholder="Primeiro nome"
            :value="info.firstName"
            :error="errorInfo.firstName"
            :inputRef="refsInfo.firstName"
          />
        </div>
        <div class="flex flex-col w-full md:w-1/2">
          <Input
            id="last-name"
            type="text"
            label="Último nome"
            placeholder="Último nome"
            :value="info.lastName"
            :error="errorInfo.lastName"
            :inputRef="refsInfo.lastName"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row w-full gap-4">
        <div class="flex flex-col w-full md:w-1/2">
          <Input
            id="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@email.com"
            :value="info.email"
            :error="errorInfo.email"
            :inputRef="refsInfo.email"
          />
          <p v-if="errorEmailRegex" class="text-red-500 mt-1">Digite um e-mail válido.</p>
        </div>
        <div class="flex flex-col w-full md:w-1/2">
          <Input
            id="tel"
            type="text"
            label="Número do celular"
            placeholder="(12) 98765-4321"
            :value="info.tel"
            :error="errorInfo.tel"
            :inputRef="refsInfo.tel"
          />
        </div>
      </div>
      <!-- Adicione o restante dos Inputs aqui -->
    </div>
  </template>
  
  <script lang="ts">
  import Input from "../core/Input.vue";
  
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      info: {
        type: Object,
        required: true,
      },
      setInfo: {
        type: Function,
        required: true,
      },
      errorInfo: {
        type: Object,
        required: true,
      },
      refsInfo: {
        type: Object,
        required: true,
      },
      errorEmailRegex: {
        type: String,
        required: true,
      },
      handleSubmitCep: {
        type: Function,
        required: true,
      },
    },
    components: {
      Input,
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  