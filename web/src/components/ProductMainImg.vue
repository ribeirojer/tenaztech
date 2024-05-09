<template>
  <div class="col-md-5 col-md-push-2">
    <div id="product-main-img" class="flex justify-center">
      <div class="product-preview">
        <img :src="productImage" :alt="altText">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    productImage: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: "Product Image"
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.product-preview img {
  max-width: 100%;
  height: auto;
}
</style>
