<template>
  <div class="cards-wrapper">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
  </div>
</template>

<script>
import Card from "@/components/Card.vue"
import { defineComponent } from "vue";


export default defineComponent({
  components: { Card },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
})
</script>

