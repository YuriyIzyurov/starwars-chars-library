<template>
  <button class="button border-big bg-purple-light">
    <slot><h5>Learn more</h5></slot>
  </button>
</template>

<script>
export default {
  name: "StyledButton"
}
</script>

<style scoped>
  .button {
    width: 200px;
    height: 48px;
  }
</style>
