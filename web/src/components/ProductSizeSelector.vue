<template>
    <div class="w-full mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="size">Tamanho</label>
      <select v-model="selectedSize" id="size" class="input-select w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition">
        <option v-for="(size, index) in sizes" :key="index" :value="size">{{ size }}</option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      sizes: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    },
    computed: {
      selectedSize: {
        get() {
          return this.value;
        },
        set(value: any) {
          this.$emit('input', value);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  .input-select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: #fff;
    color: #1f2937;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-select:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
  }
  </style>
  