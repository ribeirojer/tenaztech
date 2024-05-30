<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="card border rounded-lg shadow-md p-4 bg-white">
        <div class="card-header">
          <div class="card-title text-lg font-semibold">Total Orders</div>
          <div class="card-description text-gray-600">The total number of orders placed on your store.</div>
        </div>
        <div class="card-content mt-4">
          <div class="flex items-center justify-between">
            <span class="text-4xl font-bold">{{ stats.totalOrders }}</span>
            <svg class="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card border rounded-lg shadow-md p-4 bg-white">
        <div class="card-header">
          <div class="card-title text-lg font-semibold">Total Revenue</div>
          <div class="card-description text-gray-600">The total amount of revenue generated from your store.</div>
        </div>
        <div class="card-content mt-4">
          <div class="flex items-center justify-between">
            <span class="text-4xl font-bold">{{ stats.totalRevenue }}</span>
            <svg class="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card border rounded-lg shadow-md p-4 bg-white">
        <div class="card-header">
          <div class="card-title text-lg font-semibold">New Customers</div>
          <div class="card-description text-gray-600">The number of new customers that have signed up on your store.</div>
        </div>
        <div class="card-content mt-4">
          <div class="flex items-center justify-between">
            <span class="text-4xl font-bold">{{ stats.newCustomers }}</span>
            <svg class="h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="border shadow-sm rounded-lg p-2 mt-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th class="min-w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
            <th class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.customer }}</td>
            <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.channel }}</td>
            <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{{ order.total }}</td>
            <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
              <div class="relative inline-block text-left">
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" @click="toggleDropdown(order.id)">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12" />
                  </svg>
                  <span class="sr-only">Actions</span>
                </button>
                <div v-if="dropdownVisible === order.id" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">View order</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Customer details</a>
                  </div>
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
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalOrders: 0,
        totalRevenue: 0,
        newCustomers: 0,
      },
      orders: [] as Array<{
        id: string;
        customer: string;
        channel: string;
        date: string;
        total: string;
        status: string;
      }>,
      dropdownVisible: null as string | null,
    };
  },
  created() {
    this.fetchStats();
    this.fetchOrders();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get('https://api.example.com/stats');
        this.stats = response.data;
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },
    async fetchOrders() {
      try {
        const response = await axios.get('https://api.example.com/orders');
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    toggleDropdown(orderId: string) {
      if (this.dropdownVisible === orderId) {
        this.dropdownVisible = null;
      } else {
        this.dropdownVisible = orderId;
      }
    },
  },
});
</script>

<style scoped>
.card-header {
  margin-bottom: 1rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}
.card-description {
  color: #6b7280;
}
.card-content {
  margin-top: 1rem;
}
</style>
