<template>
  <div class="application">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import {defineComponent} from "vue";

export default defineComponent({
  components: { Header, Footer }
})
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
