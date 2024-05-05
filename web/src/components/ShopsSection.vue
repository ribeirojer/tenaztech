<template>
    <div class="section py-8">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ShopItem title="Laptop Collection" imageUrl="/img/shop01.png" />
          <ShopItem title="Accessories Collection" imageUrl="/img/shop03.png" />
          <ShopItem title="Cameras Collection" imageUrl="/img/shop02.png" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import ShopItem from "./ShopItem.vue";

export default {
	components: {
		ShopItem,
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  