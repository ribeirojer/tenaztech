<template>
    <div class="grid gap-6">
      <div>
        <h2 class="font-bold text-2xl">Product Details</h2>
        <div class="grid gap-4 md:grid-cols-2 mt-4">
          <div class="grid gap-2">
            <h3 class="font-semibold">Specifications</h3>
            <div class="grid gap-2">
              <div v-for="(value, key) in specs" :key="key" class="flex justify-between">
                <span>{{ key }}</span>
                <span>{{ value }}</span>
              </div>
            </div>
          </div>
          <div class="grid gap-2">
            <h3 class="font-semibold">Features</h3>
            <div class="grid gap-2">
              <div v-for="(value, key) in features" :key="key" class="flex justify-between">
                <span>{{ key }}</span>
                <span>{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['specs', 'features'],
  };
  </script>
  