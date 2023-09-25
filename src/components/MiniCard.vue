<template>
  <div class="mini-card-wrapper border border-medium">
    <div class="mini-card-wrapper__image border border-medium">
      <img class="card-image" :src="card.image" alt="Card Image">
    </div>
    <h5>{{ card.name.split(' ')[0] }}</h5>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
  .mini-card-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 130px;
    border-color: var(--stroke-color-dark);

    &__image {
      width: 94px;
      height: 108px;
      overflow: hidden;
      border-color: var(--purple3);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
     }
  }
</style>
