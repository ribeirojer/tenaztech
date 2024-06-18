<template>
  <div>
    <div class="flex items-center">
      <h1 class="font-semibold text-lg md:text-2xl">All Customers</h1>
      <button class="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Add customer</button>
    </div>
    <div class="border shadow-sm rounded-lg mt-4">
      <table class="w-full">
        <thead>
          <tr>
            <th class="py-2 px-3 w-[80px]">Image</th>
            <th class="py-2 px-3 max-w-[150px]">Name</th>
            <th class="py-2 px-3 hidden md:table-cell">Email</th>
            <th class="py-2 px-3 hidden md:table-cell">Total Orders</th>
            <th class="py-2 px-3 hidden md:table-cell">Last Order</th>
            <th class="py-2 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td class="py-2 px-3">
              <img class="w-10 h-10 rounded-full" :src="customer.image || '/placeholder-user.jpg'" :alt="customer.name">
            </td>
            <td class="py-2 px-3 font-medium">{{ customer.name }}</td>
            <td class="py-2 px-3 hidden md:table-cell">{{ customer.email }}</td>
            <td class="py-2 px-3 hidden md:table-cell">{{ customer.totalOrders }}</td>
            <td class="py-2 px-3 hidden md:table-cell">{{ customer.lastOrder }}</td>
            <td class="py-2 px-3 text-right">
              <div class="relative">
                <button @click="toggleDropdown(customer.id)" class="px-2 py-1 text-gray-500 hover:text-gray-900 focus:outline-none">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 12h.01M9 12h.01M12 9v.01M12 15v.01M12 12v.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01"/>
                  </svg>
                  <span class="sr-only">Actions</span>
                </button>
                <div v-if="dropdownVisible === customer.id" class="absolute right-0 z-10 bg-white shadow-lg rounded-lg mt-1">
                  <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">View</a>
                  <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</a>
                  <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      customers: [] as any,
      dropdownVisible: null
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('https://api.example.com/customers');
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    toggleDropdown(id: any) {
      this.dropdownVisible = this.dropdownVisible === id ? null : id;
    }
  }
};
</script>

<style scoped>
/* Adicione seu CSS aqui, se necessário */
</style>
