<template>
  <header class="header-wrapper border border-big">
    <SVG name="logo"/>
    <nav>
      <ul class="nav-list">
        <li class="border border-big"><router-link to="/"><h2>Home</h2></router-link></li>
        <li class="border border-big"><router-link to="/news"><h2>News</h2></router-link></li>
        <li class="border border-big"><router-link to="/gallery"><h2>Gallery</h2></router-link></li>
        <li class="border border-big"><router-link to="/forum"><h2>Forum</h2></router-link></li>
        <li class="border border-big">
          <SVG name="favorites"/>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import SVG from "@/components/UI/SVG.vue";
</script>

<style scoped lang="scss">
  .header-wrapper {
    width: 100%;
    padding: 2px;
    display: flex;
    margin-bottom: 36px;
    nav {
      margin-left: auto;
    }
  }
  .nav-list {
    display: flex;
    gap: 3px;
    li {
      height: 80px;
      width: 180px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-child {
        width: 120px;
      }
    }
  }
</style>
