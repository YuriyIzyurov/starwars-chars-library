<template>
  <div>
    <div>{{ card.name }}</div>
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

<script>

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
