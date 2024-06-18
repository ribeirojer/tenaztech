<template>
  <div>
    <HeaderTop />
    <div class="header bg-slate-950 flex justify-between items-center py-4 px-6">
      <RouterLink to="/administrador">
        <Logo />
      </RouterLink>
      <form class="hidden md:flex items-center space-x-4" @submit.prevent="submitForm">
        <div class="form-input flex items-center border-b border-purple py-1">
          <MagnifyGlassIcon />
          <input v-model="searchQuery" placeholder="Busca pelo nome" class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none text-purple-500">
        </div>
        <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-4 transition duration-300">Pesquisar</button>
      </form>
      <div class="header-ctn flex items-center space-x-4">
        <RouterLink to="/lista-de-desejos" class="relative text-white flex flex-col justify-center items-center">
          <HearthIcon />
          <p class="text-sm font-semibold text-white">Lista de Desejos</p>
          <div class="absolute bg-purple-500 px-2 py-[2px] -top-2 right-6 rounded-full text-white">{{ wishlistItemCount }}</div>
        </RouterLink>
        <RouterLink to="/carrinho" class="relative text-white flex flex-col justify-center items-center">
          <CartIcon />
          <p class="text-sm font-semibold text-white">Carrinho</p>
          <div class="absolute bg-purple-500 px-2 py-[2px] -top-2 right-0 rounded-full text-white">{{ cartItemCount }}</div>
        </RouterLink>
      </div>
    </div>
    <div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-900 to-90% h-1"></div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import Logo from './Logo.vue';
import HeaderTop from './HeaderTop.vue';
import MagnifyGlassIcon from './icons/MagnifyGlassIcon.vue';
import HearthIcon from './icons/HearthIcon.vue';
import CartIcon from './icons/CartIcon.vue';
import ArrowIcon from './icons/ArrowIcon.vue';
import { getCart, getWishlist } from '../utils/localStorage.ts';

export default {
  name: 'Header',
  data() {
    return {
      selectedCategory: "",
      searchQuery: "",
      wishlistItemCount: 0,
      cartItemCount: 0,
    };
  },
  components: {
    Logo,
    HeaderTop,
    MagnifyGlassIcon,
    HearthIcon,
    CartIcon,
    ArrowIcon
  },
  methods: {
    submitForm() {
      this.$router.push({ path: '/produtos', query: { p: this.searchQuery } });

    },
    updateItemCount() {
      const wishlist = getWishlist()
      const cartItems = getCart()
      this.wishlistItemCount = wishlist.length;
      this.cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  },
  mounted() {
    this.updateItemCount();
  },
  watch: {
    '$route'() {
      this.updateItemCount();
    }
  }
};
</script>

  
<style>
	
/* Menu Hamburguer */

.checkbox {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: 400ms ease-in-out 0s;
}
.checkbox .trace {
  width: 50px;
  height: 2px;
  background-color: #222;
  position: absolute;
  border-radius: 4px;
  transition: 0.5s ease-in-out;
}
.checkbox .trace:nth-child(1) {
  top: 26px;
  transform: rotate(0);
}
.checkbox .trace:nth-child(2) {
  top: 46px;
  transform: rotate(0);
}
.checkbox .trace:nth-child(3) {
  top: 66px;
  transform: rotate(0);
}
#toggle {
  display: none;
}

/* menu */

.menu {
  position: absolute;
  top: 28px;
  right: 30px;
  background: transparent;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 0px #eee;
  z-index: -1;
  transition: 400ms ease-in-out 0s;
}
.menu-itens {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: 400ms ease-in-out 0s;
}
.menu-itens ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}
.menu-itens ul li a {
  margin: 0.5rem 0;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 2rem;
  line-height: 3.2rem;
}

/* animação do menu */

#toggle:checked + .checkbox .trace:nth-child(1) {
  transform: rotate(45deg);
  background-color: #222;
  top: 47px;
}
#toggle:checked + .checkbox .trace:nth-child(2) {
  transform: translate(-100px);
  width: 30px;
  visibility: hidden;
  opacity: 0;
}
#toggle:checked + .checkbox .trace:nth-child(3) {
  transform: rotate(-45deg);
  background-color: #222;
  top: 48px;
}
#toggle:checked + .checkbox {
  background-color: #fbcfe8;
}
#toggle:checked ~ .menu {
  box-shadow: 0px 0px 0px 100vmax #fbcfe8;
  z-index: 1;
}
#toggle:checked ~ .menu-itens {
  visibility: visible;
  opacity: 1;
}

.menularge {
  display: none;
}
.menularge li a {
  padding: 0.3rem;
  color: #eee;
  transition: 0.5s;
  font-weight: 700;
  &:hover {
    color: #bbb;
  }
}

.active {
  border-bottom: 2px solid #bbb;
}

@media (min-width: 640px) {
	.checkbox-wrapper {
	  display: none;
	}
	.menularge {
	  display: flex;
	  ul {
		display: flex;
		gap: 1rem;
	  }
	}
  }
  </style>