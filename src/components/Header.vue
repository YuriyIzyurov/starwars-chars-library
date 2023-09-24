<template>
  <header class="header-wrapper border border-big">
    <div class="logo logo-header">
      <SVG name="logo"/>
    </div>
    <nav>
      <ul class="nav-list">
        <li class="border border-big"><router-link to="/"><h3>Home</h3></router-link></li>
        <li class="border border-big"><router-link to="/news"><h3>News</h3></router-link></li>
        <li class="border border-big"><router-link to="/gallery"><h3>Gallery</h3></router-link></li>
        <li class="border border-big"><router-link to="/forum"><h3>Forum</h3></router-link></li>
        <li class="border border-big cursor-pointer" @click="toggleMenu">
          <div class="menu-icon">
            <SVG v-if="!isMenuOpen" name="menu"/>
            <SVG v-else name="exit"/>
          </div>
          <h3>Menu</h3>
        </li>
        <li class="border border-big" style="position: relative">
          <SVG name="favorites"/>
          <span class="fav-notification element-wrapper border-small bg-purple-light"><h5>{{ store.favoritesCount }}</h5></span>
        </li>
      </ul>
      <ul :class="['nav-list-mobile','border','border-big', isMenuOpen && 'nav-list-mobile__isShow'] ">
        <li><router-link to="/"><h3>Home</h3></router-link></li>
        <li><router-link to="/news"><h3>News</h3></router-link></li>
        <li><router-link to="/gallery"><h3>Gallery</h3></router-link></li>
        <li><router-link to="/forum"><h3>Forum</h3></router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import SVG from "@/components/UI/SVG.vue";
import {useCardsStore} from "@/store";
import {defineProps, ref} from "vue";

const store = useCardsStore()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

defineProps({
  isLargeDesktop: Boolean,
  isDesktop: Boolean,
  isMediumTablet: Boolean,
  isSmallTablet: Boolean,
  isMobile: Boolean
})
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
}
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
      width: var(--header-btn-width);
      height: var(--header-btn-height);
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-last-child(2) {
        display: none;
        width: var(--header-btn3-width);
        gap: calc(var(--base-unit) * 0.5);
      }
      &:last-child {
        width: var(--header-btn2-width);
      }
    }
  }
  .nav-list-mobile {
    display: none;
    position: fixed;
    top: 64px;
    right: calc(-1 * var(--input-width-1024));
    z-index: 666;
    flex-direction: column;
    align-items: center;
    padding: var(--base-unit2);
    min-width: var(--input-width-1024);
    background-color: var(--grey1);
    gap: var(--base-unit2);
    transition: transform 0.3s ease-in-out;

    &__isShow {
      transform: translateX(-233px);
    }
  }
  .fav-notification {
    position: absolute;
    top: 3px;
    right: 3px;
    //другой сюда не подходит
    border-radius: 9.8px;
    padding-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-icon {
    min-width: var(--base-unit);
    min-height: var(--base-unit);
    display: flex;
    svg {
      width: 100%;
      height: 100%;
    }
  }



  @media (max-width: 1024px) {
    .nav-list-mobile {
      display: flex;
    }
    .nav-list li:not(:nth-last-child(-n+2)) {
      display: none;
    }
    .nav-list li:nth-last-child(2) {
      display: flex;
    }
    .fav-notification {
      width: calc(var(--base-unit) * 0.6667);
      height: calc(var(--base-unit) * 0.6667);
    }
  }
@media (max-width: 768px) {
  h3 {
    display: none;
  }
  .nav-list li:nth-last-child(2) {
    gap: 0;
  }
}
</style>


