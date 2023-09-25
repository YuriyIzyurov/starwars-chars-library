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
      <div :class="['cursor-pointer','element-wrapper', 'border-small', 'arrow', page===1 && 'opacity cursor-default prevent']"
           @click="setPageByArrow(page, 'prev')">
        <SVG name="arrow-left"/>
      </div>
      <div v-for="pageNumber in pageArray"
           :class="['element-wrapper', 'border-small' , {
             'bg-purple-light': page===pageNumber,
             'cursor-pointer': !isNaN(pageNumber),
             'cursor-default': isNaN(pageNumber),
             'border': hoveredPages[pageNumber] && !isNaN(pageNumber) && page!==pageNumber
           }]"
           @click="setPage(pageNumber)"
           @mouseover="hoveredPages[pageNumber] = true"
           @mouseleave="hoveredPages[pageNumber]= false">
        {{ pageNumber }}
      </div>
      <div :class="['cursor-pointer','element-wrapper', 'border-small', 'arrow', page===totalPages && 'opacity cursor-default prevent']"
           @click="setPageByArrow(page, 'next')">
        <SVG name="arrow-right"/>
      </div>
    </section>
  </main>
</template>

<script setup>
import CardList from "@/components/CardList.vue";
import {onMounted, ref, watch} from "vue";
import Input from "@/components/UI/StyledInput.vue";
import SVG from "@/components/UI/SVG.vue"
import {useCardsStore} from "@/store";
import { storeToRefs } from 'pinia';
import {ADDED_TO_FAVORITES, DELETED_FROM_FAVORITES, FETCH_SUCCESS} from "@/constants";


const store = useCardsStore()
const {  failedCards, page, cardIsExpanded, cards, searchQuery, totalPages, currentPageCards, pageArray } = storeToRefs(store)
const hoveredPages = ref({})

const setPageByArrow = (currPage, direction) => {
  if(direction==='prev' && currPage > 1) {
    setPage(currPage - 1)
  } else if(direction==='next' && currPage < totalPages.value) {
    setPage(currPage + 1)
  }
}
const setPage = (number) => {
  if(isNaN(number))
    return
  page.value = number
  cardIsExpanded.value = false
}

store.$onAction(({ name, after, store }) => {

  after((result) => {
    if(result===FETCH_SUCCESS && name==='fetchFilms') {


      const cards = store.$state.cards
      const favoriteCards = store.$state.favoriteCards
      const filmList = store.$state.filmList

      localStorage.setItem('cards', JSON.stringify({ cards, favoriteCards, filmList }))
      return
    }

    if(result===FETCH_SUCCESS || result===ADDED_TO_FAVORITES || result===DELETED_FROM_FAVORITES) {
      //пока перенес эту логику сюда, потому что внезапно сломался доступ к стейту и нельзя было подгружать фильмы по мере загрузки.
      // Cannot access 'store' before initialization
      // так фильмы подгрузятся после персонажей, зато без ошибок

      store.fillCardsByFilms()
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

/*
  console.log(cards.value)
  for(const cardId of failedCards.value) {

    const filmArr = cards.value[cardId].films
    cards.value[cardId].films = store.setFilms(filmArr, cardId)
  }
  failedCards.value = []*/


onMounted(() => {
  store.fetchCharacters('cards')
  store.fetchFilms('cards')
})

</script>

<style scoped lang="scss">
  .main-header {
    display: flex;
    justify-content: space-between;
    gap: var(--base-unit);
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
