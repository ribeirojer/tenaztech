<template>
    <div class="col-md-12">
      <div id="product-tab">
        <!-- product tab nav -->
        <ProductTabNav :tabs="tabs" :activeTab="activeTab" @change-tab="changeTab" />
        <!-- /product tab nav -->
  
        <!-- product tab content -->
        <div class="tab-content">
          <ProductTabContent v-for="tab in tabs" :key="tab.id" :tab="tab" :activeTab="activeTab" />
        </div>
        <!-- /product tab content -->
      </div>
    </div>
  </template>
  
  <script>
  import ProductTabNav from './ProductTabNav.vue';
  import ProductTabContent from './ProductTabContent.vue';
  
  export default {
    components: {
      ProductTabNav,
      ProductTabContent,
    },
    data() {
      return {
        activeTab: 'tab1',
        tabs: [
          { id: 'tab1', title: 'Description', content: 'Lorem ipsum dolor sit amet...' },
          { id: 'tab2', title: 'Details', content: 'Lorem ipsum dolor sit amet...' },
          { id: 'tab3', title: 'Reviews', content: 'reviews', rating: 4.5, reviews: [] },
        ],
      };
    },
    methods: {
      changeTab(tabId) {
        this.activeTab = tabId;
      },
    },
  };
  </script>
  