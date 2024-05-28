<template>
  <div class="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
    <Sidebar @navigate="currentView = $event" />
    <div class="flex flex-col">
      <Header />
      <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Home v-if="currentView === 'home'" />
        <OrderTable v-if="currentView === 'orders'" />
        <Products v-if="currentView === 'products'" />
        <Customers v-if="currentView === 'customers'" />
        <Finances v-if="currentView === 'finances'" />
        <Analytics v-if="currentView === 'analytics'" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from '../components/admin/Sidebar.vue';
import Header from '../components/admin/Header.vue';
import Home from '../components/admin/Home.vue';
import OrderTable from '../components/admin/OrderTable.vue';
import Products from '../components/admin/Products.vue';
import Customers from '../components/admin/Customers.vue';
import Finances from '../components/admin/Finances.vue';
import Analytics from '../components/admin/Analytics.vue';

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
    Home,
    OrderTable,
    Products,
    Customers,
    Finances,
    Analytics
  },
  data(){
    return {
      currentView: 'home' // default view
    }
  }
}
</script>
