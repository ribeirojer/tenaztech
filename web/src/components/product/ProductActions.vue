<template>
  <div class="flex flex-col md:flex-row gap-4 mb-4">
    <button 
      @click="addCart" 
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
    <div v-if="isProductToCart" class="flex">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg>
      <span>Produto adicionado</span>
    
    </div>
<div v-else class="flex gap-4 items-center justify-center">      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle><path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path><path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path></svg>
  <span>Adicionar ao carrinho</span>
  </div>
    </button>
    <div class="flex items-center gap-4">
      <button
        @click="addWishlist" 
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        aria-label="Adicionar à lista de desejos"
      >
      <div v-if="isProductToWishlist" class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 18c4 0 5-4 5-4H7s1 4 5 4z"></path>
          <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
          <path d="m8.535 12.634 2.05-2.083a1.485 1.485 0 0 0-.018-2.118 1.49 1.49 0 0 0-2.065-.034 1.488 1.488 0 0 0-2.067.068c-.586.6-.579 1.53.019 2.117l2.081 2.05zm7 0 2.05-2.083a1.485 1.485 0 0 0-.018-2.118 1.49 1.49 0 0 0-2.065-.034 1.488 1.488 0 0 0-2.068.067c-.586.6-.579 1.53.019 2.117l2.082 2.051z"></path>
        </svg>
        <span>Adicionar à lista de desejos</span>
      </div>
      <div v-else class="flex gap-4 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.279 8.833 12 9.112l-.279-.279a2.745 2.745 0 0 0-3.906 0 2.745 2.745 0 0 0 0 3.907L12 16.926l4.186-4.186a2.745 2.745 0 0 0 0-3.907 2.746 2.746 0 0 0-3.907 0z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
        <span>Produto adicionado</span>
      </div>
    </button>
    </div>
  </div>
</template>

<script lang="ts">
import { addToCart, addToWishlist, getCart, getWishlist } from "../../utils/localStorage";

export default {
  data() {
    return {
      isProductToCart: false,
      isProductToWishlist: false,
    };
  },
  props: {
    product: {
      type: Object as () => any,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  methods: {
    addCart() {
      addToCart(this.product, this.quantity);
    },
    addWishlist() {
      addToWishlist(this.product)
    },
    getCart(){
      console.log(getCart())
      this.isProductToCart = !!getCart()
    },
    getWishlist(){
      this.isProductToWishlist = !!getWishlist()
    }
  }
};
</script>
<style scoped>
/* Estilos específicos para este componente */
button, a {
  transition: all 0.3s ease;
}
button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
svg {
  fill: currentColor;
}
</style>
