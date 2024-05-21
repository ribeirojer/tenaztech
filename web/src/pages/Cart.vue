<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Carrinho de Compras</h1>
    <div v-if="cartItems.length === 0" class="flex flex-col justify-center items-center">
      <img src="/assets/8-5.png" alt="" class="size-80 -m-4 ">
      <span class="text-center text-gray-500">Seu carrinho está vazio.</span>
      <RouterLink to="/produtos" class="px-6 my-4 text-white bg-purple-500 hover:bg-purple-600 py-3 rounded-md transition duration-300">
        Ver produtos
      </RouterLink>
    </div>
    <div v-else class="flex flex-col md:flex-row justify-between gap-4">
      <CartItemList :cartItems="cartItems" @removeItem="removeItemFromCart"/>
      <div class="flex flex-col gap-4">              
        <CouponForm @applyCoupon="applyCoupon" :couponApplied="couponApplied" :loading="loading" :message="couponMessage" :success="couponSuccess" />
        <CartSummary :cartTotal="cartTotal" :shippingCost="shippingCost" :discountDetails="discountDetails" />
        <button @click="checkout" class="px-4 py-2 rounded my-8 text-white font-bold bg-gradient-to-r from-sky-500 from-10% to-green-500 to-90%">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import CartItemList from '../components/CartItemList.vue';
import CouponForm from '../components/CouponForm.vue';
import CartSummary from '../components/CartSummary.vue';
import { getCart, removeFromCart } from '../utils/localStorage';
import { CartItem } from '../interfaces/Product';

export default defineComponent({
  name: 'CartView',
  components: {
    CartItemList,
    CouponForm,
    CartSummary
  },
  data() {
    return {
      cartItems: [] as CartItem[],
      couponCode: '',
      couponApplied: false,
      discountDetails: null,
      loading: false,
      couponMessage: '',
      couponSuccess: false
    };
  },
  computed: {
    cartTotal(): number {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    shippingCost(): number {
      return 10;
    }
  },
  async created() {
    await this.loadCartItems();
  },
  methods: {
    async loadCartItems() {
      const cartData = getCart();
      const promises = cartData.map(async (item) => {
        try {
          const response = await axios.get(`https://product-catalog-service.deno.dev/api/products/${item.slug}`);
          const productDetails = response.data;
          this.cartItems.push({ ...item, ...productDetails });
        } catch (error) {
          console.error('Erro ao carregar detalhes do produto:', error);
        }
      });
      await Promise.all(promises);
    },
    async applyCoupon(couponCode: string) {
      this.loading = true;
      this.couponMessage = '';
      try {
        const response = await axios.post('http://seuservidor.com/api/coupon', { couponCode });
        this.couponApplied = true;
        this.discountDetails = response.data;
        this.couponMessage = 'Cupom aplicado com sucesso!';
        this.couponSuccess = true;
      } catch (error) {
        console.error('Erro ao aplicar o cupom:', error);
        this.couponMessage = 'Erro ao aplicar o cupom. Tente novamente.';
        this.couponSuccess = false;
      } finally {
        this.loading = false;
      }
    },
    checkout() {
      this.$router.push('/checkout');
    },
    removeItemFromCart(itemId: number) {
      removeFromCart(itemId);
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    }
  }
});
</script>

<style scoped>
/* Estilos para a página do carrinho */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

h1 {
  color: #333;
}

</style>
