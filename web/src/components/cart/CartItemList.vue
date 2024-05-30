<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Itens do Carrinho</h2>
    <ul>
      <transition-group name="list" tag="div">
        <li v-for="item in cartItems" :key="item.id" class="py-2 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img :src="item.images[0]" alt="Product Image" class="w-12 h-12 mr-4">
              <div>
                <h3 class="text-base font-semibold">{{ item.name }}</h3>
                <p class="text-gray-600">{{ item.quantity }} x {{ formatCurrency(item.price) }}</p>
              </div>
            </div>
            <button @click="removeItem(item.id)" class="text-red-500 font-semibold flex items-center">
              <span>Remover</span>
              <svg class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CartItem } from '../../interfaces/Product';

export default defineComponent({
  name: 'CartItemList',
  props: {
    cartItems: {
      type: Array as PropType<CartItem[]>,
      required: true
    }
  },
  methods: {
    removeItem(itemId: number) {
      this.$emit('removeItem', itemId);
    },
    formatCurrency(value: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }
  }
});
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
