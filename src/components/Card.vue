<template>
  <div class="card bg-secondary border-big">
    <div class="card__content">
      <div class="image-wrapper border-big">
        <img v-if="card.image" class="card-image" :src="card.image" alt="Card Image">
        <div v-else class="skeleton"></div>
      </div>
      <div class="card__content-right">
        <h2 v-if="card.name">{{ card.name }}</h2>
        <h2 class="skeleton" style="height: auto" v-else>Loading...</h2>
        <StyledButton/>
      </div>
    </div>
<!--    <div>{{ card.birth_year }}</div>
    <div>{{ card.height }}</div>
    <div>{{ card.mass }}</div>
    <div>{{ card.hair_color }}</div>
    <div>{{ card.skin_color }}</div>
    <div>{{ card.eye_color }}</div>
    <div>{{ card.films[0] }}</div>-->
  </div>
</template>


<script setup lang="ts">
import {defineComponent, defineProps, PropType} from "vue";
import {CardType, DummyCard} from "@/types";



defineProps({
  card: {
    type: Object as PropType<CardType|DummyCard>,
    required: true
  }
})
</script>

<style scoped lang="scss">
  .skeleton {
    width: 100%;
    height: 100%;
    background-color: #c0d3d3;
    animation: pulse-bg 1s infinite;
  }

  .card {
    min-width: 784px;
    min-height: 395px;
    position: relative;


    &__content {
      display: flex;
      position: absolute;
      left: var(--base-unit2);
      bottom: 47.5px;
      gap: 32px;
      &-right {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-top: 100px;
      }
     }
  }
  .image-wrapper {
    width: 300px;
    height: 400px;
    overflow: hidden;
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
