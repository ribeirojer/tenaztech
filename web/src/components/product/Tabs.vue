<template>
    <div>
      <div class="flex border-b">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="[
            'py-2 px-4 -mb-px text-sm focus:outline-none',
            tab.value === selectedTab
              ? 'border-b-2 border-indigo-500 text-indigo-500'
              : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
          ]"
          @click="selectTab(tab.value)"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      tabs: {
        type: Array,
        required: true,
      } as any,
      selectedTab: {
        type: String,
        required: true,
      },
    },
    methods: {
      selectTab(value: string) {
        this.$emit('selectTab', value);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Seu estilo aqui */
  </style>
  