<template>
  <div class="border shadow-sm rounded-lg p-2">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
          <th scope="col" class="min-w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th scope="col" class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-right relative">
            <button @click="toggleDropdown(order.id)" class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <MoveHorizontalIcon class="w-4 h-4" />
              <span class="sr-only">Actions</span>
            </button>
            <div v-if="isDropdownOpen(order.id)" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">View order</a>
              <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Customer details</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MoveHorizontalIcon from '../icons/MoveHorizontalIcon.vue'; // Adjust the import path

export default defineComponent({
  name: 'OrderTable',
  components: {
    MoveHorizontalIcon,
  },
  setup() {
    const orders = ref([
      { id: '#3210', customer: 'Olivia Martin', channel: 'Online Store', date: 'February 20, 2022', total: '$42.25', status: 'Shipped' },
      { id: '#3209', customer: 'Ava Johnson', channel: 'Shop', date: 'January 5, 2022', total: '$74.99', status: 'Paid' },
      // Add more orders as needed
    ]);

    const dropdownState = ref<{ [key: string]: boolean }>({});

    const toggleDropdown = (orderId: string) => {
      dropdownState.value[orderId] = !dropdownState.value[orderId];
    };

    const isDropdownOpen = (orderId: string) => {
      return dropdownState.value[orderId] || false;
    };

    return {
      orders,
      toggleDropdown,
      isDropdownOpen,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
