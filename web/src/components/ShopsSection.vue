<template>
    <div class="section py-8">
      <div class="container mx-auto px-4 md:px-0">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ShopItem title="Fones de Ouvido" imageUrl="/img/shop01.png" slug="fones-de-ouvido"/>
          <ShopItem title="Carregadores Portateis" imageUrl="/img/shop03.png" slug="carregadores-portateis"/>
          <ShopItem title="Caixas de som bluetooth" imageUrl="/img/shop02.png" slug="caixas-de-som-bluetooth"/>
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
  