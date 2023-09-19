<template>
  <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name:'my-styled-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
