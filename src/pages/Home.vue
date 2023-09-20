<template>
  <div>{{ $store.state.count }}</div>
  <div>{{ $store.getters.doubleCount }}</div>
  <my-styled-btn @click="$store.commit('increment')">inc count</my-styled-btn>
  <my-styled-btn @click="showModal">show modal</my-styled-btn>
  <my-modal v-model:show="modalVisible">
    <CardList :cards="sortedCards"/>
  </my-modal>
  <CardList :cards="sortedAndSearchedCards" v-if="!isCardsLoading"/>
  <div v-else>Карточки загружаются...</div>
  <Input :model-value="searchQuery" @update:model-value="setSearchQuery" />
  <div>
    <div v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'current-page': page===pageNumber }" @click="setPage(pageNumber)">
      {{ pageNumber }}
    </div>
  </div>
</template>

<script lang="ts">
import Input from "@/components/UI/BaseInput.vue"
import CardList from "@/components/CardList.vue"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

interface HomeState {
  modalVisible: boolean
}

export default {
  components: {
    CardList, Input
  },
  data():HomeState {
    return {
      modalVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'home/setPage',
      setSearchQuery: 'home/setSearchQuery'
    }),
    ...mapActions({
      fetchCards: 'home/fetchData'
    }),
    showModal() {
      this.modalVisible = true
    },
  },
  mounted() {
    this.fetchCards()
  },
  computed: {
    ...mapState({
      cards: state => state.home.cards,
      isCardsLoading: state => state.home.isCardsLoading,
      searchQuery: state => state.home.searchQuery,
      page: state => state.home.page,
      limit: state => state.home.limit,
      totalPages: state => state.home.totalPages
    }),
    ...mapGetters({
      sortedCards: 'home/sortedCards',
      sortedAndSearchedCards: 'home/sortedAndSearchedCards'
    })
  },
  watch: {
    page() {
      this.fetchCards()
    }
  }
}
</script>

<style scoped>
.current-page {
  border: 1px solid pink;
}
</style>
