<template>
  <header class="header-wrapper border border-big">
    <SVG name="logo"/>
    <nav>
      <ul class="nav-list">
        <li class="border border-big"><router-link to="/">Home</router-link></li>
        <li class="border border-big"><router-link to="/news">News</router-link></li>
        <li class="border border-big"><router-link to="/gallery">Gallery</router-link></li>
        <li class="border border-big"><router-link to="/forum">Forum</router-link></li>
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
    max-width: 1600px;
    padding: 2px;
    display: flex;
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
