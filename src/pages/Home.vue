<template>
  <main>
    <div>
      <h6 class="opacity">Home </h6>
      <h5>/ Characters</h5>
    </div>
    <section class="main-header">
      <h1>Characters</h1>
      <Input v-model="searchQuery" name="search"/>
    </section>
    <section>
      <CardList :cards="currentPageCards"/>
    </section>
    <section class="main-footer">
<!--на некоторых макетах нет поиска и пагинации, но я оставил-->
      <Pagination />
    </section>
  </main>
</template>

<script setup>
import CardList from "@/components/CardList.vue"
import {onMounted, watch} from "vue";
import Input from "@/components/UI/StyledInput.vue";
import {useCardsStore} from "@/store";
import { storeToRefs } from 'pinia'
import Pagination from "@/components/Pagination.vue";


const store = useCardsStore()
const {  failedCards, cards, page, searchQuery, currentPageCards } = storeToRefs(store)


store.$onAction(({ name, after, store }) => {

  after((result) => {
    if(result==="FETCH_SUCCESS" && name==='fetchFilms') {
      for(const cardId of failedCards.value) {
        const filmArr = cards.value[cardId].films
        cards.value[cardId].films = store.setFilms(filmArr, cardId)
      }
      failedCards.value = []
      return
    }
    if(result==="FETCH_SUCCESS" || result==="ADDED_TO_FAVORITES" || result==='DELETED_FROM_FAVORITES') {
      //если сюда дошли, значит всё загружено и сохраним карточки
      //ну и после каждого обновления избранного обновим localStorage
      const cards = store.$state.cards
      const favoriteCards = store.$state.favoriteCards
      const filmList = store.$state.filmList

      localStorage.setItem('cards', JSON.stringify({ cards, favoriteCards, filmList }))
    }
  })
})

watch(searchQuery, () => {
  page.value = 1
})

onMounted(() => {
  store.fetchCharacters('cards')
  store.fetchFilms('cards')
})

</script>

<style scoped lang="scss">
  .main-header {
    display: flex;
    justify-content: space-between;
    margin:80px 0 124px 0;
  }
  .main-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 72px;

    > :first-child {
      margin-right: 8px;
      padding-top: 0;
    }
    > :last-child {
      margin-left: 8px;
      padding-top: 0;
    }
  }
  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--purple2);
    }
  }
  .prevent:hover {
    background-color: initial;
  }

  @media (max-width: 768px) {
    .main-footer {
      gap: calc(var(--base-unit) * 0.2);
      margin-top: var(--base-unit);
    }
    .main-header {
      flex-direction: column;
      gap: calc(var(--base-unit) * 0.5);
      margin: 48px 0 96px 0;
    }
  }
</style>
