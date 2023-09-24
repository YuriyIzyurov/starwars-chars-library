<template>
  <div class="application">
    <Header
        :isLargeDesktop="isLargeDesktop"
        :isDesktop="isDesktop"
        :isMediumTablet="isMediumTablet"
        :isSmallTablet="isSmallTablet"
        :isMobile="isMobile"
    />
    <router-view/>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import {defineComponent, onMounted} from "vue";
import { useMediaQuery } from '@vueuse/core'

const isLargeDesktop = useMediaQuery('(min-width: 1650px)')
const isDesktop = useMediaQuery('(min-width: 1281px) and (max-width: 1649px)')
const isMediumTablet = useMediaQuery('(min-width: 1025px) and (max-width: 1280px)')
const isSmallTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
const isMobile = useMediaQuery('(max-width: 768px)')


</script>

<style lang="scss">
  @import "style";


  .element-wrapper {
    width: var(--base-unit);
    height: var(--base-unit);
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0;
    padding-top: 1px;
  }
</style>
/*
@media (max-width: 1649px) {
//стили для макета 1280
}
@media (max-width: 1280px) {
//стили для макета 1024
}
@media (max-width: 1024px) {
//стили для макета 768
}
@media (max-width: 768px) {
//стили для макета 320
}
*/
