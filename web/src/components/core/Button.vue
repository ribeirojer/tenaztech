<script>
export default {
	props: {
		buttonClass: {
			type: String,
			default:
				"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
		},
	},
};
</script>

<template>
  <button :class="buttonClass" @click="$emit('click')">
     <slot></slot>
  </button>
 </template>
 