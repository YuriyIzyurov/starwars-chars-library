<template>
  <div class="application">
    <Header />
    <router-view/>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<style lang="scss">
  @import "styles/global";
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
