<template>
  <div v-if="cards.length > 0">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
  </div>
  <h3 v-else>
    Нет карточек
  </h3>
</template>

<script lang="ts">
import Card from "@/components/Card.vue"
import { defineComponent, PropType } from "vue";
import {CardType} from "@/types";

export default defineComponent({
  components: { Card },
  props: {
    cards: {
      type: Array as PropType<CardType[]>,
      required: true
    }
  },
})
</script>

<style scoped>

</style>
