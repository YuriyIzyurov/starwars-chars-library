<template>
  <div :class="['cards-wrapper', !cards.length && 'cards-wrapper-empty']">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
    <Card v-if="!cards.length" class="list" :card="{ name: 'Ничего не найдено', dummy: true }" />
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

