<template>
  <div class="py-4 px-2">
    <div class="border-b mb-4">
      <h3 class="text-lg font-semibold">Your Order</h3>
    </div>
    <div class="mb-4">
      <div class="flex justify-between border-b pb-2">
        <div class="w-3/4">PRODUCT</div>
        <div class="w-1/4 text-right">TOTAL</div>
      </div>
      <div>
        <div v-for="(product, index) in products" :key="index" class="flex justify-between border-b py-2">
          <div class="w-3/4">{{ product.quantity }}x {{ product.name }}</div>
          <div class="w-1/4 text-right">{{ formatCurrency(product.price) }}</div>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="w-3/4"><strong>TOTAL</strong></div>
        <div class="w-1/4 text-right"><strong>{{ formatCurrency(total) }}</strong></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
  },
  watch: {
    products: {
      handler(products) {
        this.total = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
      },
      deep: true
    }
  }
};
</script>
