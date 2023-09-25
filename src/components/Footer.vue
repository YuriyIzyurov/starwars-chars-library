<template>
  <footer class="footer-wrapper bg-secondary border-big">
    <div class="logo logo-footer">
      <SVG name="logo"/>
    </div>
    <div class="footer-content">
      <div class="footer-content__main">
        <section>
          <div class="dropdown-wrapper">
            <h3>Info</h3>
            <SVG v-if="isMobile"
                 :class="['dropdown-icon','cursor-pointer', toggleInfo && 'spread-dropdown']"
                 name="arrow-left" @click="toggleDropdown('info')"/>
          </div>
          <nav>
            <ul v-if="toggleInfo || !isMobile">
              <li><h6>About us</h6></li>
              <li><h6>Terms & Conditions</h6></li>
              <li><h6>Social Media</h6></li>
            </ul>
          </nav>
        </section>
        <section>
          <div class="dropdown-wrapper">
            <h3>Extra</h3>
            <SVG v-if="isMobile"
                 :class="['dropdown-icon','cursor-pointer', toggleExtra && 'spread-dropdown']"
                 name="arrow-left" @click="toggleDropdown('extra')"/>
          </div>
          <nav>
            <ul v-if="toggleExtra || !isMobile">
              <li><h6>Games</h6></li>
              <li><h6>Movies</h6></li>
              <li><h6>Fandom</h6></li>
            </ul>
          </nav>
        </section>
      </div>
      <section class="footer-subscribe">
        <h3>Subscribe for news</h3>
        <h6>Get the latest news from StarWars world</h6>
        <Input name="email"/>
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SVG from "@/components/UI/SVG.vue";
import Input from "@/components/UI/StyledInput.vue";
import {ref} from "vue";
import {SectionType} from "@/types";
import { useMediaQuery } from '@vueuse/core'

const toggleInfo = ref(false)
const toggleExtra = ref(false)
const isMobile = useMediaQuery('(max-width: 768px)')

function toggleDropdown(section: SectionType) {
  if(section==='info') {
    toggleInfo.value = !toggleInfo.value
    toggleExtra.value = false
  } else if(section==='extra') {
    toggleExtra.value = !toggleExtra.value
    toggleInfo.value = false
  }
}

</script>

<style lang="scss" scoped>
  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    //по макету 204 пикселя, но если значение ни на что не влияет, то лучше округлять. С красивыми цифрами легче работать
    //паддинг на 1280 тоже округлил с 98 до 100, и с 72 до 70
    min-height: 200px;
    margin-top: 80px;
    padding: var(--base-unit) 160px var(--base-unit) var(--base-unit);
    letter-spacing: var(--letter-space-small);
  }
  .footer-content {
    display: flex;
    gap: calc(var(--base-unit2) * 3);

    > * {
      width: 100%;
    }
    &__main {
      display: flex;
      min-height: 175px;
      gap: 24px;
    }
    h3 {
      margin-bottom: var(--base-unit);
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: calc(var(--base-unit) * (16 / 24));

      li {
        cursor: pointer;
      }
    }
  }
  .footer-subscribe {
    display: flex;
    flex-direction: column;
    max-width: var(--input-width);
    margin-left: calc(var(--base-unit2) * 3);

    h6 {
      padding-bottom: calc(var(--base-unit) * (16 / 24));
    }
  }
  .dropdown-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .dropdown-icon {
    will-change: transform;
    transform: rotate(-90deg);
    transition: transform 0.1s ease-in-out;
  }
  .spread-dropdown {
    transform: rotate(90deg);
  }
  @media (max-width: 1649px) {
    .footer-wrapper {
      padding: var(--base-unit) 100px var(--base-unit) var(--base-unit);
    }
    .footer-content {
      gap: calc(var(--base-unit2));

      ul {
        gap: calc(var(--base-unit) * 0.5);
      }
    }
    .footer-subscribe {
      margin-left: calc(var(--base-unit2) * 1.5);
    }
  }
  @media (max-width: 1280px) {
    .footer-wrapper {
      padding: var(--base-unit) 50px var(--base-unit) var(--base-unit);
    }
    .footer-subscribe {
      margin-left: calc(var(--base-unit2) * 0.9);
    }
  }
  @media (max-width: 1024px) {

    //сделал по центру, так вроде лучше выглядит

    .footer-wrapper {
      padding: calc(var(--base-unit) * 0.6667);
      align-items: center;
    }
    .footer-subscribe {
      margin-left: calc(var(--base-unit2) * 0.5);
    }
    .footer-content {
      align-items: center;
      ul {
        gap: calc(var(--base-unit) / 3);
      }
      h3 {
        margin-bottom: calc(var(--base-unit) * 0.7);
      }
    }
  }
  @media (max-width: 768px) {
    .footer-wrapper,
    .footer-content {
      flex-direction: column;
    }
    .footer-wrapper {
      padding: var(--base-unit);
      gap: var(--base-unit2);
    }
    .footer-content {
      align-items: flex-start;
      min-width: var(--logo-bot-width-768);
      gap: var(--base-unit);

      &__main {
        flex-direction: column;
      }
    }
    .footer-subscribe {
      margin-left: 0;
    }
  }

</style>
