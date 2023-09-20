<template>
  <div class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs">
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  }
})
</script>

<style scoped lang="scss">
  .input-wrap {
    display: flex;
    flex-direction: column;

    input {
      padding: 6px 10px;
      font-size: 16px;
    }
  }
</style>
