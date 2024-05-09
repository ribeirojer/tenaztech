<template>
    <Navigation />
    <ShopsSection />
    <SecondSection />
    <HotDeal />
    <Newsletter />
    <!--<Blog />-->
  </template>
  
  <script lang="ts">
  import Navigation from "../components/Navigation.vue";
  import Newsletter from "../components/Newsletter.vue";
  import ShopsSection from "../components/ShopsSection.vue";
  import SecondSection from "../components/SecondSection.vue";
  import HotDeal from "../components/HotDeal.vue";
  import Blog from "../components/Blog.vue";

  export default {
    name: 'HomeView',
  components: {
    Navigation,
    Newsletter,
    ShopsSection,
    SecondSection,
    HotDeal,
    Blog
  },
  };
  </script>
  
  <style scoped>
  /* Estilos para a página inicial */
  </style>
  