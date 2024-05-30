<template>
    <div class="flex justify-center items-center">
      <div class="loader"></div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'LoadingSpinner',
  };
  </script>
  
  <style scoped>
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  