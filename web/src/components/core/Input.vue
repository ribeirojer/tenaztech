<template>
	<div class="flex flex-col">
	  <label :for="id" class="text-sm font-medium text-gray-700">{{ label }}</label>
	  <input
		:id="id"
		:type="type"
		:placeholder="placeholder"
		:value="value"
		@input="$emit('input', $event)"
		:class="{ 'border-red-500': error }"
		ref="inputRef"
		class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
	  />
	  <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
	</div>
  </template>
  
  <script lang="ts">
  export default {
	props: {
	  id: {
		type: String,
		required: true,
	  },
	  label: {
		type: String,
		required: true,
	  },
	  type: {
		type: String,
		default: 'text',
	  },
	  placeholder: {
		type: String,
		default: '',
	  },
	  value: {
		type: [String, Number],
		default: '',
	  },
	  error: {
		type: String,
		default: '',
	  },
	  inputRef: {
		type: Object,
		default: null,
	  },
	},
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  </style>
  