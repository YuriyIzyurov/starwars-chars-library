<template>
  <div :class="['card', 'border','bg-secondary', 'border-big', {
    'big-shadow': isExpanded,
  }]" ref="modalBlock">
    <SVG v-if="isExpanded" class="close-button cursor-pointer" name="exit" @click="closeExpandedCard"/>
    <div class="card__content">
      <div class="image-wrapper border-big">
        <img v-if="card.image" class="card-image" :src="card.image" alt="Card Image">
        <div v-else class="skeleton"></div>
      </div>
      <div class="card__content-right">
        <h2 v-if="card.name">{{ card.name }}</h2>
        <h2 v-else class="skeleton" style="height: auto">Loading...</h2>
        <div :class="['card__hidden-info']" ref="cardsInfoBlock">
          <div>
            <h4>Birth year:</h4><h4>{{ card.birth_year }}</h4>
          </div>
          <div>
            <h4>Height:</h4><h4>{{ card.height }}</h4>
          </div>
          <div>
            <h4>Mass:</h4><h4>{{ card.mass }}</h4>
          </div>
          <div>
            <h4>Hair color:</h4><h4>{{ card.hair_color }}</h4>
          </div>
          <div>
            <h4>Skin color:</h4><h4>{{ card.skin_color }}</h4>
          </div>
          <div>
            <h4>Eye color:</h4><h4>{{ card.eye_color }}</h4>
          </div>
          <div>
            <h4>Films:</h4>
            <h4 v-if="card.films && typeof card.films==='string'">{{ card.films }}</h4>
            <h4 v-else class="skeleton" style="height: auto">Loading...</h4>
          </div>
        </div>
        <StyledButton
            :class="['animated-button', isExpanded && 'move-down']"
            @click="handleClick(isExpanded ? card.is_favorite ? 'delFromFav' : 'addToFav' : 'expand', card)"
            :disabled="!card.name"
            :icon="isExpanded && SVG"
        >
          {{ isExpanded ? card.is_favorite ? 'Unfavorite' : 'Add to favorite' : 'Learn more' }}
        </StyledButton>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {defineComponent, defineProps, PropType, ref} from "vue";
import {AnimationType, ButtonActionType, CardType, DummyCard} from "@/types";
import StyledButton from "@/components/UI/StyledButton.vue";
import SVG from "@/components/UI/SVG.vue";
import {useCardsStore} from "@/store";

const isExpanded = ref<InstanceType<boolean>>(false)
const modalBlock = ref<InstanceType<HTMLDivElement>>(null)
const cardsInfoBlock = ref<InstanceType<HTMLDivElement>>(null)

