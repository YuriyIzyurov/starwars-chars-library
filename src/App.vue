<template>
  <div class="application">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Header, Footer
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import "style";
</style>
