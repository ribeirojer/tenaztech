<template>
	<HeaderTop />
	<HeaderMiddle />
  </template>
  
  <script>
export default {
	props: {
		isMenuOpen: Boolean,
		cartItems: Array,
		wishlist: Array,
		user: Object,
	},
	methods: {
		toggleMenu() {
			this.$emit("toggle-menu");
		},
		toggleSearch() {
			this.$emit("toggle-search");
		},
		handleSubmit() {
			// Handle search submission
		},
	},
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