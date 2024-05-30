<template>
  <div>
    <div class="flex items-center gap-4">
      <button class="px-2 py-1 bg-transparent border border-gray-400 rounded-full">
        <ArrowLeftIcon class="h-4 w-4" />
        <span class="sr-only">Back</span>
      </button>
      <h1 class="font-semibold text-lg md:text-xl">Analytics</h1>
      <div class="ml-auto flex items-center gap-2">
        <button class="hidden sm:flex px-4 py-2 bg-transparent border border-gray-400 rounded-md">Today</button>
        <button class="hidden md:flex px-4 py-2 bg-transparent border border-gray-400 rounded-md">This Month</button>
        <div class="relative">
          <button class="w-[280px] justify-start text-left font-normal px-4 py-2 bg-transparent border border-gray-400 rounded-md">
            <CalendarClockIcon class="mr-2 h-4 w-4" />
            June 01, 2023 - June 30, 2023
          </button>
          <div class="absolute right-0 mt-2 w-auto p-0 border bg-white rounded shadow-lg">
            <!-- Substitua com o componente de calendário -->
            <calendar initial-focus mode="range" number-of-months="2"></calendar>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-6 mt-4">
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p class="text-gray-600">Total Sales</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.totalSales }}</h3>
          </div>
          <div>
            <stackedbar-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div class="bg-white rounded shadow p-4">
          <div>
            <p class="text-gray-600">Sessions</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.sessions }}</h3>
          </div>
          <div>
            <dot-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p class="text-gray-600">Returning Customers</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.returningCustomers }}%</h3>
          </div>
          <div>
            <groupedbar-chart class="aspect-[4/3]" />
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p class="text-gray-600">Visitors</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.visitors }}</h3>
          </div>
          <div>
            <line-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 flex flex-col">
          <div>
            <p class="text-gray-600">Page Views</p>
            <h3 class="text-lg font-semibold">{{ analyticsData.pageViews }}</h3>
          </div>
          <div>
            <labelledpie-chart class="aspect-[4/3]" />
          </div>
        </div>
        <div class="bg-white rounded shadow p-4">
          <div>
            <p class="text-gray-600">Top Referrers</p>
          </div>
          <div class="grid gap-4">
            <div class="flex items-center" v-for="referrer in analyticsData.topReferrers" :key="referrer.source">
              <div>{{ referrer.source }}</div>
              <div class="font-semibold ml-auto">{{ referrer.visits }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import CalendarClockIcon from '../icons/CalendarClockIcon.vue';

export default {
  components: {
    ArrowLeftIcon,
    CalendarClockIcon,
  },
  data() {
    return {
      analyticsData: {
        totalSales: '',
        sessions: '',
        returningCustomers: '',
        visitors: '',
        pageViews: '',
        topReferrers: [],
      },
    };
  },
  created() {
    this.fetchAnalyticsData();
  },
  methods: {
    async fetchAnalyticsData() {
      try {
        const response = await axios.get('https://api.example.com/analytics');
        this.analyticsData = response.data;
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Adicione seu CSS aqui, se necessário */
</style>
