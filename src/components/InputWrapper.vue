<template>
  <div>
    <my-styled-input v-model="searchQuery" type="text" placeholder="Search character..."/>
    <button @click="searchCharacter">search</button>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    searchCharacter() {
      this.$emit('search', this.searchQuery)
      this.searchQuery = ''
    }
  }
}
</script>

<style scoped>

</style>
