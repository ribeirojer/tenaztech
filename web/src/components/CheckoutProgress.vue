<template>
    <div class="flex justify-center items-center my-4 gap-6">
      <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center justify-center">
        <div class="rounded-full shadow shadow-gray-300 p-2" :class="{ 'bg-green-500': index < currentStep, 'border-green-500': index === currentStep }">
          <svg class="w-5 h-5 fill-white" v-if="index < currentStep" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
          <div v-else class="px-1 -my-1">{{ index + 1 }}</div>
        </div>
        <div class="text-sm mt-1" :class="{ 'font-bold': index === currentStep, 'font-semibold text-green-500': index < currentStep  }">{{ step }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      currentStep: {
        type: Number,
        required: true
      },
      steps: {
        type: Array as any,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  </style>
  