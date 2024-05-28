<template>
  <nav class="grid items-start px-4 text-sm font-medium">
    <button
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      @click="$emit('navigate', 'home')"
    >
      <HomeIcon class="h-4 w-4" />
      Home
    </button>
    <button
      class="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
      @click="$emit('navigate', 'orders')"
    >
      <ShoppingCartIcon class="h-4 w-4" />
      Orders
      <span class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</span>
    </button>
    <button
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      @click="$emit('navigate', 'products')"
    >
      <PackageIcon class="h-4 w-4" />
      Products
    </button>
    <button
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      @click="$emit('navigate', 'customers')"
    >
      <UsersIcon class="h-4 w-4" />
      Customers
    </button>
    <button
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      @click="$emit('navigate', 'finances')"
    >
      <LandmarkIcon class="h-4 w-4" />
      Finances
    </button>
    <button
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      @click="$emit('navigate', 'analytics')"
    >
      <LineChartIcon class="h-4 w-4" />
      Analytics
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeIcon from '../icons/HomeIcon.vue';
import ShoppingCartIcon from '../icons/ShoppingCartIcon.vue';
import PackageIcon from '../icons/PackageIcon.vue';
import UsersIcon from '../icons/UsersIcon.vue';
import LandmarkIcon from '../icons/LandmarkIcon.vue';
import LineChartIcon from '../icons/LineChartIcon.vue';

export default defineComponent({
  name: 'Sidebar',
  components: {
    HomeIcon,
    ShoppingCartIcon,
    PackageIcon,
    UsersIcon,
    LandmarkIcon,
    LineChartIcon,
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
