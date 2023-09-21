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
      <CardList :cards="currentPageCards" v-if="!isCardsLoading"/>
      <div v-else>Карточки загружаются...</div>
    </section>
    <section class="main-footer">
      <SVG class="cursor-pointer" name="arrow-left" :class="page===1 && 'opacity cursor-default'" @click="setPageByArrow(page, 'prev')"/>
      <div v-for="pageNumber in pageArray"
           :key="pageNumber"
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
      <SVG class="cursor-pointer" name="arrow-right" :class="page===totalPages && 'opacity cursor-default'" @click="setPageByArrow(page, 'next')"/>
    </section>
  </main>
  <aside>
<!--    <MyModalWindow ref="modal" @message="showMessage"/>-->
  </aside>
</template>

<script setup lang="ts">
import CardList from "@/components/CardList.vue"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import {ref} from "vue";
import {useCards} from "@/hooks/useCards";
import useSearch from "@/hooks/useSearch";
import MyModalWindow from "@/components/UI/MyModalWindow.vue";
import SVG from "@/components/UI/SVG.vue";
import {DirectionType} from "@/types";
import StyledInput from "@/components/UI/StyledInput.vue";

const modal = ref<InstanceType<typeof MyModalWindow> | null>(null)
const hoveredPages = ref({})

const { currentPageCards, cards, isCardsLoading, totalPages, page, pageArray } = useCards()
const { sortedAndSearchedCards, searchQuery } = useSearch(cards)

const showMessage = (e) => {
  modal.value.close()
}
const showModal = () => {
  modal.value.open()
}
const setPage = (number: number) => {
  if(isNaN(number))
    return
  page.value = number
}
const setPageByArrow = (currPage: number, direction: DirectionType) => {
  if(direction==='prev' && currPage > 1) {
    setPage(currPage - 1)
  } else if(direction==='next' && currPage < totalPages.value) {
    setPage(currPage + 1)
  }
}


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
      padding-top: 1px;
    }
    > :last-child {
      margin-left: 8px;
      padding-top: 1px;
    }
  }

</style>
