<template>
  <div class="card border border-big">
    <div>{{ card.name }}</div>
    <img :src="`${card.image}`" alt="Card Image">
    <div>{{ card.birth_year }}</div>
    <div>{{ card.height }}</div>
    <div>{{ card.mass }}</div>
    <div>{{ card.hair_color }}</div>
    <div>{{ card.skin_color }}</div>
    <div>{{ card.eye_color }}</div>
    <div>{{ card.films[0] }}</div>
    <my-styled-btn/>
  </div>
</template>


<script setup lang="ts">
import {defineComponent, defineProps, PropType} from "vue";
import {CardType} from "@/types";


defineProps({
  card: {
    type: Object as PropType<CardType>,
    required: true
  }
})
</script>

<style scoped>
  .card {
    min-width: 784px;
    min-height: 395px;
    background-color: var(--grey1);
  }
</style>
