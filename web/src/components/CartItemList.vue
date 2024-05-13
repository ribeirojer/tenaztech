<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Itens do Carrinho</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="py-2 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img :src="item.image" alt="Product Image" class="w-12 h-12 mr-4">
              <div>
                <h3 class="text-base font-semibold">{{ item.name }}</h3>
                <p class="text-gray-600">{{ item.quantity }} x {{ formatCurrency(item.price) }}</p>
              </div>
            </div>
            <button @click="removeItem(item.id)" class="text-red-500 font-semibold">Remover</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      cartItems: {
        type: Array as any,
        required: true
      }
    },
    methods: {
      removeItem(itemId: any) {
        this.$emit('removeItem', itemId);
      },
      formatCurrency(value: number) {
        return `$${value.toFixed(2)}`;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a lista de itens do carrinho */
  </style>
  