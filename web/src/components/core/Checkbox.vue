<template>
    <label class="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        class="form-checkbox h-5 w-5 text-purple-600 dark:text-purple-400 border-gray-300 dark:border-gray-700 rounded"
        :checked="checked"
        @input="toggle"
      />
      <span class="text-sm text-body-color dark:text-gray-300"><slot></slot></span>
    </label>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        checked: this.value
      };
    },
    methods: {
      toggle() {
        this.checked = !this.checked;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adicione os estilos desejados aqui */
  </style>
  