<template>
    <form class="grid gap-4 md:gap-10">
      <div class="grid gap-2">
        <label class="text-base" for="color">Color</label>
        <div class="flex items-center gap-2" id="color">
          <label
            v-for="color in colors"
            :key="color"
            :class="radioClass(color)"
          >
            <input type="radio" :value="color" name="color" class="hidden" />
            {{ color.charAt(0).toUpperCase() + color.slice(1) }}
          </label>
        </div>
      </div>
      <div class="grid gap-2">
        <label class="text-base" for="quantity">Quantity</label>
        <select class="w-24 border rounded-md p-2" id="quantity" v-model="selectedQuantity">
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <button type="button" class="bg-blue-500 text-white py-2 px-4 rounded-lg" @click="addToCart">Add to cart</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        colors: ['black', 'white', 'blue'],
        selectedQuantity: 1,
      };
    },
    methods: {
      radioClass(color) {
        return `border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800`;
      },
      addToCart() {
        // Lógica para adicionar ao carrinho
        console.log(`Color: ${this.selectedColor}, Quantity: ${this.selectedQuantity}`);
      },
    },
  };
  </script>
  