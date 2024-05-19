<template>
    <div class="flex items-center mb-4">
      <div class="mr-4">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="quantity">Quantidade</label>
        <div class="input-number flex items-center">
          <input v-model.number="quantity" type="number" id="quantity" class="input-text w-20 text-center" min="1">
          <span class="qty-up ml-1 cursor-pointer" @click="incrementQuantity">+</span>
          <span class="qty-down ml-1 cursor-pointer" @click="decrementQuantity">-</span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    computed: {
      quantity: {
        get() {
          return this.value;
        },
        set(value: any) {
          this.$emit('input', value);
        }
      }
    },
    methods: {
      incrementQuantity() {
        this.quantity++;
      },
      decrementQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  .input-text {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    background-color: #fff;
    color: #1f2937;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-text:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
  }
  .qty-up,
  .qty-down {
    background-color: #e5e7eb;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .qty-up:hover,
  .qty-down:hover {
    background-color: #d1d5db;
  }
  </style>
  