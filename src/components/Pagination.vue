<template>
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
</template>
<script setup>
import SVG from "@/components/UI/SVG.vue";
import {ref} from "vue";
import {useCardsStore} from "@/store";
import {storeToRefs} from "pinia";

const hoveredPages = ref({})
const store = useCardsStore()
const {  page, cardIsExpanded, pageArray, totalPages } = storeToRefs(store)

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

</script>

<style scoped>

</style>