const store = useCardsStore()
const calculatePosition = () => {
  const card = modalBlock.value
  const cardRect = card.getBoundingClientRect()
  const parent = card.parentElement
  const parentRect = parent.getBoundingClientRect()
  const imgWrapper = card.querySelector('.image-wrapper')
  card.style.zIndex = 1

  const parentWidth = parent.offsetWidth
  const cardCenterX = cardRect.left + cardRect.width / 2
  const parentCenterX = parentRect.left + parentRect.width / 2
  const parentCenterY = window.innerHeight / 2

  const blockWidth = card.offsetWidth
  const translateX = (parentWidth - blockWidth) / 2
  const translateY = parentCenterY - parentRect.top - card.offsetTop + card.offsetHeight / 2

  const widthValuesCard = getComputedStyle(card).getPropertyValue('--scaleX-card').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const heightValuesCard = getComputedStyle(card).getPropertyValue('--scaleY-card').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const widthValuesImg = getComputedStyle(card).getPropertyValue('--scaleX-image').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const heightValuesImg = getComputedStyle(card).getPropertyValue('--scaleY-image').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)

  const scaleX_card = widthValuesCard[1]/widthValuesCard[2]
  const scaleY_card = heightValuesCard[1]/heightValuesCard[2]
  const scaleX_img = widthValuesImg[1]/widthValuesImg[2]
  const scaleY_img = heightValuesImg[1]/heightValuesImg[2]

  //таким образом мы обратно скалируем чилд элемент и применяем к нему свой модификатор скалирования
  imgWrapper.style.transform = `scale(${1/scaleX_card*scaleX_img}, ${1/scaleY_card*scaleY_img})`

  if (cardCenterX > parentCenterX) {
    card.style.transform = `translate(-${translateX}px, ${translateY}px) scale(${scaleX_card}, ${scaleY_card})`
  } else {
    card.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX_card}, ${scaleY_card})`
  }

}


function startAnimation(element: HTMLDivElement | null = null, direction: AnimationType) {
  const childDivs = cardsInfoBlock.value.querySelectorAll('div')
  let button
  const forward = direction==='forward'
  const speed = direction==='forward' ? 70 : 10

  if(element) {
    button = element?.querySelector('button')
    button.style.transition = '0.5s'
    setTimeout(() => {
      element.style.zIndex = '0'
      button.style.transition = ''
    }, speed * 50)
  }

  childDivs.forEach((div, index) => {
    setTimeout(() => {
      div.classList.remove(forward ? 'animate-reverse' : 'animate')
      div.classList.add(forward ? 'animate' : 'animate-reverse')
    }, index * speed)
  })
}

function handleClick(type: ButtonActionType, card: CardType) {
  if(type==='expand') {
    calculatePosition()
    startAnimation(null, 'forward')
    isExpanded.value = true

  } else if(type==='addToFav'){
    //порядок обязателен, так как после выполнения экшена addToFavorites, будет загрузка в localStorage
    card.is_favorite = true
    store.toggleFavorites(card, 'add')

  } else if(type==="delFromFav") {
    card.is_favorite = false
    store.toggleFavorites(card, 'delete')
  }
}
function closeExpandedCard() {
  modalBlock.value.style.transform = 'none'
  modalBlock.value.querySelector('.image-wrapper').style.transform = 'none'
  startAnimation(modalBlock.value, 'reverse')
  isExpanded.value = false
}


defineProps({
  card: {
    type: Object as PropType<CardType|DummyCard>,
    required: true
  }
})
</script>

<style lang="scss">
  .skeleton {
    width: 100%;
    height: 100%;
    background-color: #c0d3d3;
    animation: pulse-bg 1s infinite;
  }
  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 84px 32px;
  }
  .card {
    min-width: var(--card-width);
    min-height: var(--card-height);
    position: relative;
    transition: transform 0.3s ease-in-out;
    will-change: transform;

    &__content {
      display: flex;
      position: absolute;
      left: var(--base-unit2);
      bottom: 47.5px;
      gap: 32px;

      &-right {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-top: 100px;
      }
     }
    &__hidden-info {
      position: absolute;
      top: 110px;
      left: 0;
      min-width: 370px;
      display: flex;
      flex-direction: column;
      gap: calc((var(--base-unit)*0.5) / var(--scale-modifier));

      div {
        display: flex;
        opacity: 0;

        h4:first-child {
          min-width: 90px;
        }
      }
    }
  }
  .close-button {
    position: absolute;
    top: calc(var(--base-unit2) * 0.5);
    right: calc(var(--base-unit2) * 0.625);
  }
  .image-wrapper {
    width: var(--image-width);
    height: var(--image-height);
    transition: transform 0.3s ease-in-out;
    will-change: transform;
    overflow: hidden;
    //добавил, вроде лучше смотрится
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.4);
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .animated-button {
    will-change: transform;
    transition: transform 0.7s ease-in-out;
  }

  .move-down {
    transform: translate(-45px, 200px) scale(0.625);
    width: calc(var(--button-width) * 1.3);
  }
  .animate {
    animation: shiftDown 0.2s ease-out forwards;
  }
  .animate-reverse {
    animation: shiftUp 0.1s ease-in forwards;
  }
  .big-shadow {
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 1649px) {
    //стили для макета 1280
    .cards-wrapper {
      gap: 108px 20px;
    }
    .card__content {
      flex-direction: column;
      gap: 0;
      &-right {
        padding-top: var(--base-unit2);
      }
    }
  }
  @media (max-width: 1280px) {
    //стили для макета 1024
    .card__content {
      left: 69px;
    }
  }
  @media (max-width: 1024px) {
    //стили для макета 768
  }
  @media (max-width: 768px) {
    //стили для макета 320
    .cards-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .card__content {
      left: 59px;
    }
  }
</style>
