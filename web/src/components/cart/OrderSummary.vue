<template>
  <div class="w-full md:w-1/3">
    <div class="flex flex-col justify-start border border-teal-300 rounded-lg p-4 shadow-sm shadow-teal-500 bg-teal-50">
      <div class="mb-4">
        <h2 class="font-semibold text-2xl text-center mb-2">Seu Pedido</h2>
        <div class="card-body">
          <h5 class="font-semibold mb-4">Produtos</h5>
          <div v-for="(product, index) in cartItems" :key="index" class="flex justify-between">
            <p>{{ productsData[index].name }}</p>
            <div class="flex gap-2">
              <p>{{ product.quantity }}</p>
              <p>{{ formatCurrency(productsData[index].price[0]) }}</p>
              <p class="font-semibold">{{ formatCurrency(product.quantity * productsData[index].price[0]) }}</p>
            </div>
          </div>
          <hr class="mt-0" />
          <div class="flex justify-between mb-3 pt-1">
            <h6 class="font-semibold">Subtotal</h6>
            <h6 class="font-semibold">{{ formatCurrency(sumCartItems()) }}</h6>
          </div>
          <div v-if="cupomMain" class="flex justify-between">
            <h6 class="font-semibold">Cupom</h6>
            <h6 class="font-semibold">{{ formatCurrency(parseFloat(cupomMain)) }}</h6>
          </div>
          <div class="flex justify-between">
            <h6 class="font-semibold">Envio</h6>
            <h6 class="font-semibold">{{ shipping ? 'Grátis' : formatCurrency(10) }}</h6>
          </div>
        </div>
        <div class="card-footer border-secondary bg-transparent">
          <div class="flex justify-between mt-2">
            <h5 class="text-teal-500 text-2xl font-bold">Total</h5>
            <h5 class="text-teal-500 text-2xl font-bold">{{ shipping ? formatCurrency(sumCartItems() - parseFloat(cupomMain)) : formatCurrency(sumCartItems() + 10 - parseFloat(cupomMain)) }}</h5>
          </div>
        </div>
      </div>
      <div class="text-sm">
        *O pagamento é feito pela plataforma do Mercado Pago.
      </div>
      <div class="relative">
        <div class="checkbox_confirmacao mt-4 flex items-center">
          <input id="terms" color="purple" type="checkbox" v-model="termsAgreed" />
          <label for="terms">
            Eu li e aceito os 
            <router-link to="/termos-de-uso" class="text-teal-500 hover:text-teal-700 transition-all">termos e condições</router-link>
          </label>
        </div>
        <p v-if="errorPaymentInfo.termsAgreed" class="text-red-500 mt-2">É preciso aceitar os termos e condições.</p>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-4 flex w-full">
        <button type="submit" class="w-full bg-green-500 mt-4 flex justify-center hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">Finalizar Pedido</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { formatCurrency } from '../../utils/functions';

export default {
  data() {
    return {
      cartItems: [] as any,
      cupomMain: '',
      termsAgreed: false,
      errorPaymentInfo: {
        termsAgreed: ''
      },
      productsData: [] as any,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.termsAgreed) {
        this.errorPaymentInfo.termsAgreed = 'É preciso aceitar os termos e condições.';
        return;
      }
      // Chamada para finalizar o pedido
    },
    async fetchProducts(id: any) {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        this.productsData.push(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    sumCartItems() {
      let sum = 0;
      this.cartItems.forEach((item: { quantity: number; }, index: string | number) => {
        sum += item.quantity * this.productsData[index].price[0];
      });
      return sum;
    }
  },
  computed: {
    shipping() {
      return this.sumCartItems() > 100;
    }
  },
  watch: {
    cartItems(newValue) {
      newValue.forEach((element: { id: any; }) => {
        this.fetchProducts(element.id);
      });
    }
  },
  setup() {
    return {
      formatCurrency,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
