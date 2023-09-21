<template>
  <div class="cards-wrapper" v-if="cards.length > 0">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
  </div>
  <h3 v-else>
    Нет карточек
  </h3>
</template>

<script lang="ts">
import Card from "@/components/Card.vue"
import { defineComponent, PropType } from "vue";
import {CardType, DummyCard} from "@/types";

export default defineComponent({
  components: { Card },
  props: {
    cards: {
      type: Array as PropType<(CardType|DummyCard)[]>,
      required: true
    }
  },
})
</script>

<style scoped>
  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 84px 32px;
  }
</style>
