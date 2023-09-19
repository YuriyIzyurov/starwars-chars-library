<template>
  <div v-if="cards.length > 0">
    <Card class="list" v-for="card in cards" :card="card" :key="card.id"/>
  </div>
  <h3 v-else>
    Нет карточек
  </h3>
</template>

<script>
import Card from "@/components/Card.vue"

export default {
  components: { Card },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
