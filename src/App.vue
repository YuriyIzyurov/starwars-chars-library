<template>
  <div class="application">
    <Header/>
    <router-view></router-view>
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
</style>
