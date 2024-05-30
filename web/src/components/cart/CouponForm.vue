<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Formulário de Cupom</h2>
    <form @submit.prevent="applyCoupon" class="flex items-center">
      <input
        v-model="couponCode"
        type="text"
        placeholder="Digite o código do cupom"
        class="w-64 p-2 border border-gray-200 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        :disabled="loading"
      >
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-r flex items-center"
        :disabled="loading || !couponCode"
      >
        <span v-if="!loading">Aplicar Cupom</span>
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M4 4l16 16" />
        </svg>
      </button>
    </form>
    <p v-if="message" :class="messageClass" class="mt-2">{{ message }}</p>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CouponForm',
  props: {
    couponApplied: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      couponCode: '' as any,
      loading: false as any
    };
  },
  computed: {
    messageClass(): string {
      return this.success ? 'text-green-500' : 'text-red-500';
    }
  },
  methods: {
    async applyCoupon() {
      if (!this.couponCode) return;

      this.loading = true;
      try {
        await this.$emit('applyCoupon', this.couponCode);
      } catch (error) {
        console.error('Error applying coupon:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para o formulário de cupom */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button svg {
  margin-left: 8px;
}
</style>
