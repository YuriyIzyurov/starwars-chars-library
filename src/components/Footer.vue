<template>
  <footer class="footer-wrapper bg-secondary border-big">
    <SVG name="logo"/>
    <div class="footer-content">
      <section class="footer-info">
        <h3>Info</h3>
        <nav>
          <ul>
            <li><h6>About us</h6></li>
            <li><h6>Terms & Conditions</h6></li>
            <li><h6>Social Media</h6></li>
          </ul>
        </nav>
      </section>
      <section class="footer-extra">
        <h3>Extra</h3>
        <nav>
          <ul>
            <li><h6>Games</h6></li>
            <li><h6>Movies</h6></li>
            <li><h6>Fandom</h6></li>
          </ul>
        </nav>
      </section>
      <section class="footer-subscribe">
        <h3>Subscribe for news</h3>
        <h6>Get the latest news from StarWars world</h6>
        <StyledInput name="email"/>
      </section>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SVG from "@/components/UI/SVG.vue";
import StyledInput from "@/components/UI/StyledInput.vue";

</script>

<style lang="scss" scoped>
  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    //по макету 204 пикселя, но если значение ни на что не влияет, то лучше округлять. С красивыми цифрами легче работать
    min-height: 200px;
    margin-top: 80px;
    padding: var(--base-unit) 160px var(--base-unit) var(--base-unit);
  }
  .footer-content {
    display: flex;
    gap: calc(var(--base-unit2) * 3);

    h3 {
      margin-bottom: var(--base-unit);
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: calc(var(--base-unit) * (16 / 24));
    }
  }
  .footer-subscribe {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: calc(var(--base-unit2) * 3);

    h6 {
      padding-bottom: calc(var(--base-unit) * (16 / 24));
    }
  }
</style>
