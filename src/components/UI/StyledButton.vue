<template>
  <component
      :is="props.as"
      :disabled="props.disabled"
      :class="['button', 'border-big',
      props.disabled ? 'bg-grey-primary' : 'bg-purple-light']">
    <h5>
      <slot/>
    </h5>
    <component class="icon" v-if="icon" :is="props.icon" name="favorites"/>
  </component>
</template>

<script setup>
import {defineProps} from "vue";


const props = defineProps({
  icon: [Object, Boolean],
  disabled: Boolean,
  as: {
    type: [String, Object],
    default: "button"
  },
})


</script>

<style scoped lang="scss">
  .button {
    width: var(--button-width);
    height: var(--button-height);
    display: flex;
    justify-content: center;
    align-items: center;

    &:not([disabled]):hover {
      background-color: var(--purple2);
    }
    &:disabled {
      cursor: default;
    }
  }
  .icon {
    margin-left: var(--base-unit);
  }
</style>
