<template>
  <header class="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
    <a class="lg:hidden" href="#">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m4-4H8" />
      </svg>
      <span class="sr-only">Home</span>
    </a>
    <div class="flex-1">
      <h1 class="font-semibold text-lg">Recent Orders</h1>
    </div>
    <div class="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <svg class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
          </svg>
          <input
            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white border border-gray-300 rounded-md"
            placeholder="Search orders..."
            type="search"
          />
        </div>
      </form>
      <div class="relative">
        <button class="rounded-full" id="dropdownMenuButton">
          <img
            alt="Avatar"
            class="rounded-full"
            height="32"
            src="/motivation.svg"
            width="32"
          />
          <span class="sr-only">Toggle user menu</span>
        </button>
        <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
          <div class="px-4 py-2 text-sm text-gray-700">My Account</div>
          <div class="border-t border-gray-100"></div>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</a>
          <div class="border-t border-gray-100"></div>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    onMounted(() => {
      const dropdownButton = document.getElementById('dropdownMenuButton');
      const dropdownMenu = document.getElementById('dropdownMenu');

      dropdownButton?.addEventListener('click', () => {
        dropdownMenu?.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        if (
          !dropdownMenu?.contains(event.target as Node) &&
          !dropdownButton?.contains(event.target as Node)
        ) {
          dropdownMenu?.classList.add('hidden');
        }
      });
    });
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
