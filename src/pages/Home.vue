<template>
  <main>
    <div>
      <h6>Home </h6>
      <h5>/ Characters</h5>
    </div>
    <section class="main-header">
      <h1>Characters</h1>
      <StyledInput v-model="searchQuery" name="search"/>
    </section>
    <section>
      <CardList :cards="store.currentPageCards"/>
    </section>
    <section class="main-footer">
      <div :class="['cursor-pointer','element-wrapper', 'border-small', 'arrow', store.page===1 && 'opacity cursor-default prevent']"
           @click="setPageByArrow(store.page, 'prev')">
        <SVG name="arrow-left"/>
      </div>
      <div v-for="pageNumber in store.pageArray"
           :key="pageNumber"
           :class="['element-wrapper', 'border-small' , {
             'bg-purple-light': store.page===pageNumber,
             'cursor-pointer': !isNaN(pageNumber),
             'cursor-default': isNaN(pageNumber),
             'border': hoveredPages[pageNumber] && !isNaN(pageNumber) && store.page!==pageNumber
           }]"
           @click="setPage(pageNumber)"
           @mouseover="hoveredPages[pageNumber] = true"
           @mouseleave="hoveredPages[pageNumber]= false">
        {{ pageNumber }}
      </div>
      <div :class="['cursor-pointer','element-wrapper', 'border-small', 'arrow', store.page===store.totalPages && 'opacity cursor-default prevent']"
           @click="setPageByArrow(store.page, 'next')">
        <SVG name="arrow-right"/>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CardList from "@/components/CardList.vue"
import {onMounted, ref, watch } from "vue";
import useSearch from "@/hooks/useSearch";
import MyModalWindow from "@/components/UI/MyModalWindow.vue";
import SVG from "@/components/UI/SVG.vue";
import {DirectionType} from "@/types";
import StyledInput from "@/components/UI/StyledInput.vue";
import {useCardsStore} from "@/store";
import { storeToRefs } from 'pinia'
import {log} from "node:util";


const modal = ref<InstanceType<typeof MyModalWindow> | null>(null)
const hoveredPages = ref({})

//let { currentPageCards, cards, totalPages, page, pageArray, fetchCharacters, fetchFilms } = useCardsStore()
const store = useCardsStore()
const { filmList, failedCards, cards, page } = storeToRefs(store)

const { sortedAndSearchedCards, searchQuery } = useSearch(store.cards)


const setPage = (number: number) => {
  if(isNaN(number))
    return
  page.value = number
}
const setPageByArrow = (currPage: number, direction: DirectionType) => {
  if(direction==='prev' && currPage > 1) {
    setPage(currPage - 1)
  } else if(direction==='next' && currPage < store.totalPages) {
    setPage(currPage + 1)
  }
}

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
    if(result==="FETCH_SUCCESS" || result==="ADDED_TO_FAVORITES") {
      //если сюда дошли, значит всё загружено и сохраним карточки
      //ну и после каждого обновления избранного обновим localStorage
      const cards = store.$state.cards
      const favoriteCards = store.$state.favoriteCards
      const filmList = store.$state.filmList

      localStorage.setItem('cards', JSON.stringify({ cards, favoriteCards, filmList }))
      return
    }
  })
})


onMounted(() => {
  console.log('PAGE MOUNTED')
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
</style>
