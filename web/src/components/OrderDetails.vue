<template>
  <div class="order-summary p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-semibold border-b pb-2 mb-4">Seu Pedido</h3>
    <div class="order-header flex justify-between border-b pb-2 mb-4">
      <span class="font-medium">Produto</span>
      <span class="font-medium">Total</span>
    </div>
    <div class="order-products">
      <div v-for="(product, index) in products" :key="index" class="order-product flex justify-between border-b py-2">
        <span>{{ product.quantity }}x {{ product.name }}</span>
        <span>{{ formatCurrency(product.quantity * product.price) }}</span>
      </div>
    </div>
    <div class="order-total flex justify-between pt-4 border-t mt-4">
      <span class="font-semibold text-lg">Total</span>
      <span class="font-semibold text-lg">{{ formatCurrency(total) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'OrderSummary',
  props: {
    products: {
      type: Array as () => { name: string; price: number; quantity: number; }[],
      required: true,
    },
  },
  setup(props) {
    const total = computed(() => {
      return props.products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    });

    const formatCurrency = (value: number) => {
      return `$${value.toFixed(2)}`;
    };

    return { total, formatCurrency };
  },
});
</script>

<style scoped>
.order-summary {
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.order-header, .order-total {
  font-size: 1.125rem;
}
.order-product {
  font-size: 1rem;
  padding: 0.5rem 0;
}
.order-total {
  font-weight: bold;
}
</style>
