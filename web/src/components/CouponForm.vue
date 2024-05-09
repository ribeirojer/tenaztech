<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Formulário de Cupom</h2>
    <form @submit.prevent="applyCoupon" class="flex items-center">
      <input v-model="couponCode" type="text" placeholder="Digite o código do cupom" class="w-64 p-2 border border-gray-200 rounded-l">
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded-r">Aplicar Cupom</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      couponCode: ''
    };
  },
  methods: {
    applyCoupon() {
      this.$emit('applyCoupon', this.couponCode);
    }
  }
};
</script>

<style scoped>
/* Estilos para o formulário de cupom */
</style>
