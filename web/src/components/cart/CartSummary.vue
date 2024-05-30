<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Resumo do Carrinho</h2>
    <div class="flex flex-col space-y-2">
      <div class="flex justify-between">
        <p class="text-gray-600">Subtotal:</p>
        <p class="text-gray-800 font-semibold">{{ formatCurrency(cartTotal) }}</p>
      </div>
      <div class="flex justify-between">
        <p class="text-gray-600">Custo de Envio:</p>
        <p class="text-gray-800 font-semibold">{{ formatCurrency(shippingCost) }}</p>
      </div>
      <div v-if="discountDetails" class="flex justify-between">
        <p class="text-gray-600">Desconto:</p>
        <p class="text-green-500 font-semibold">{{ formatCurrency(discountDetails.amount) }} ({{ discountDetails.description }})</p>
      </div>
      <div class="flex justify-between">
        <p class="text-gray-600">Total:</p>
        <p class="text-black font-semibold">{{ total }}</p>
      </div>
      <p v-if="!discountDetails" class="text-gray-600 italic">Nenhum desconto aplicado.</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cartTotal: {
      type: Number,
      required: true
    },
    shippingCost: {
      type: Number,
      required: true
    },
    discountDetails: Object as any
  },
  methods: {
    formatCurrency(value: number) {
      return `$${value.toFixed(2)}`;
    }
  },
  computed: {
    total() {
      const discountAmount = this.discountDetails ? this.discountDetails.amount : 0;
      return this.formatCurrency(this.cartTotal + this.shippingCost - discountAmount);
    }
  }
};
</script>

<style scoped>
/* Estilos para o resumo do carrinho */
</style>
