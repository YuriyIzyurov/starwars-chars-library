<template>
  <header class="header-wrapper border border-big">
    <div class="logo logo-header">
      <SVG name="logo"/>
    </div>
    <nav>
      <ul class="nav-list">
        <li v-for="route in routesData"
            class="border border-big">
          <router-link :to="route.path">
            <h3>{{route.name}}</h3>
          </router-link>
        </li>
        <li class="border border-big cursor-pointer" @click="toggleMenu">
          <div class="menu-icon">
            <SVG v-if="!isMenuOpen" name="menu"/>
            <SVG v-else name="exit"/>
          </div>
          <h3 class="menu-text">Menu</h3>
        </li>
        <li class="border border-big cursor-pointer" style="position: relative" @click="toggleFavorites">
          <SVG name="favorites"/>
          <span class="fav-notification element-wrapper border-small bg-purple-light"><h5>{{ favoritesCount }}</h5></span>
        </li>
      </ul>
      <ul :class="['nav-list-mobile','border','border-big', isMenuOpen && 'nav-list-mobile__isShow'] ">
        <li v-for="route in routesData"
            @click="toggleMenu">
          <router-link :to="route.path">
            <h3>{{ route.name }}</h3>
          </router-link>
        </li>
      </ul>
    </nav>
    <aside :class="['fav-modal', 'border border-big', 'bg-grey-primary', isFavoritesOpen && favoritesCount > 0 && 'fav-modal__isOpen']">
      <SVG class="close-icon cursor-pointer" name="exit" @click="closeFavs"/>
      <MiniCard v-for="card in store.favoriteCards" :card="card"/>
      <div class="fav-btn-wrapper">
        <Button
            @click="store.deleteRandomFavorite"
        >
          {{ 'Unfavorite random' }}
        </Button>
      </div>
    </aside>
  </header>
</template>

<script setup lang="ts">
import SVG from "@/components/UI/SVG.vue";
import MiniCard from "@/components/MiniCard.vue";
import {routesData} from "@/constants";
import {useCardsStore} from "@/store";
import Button from "@/components/UI/StyledButton.vue"
import {ref,watch} from "vue";
import {storeToRefs} from "pinia";



const store = useCardsStore()
const { favoritesCount } = storeToRefs(store)
const isMenuOpen = ref(false)
const isFavoritesOpen = ref(false)


function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function toggleFavorites() {
  isFavoritesOpen.value = !isFavoritesOpen.value
}
function closeFavs() {
  isFavoritesOpen.value = false
}
watch(favoritesCount, (newCount) => {
  if(!newCount) {
    isFavoritesOpen.value = false
  }
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

      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
  .fav-modal {
    position: fixed;
    top: -180px;
    right: -130px;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: var(--base-unit);
    width: 350px;
    gap: calc(var(--base-unit) * 0.3);
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.4);
    border-color: var(--stroke-color-dark);
    transition: transform 0.2s ease-in-out;
    transform: translate(0, 0) scale(0);

    &__isOpen {
      transform: translate(-160px, 245px) scale(1);
    }
  }
  .fav-btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
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
  .close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    transform: scale(1.5);
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
  .menu-text {
    display: none;
  }
  .header-wrapper {
    margin-bottom: var(--base-unit);
  }
  .nav-list li:nth-last-child(2) {
    gap: 0;
  }
  .nav-list-mobile__isShow {
    transform: translateX(-217px);
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.4);
  }
  .fav-modal {
    width: 280px;
    right: -140px;
  }
}
</style>


