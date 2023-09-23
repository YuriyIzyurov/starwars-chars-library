<template>
  <div class="cards-wrapper">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
  </div>
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

