<template>
  <main>
    <section>
      <div>Home / Characters</div>
      <BaseInput v-model="searchQuery"/>
    </section>
    <section>
      <CardList :cards="sortedAndSearchedCards" v-if="!isCardsLoading"/>
      <div v-else>Карточки загружаются...</div>
    </section>
    <section>
      <div v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'current-page': page===pageNumber }" @click="setPage(pageNumber)">
        {{ pageNumber }}
      </div>
    </section>
  </main>
  <aside>
    <MyModalWindow ref="modal" @message="showMessage"/>
  </aside>
</template>

<script setup lang="ts">
import Input from "@/components/UI/BaseInput.vue"
import CardList from "@/components/CardList.vue"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import {ref} from "vue";
import {useCards} from "@/hooks/useCards";
import useSearch from "@/hooks/useSearch";
import MyModalWindow from "@/components/UI/MyModalWindow.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
const modal = ref<InstanceType<typeof MyModalWindow> | null>(null)

const { cards, isCardsLoading, totalPages, page } = useCards()
const { sortedAndSearchedCards, searchQuery } = useSearch(cards)

const showMessage = (e) => {
  modal.value.close()
}
const showModal = () => {
  modal.value.open()
}
const setPage = (number: number) => {
  page.value = number
}


</script>

<style scoped>
.current-page {
  border: 1px solid pink;
}
</style>
