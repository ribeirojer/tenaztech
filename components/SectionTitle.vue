<template>
    <div class="container mx-auto flex justify-between my-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <div>
        <ul class="flex space-x-4">
          <li v-for="(item, index) in items" :key="index" :class="{ 'border-b-2 border-purple-600': index === activeIndex }">
            <a @click="setActiveIndex(index)" class="text-gray-600 hover:text-purple-600 cursor-pointer">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
</template>

  <script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		setActiveIndex(index) {
			this.activeIndex = index;
		},
	},
};
</script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  