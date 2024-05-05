<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.value
    };
  },
  watch: {
    checked(newValue) {
      this.$emit('input', newValue);
    },
    value(newValue) {
      this.checked = newValue;
    }
  }
};
</script>

<template>
</template>