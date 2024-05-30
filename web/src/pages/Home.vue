<template>
    <Navigation />
    <ShopsSection />
    <SecondSection />
    <HotDeal />
    <Newsletter />
  </template>
  
  <script lang="ts">
  import Navigation from "../components/home/Navigation.vue";
  import Newsletter from "../components/home/Newsletter.vue";
  import ShopsSection from "../components/home/ShopsSection.vue";
  import SecondSection from "../components/home/SecondSection.vue";
  import HotDeal from "../components/home/HotDeal.vue";

  export default {
    name: 'HomeView',
  components: {
    Navigation,
    Newsletter,
    ShopsSection,
    SecondSection,
    HotDeal,
  },
  };
  </script>
  
  <style scoped>
  /* Estilos para a página inicial */
  </style>
  