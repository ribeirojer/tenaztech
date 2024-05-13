<template>
  <section class="relative z-10 overflow-hidden bg-white dark:bg-dark py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4 lg:justify-between">

  <ContactInfo />
  <ContactForm />        </div>

</div>
</section>
  </template>
  
  <script lang="ts">
  import ContactInfo from "../components/ContactInfo.vue"
  import ContactForm from "../components/ContactForm.vue"

  export default {
    name: 'ContactView',
    components: {
      ContactInfo,
      ContactForm
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a página de contato */
  </style>
  