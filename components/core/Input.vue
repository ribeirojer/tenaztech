<template>
  <div class="mb-12">
     <label :for="id" class="mb-[10px] block text-base font-medium text-dark dark:text-white">
       {{ label }}
     </label>
     <input
       :type="type"
       :placeholder="placeholder"
       :class="inputClass"
       :id="id"
       @input="$emit('update:modelValue', $event.target.value)"
     />
  </div>
 </template>
 
 <script>
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
			default: "text",
		},
		placeholder: {
			type: String,
			default: "",
		},
		inputClass: {
			type: String,
			default:
				"w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-purple-500 active:border-purple-500 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2",
		},
	},
};
</script>
 