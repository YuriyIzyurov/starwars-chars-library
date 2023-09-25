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
      <div class="card__content-info">
        <h2 v-if="card.name">{{ card.name }}</h2>
        <h2 v-else class="skeleton border-small">Loading...</h2>
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
            <h4 v-else class="skeleton skeleton-films border-small">Loading...</h4>
          </div>
        </div>
        <Button
            :class="['animated-button', isExpanded && 'move-down']"
            @click="handleClick(isExpanded ? card.is_favorite ? 'delFromFav' : 'addToFav' : 'expand', card)"
            :disabled="!card.name"
            :icon="isExpanded && SVG"
        >
          {{ isExpanded ? card.is_favorite ? 'Unfavorite' : 'Add to favorite' : 'Learn more' }}
        </Button>
      </div>
    </div>
  </div>
</template>


<script setup>
import {defineProps, ref} from "vue";
import SVG from "@/components/UI/SVG.vue";
import Button from "@/components/UI/StyledButton.vue";
import {useCardsStore} from "@/store";


const isExpanded = ref(false)
const modalBlock = ref(null)
const cardsInfoBlock = ref(null)

const store = useCardsStore()
const calculatePosition = () => {
  //тут будет алгоритм нахождения позиции, куда карточка будет перемещаться, должна попасть в центр вьюпорта
  //также будут пересчитаны модификаторы скалирования  в соответствии с шириной экрана,
  //так как родительский и дочерние элементы скалируются по разным модификаторам
  //можно сделать лучше, но не хочу тратить на это много времени
  const card = modalBlock.value
  const cardRect = card.getBoundingClientRect()
  const parent = card.parentElement
  const parentRect = parent.getBoundingClientRect()
  //для ускорения и простоты получим доступ к элементам таким образом
  const imgWrapper = card.querySelector('.image-wrapper')
  const infoWrapper = card.querySelector('.card__content-info')
  card.style.zIndex = 1

  const parentWidth = parent.offsetWidth
  const cardCenterX = cardRect.left + cardRect.width / 2
  const parentCenterX = parentRect.left + parentRect.width / 2
  const parentCenterY = window.innerHeight / 2

  const blockWidth = card.offsetWidth


  const widthValuesCard = getComputedStyle(card).getPropertyValue('--scaleX-card').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const heightValuesCard = getComputedStyle(card).getPropertyValue('--scaleY-card').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const widthValuesImg = getComputedStyle(card).getPropertyValue('--scaleX-image').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)
  const heightValuesImg = getComputedStyle(card).getPropertyValue('--scaleY-image').match(/calc\(([\d.]+)px\/([\d.]+)px\)/)

  const scaleX_card = widthValuesCard[1]/widthValuesCard[2]
  const scaleY_card = heightValuesCard[1]/heightValuesCard[2]
  const scaleX_img = widthValuesImg[1]/widthValuesImg[2]
  const scaleY_img = heightValuesImg[1]/heightValuesImg[2]

  const [screen, divisionRatio] = useDeterminateScreen(scaleY_card)

  const translateX = (parentWidth - blockWidth) / 2
  const translateY = parentCenterY - parentRect.top - card.offsetTop + card.offsetHeight / divisionRatio


 //захардкодим величины X,Y смещения на глаз для ускореня разработки, а также модификатор 1.6 для текста под любой размер экрана
  if(screen==='isLargeTablet') {
    imgWrapper.style.transform = `translate(-80px, 0) scale(${1/scaleX_card * scaleX_img}, ${1/scaleY_card * scaleY_img})`
    infoWrapper.style.transform = `translate(150px, -350px) scale(${1/scaleX_card * 1.6}, ${1/scaleY_card * 1.6})`
    infoWrapper.style.gap = 0
  }
  if(screen==='isTablet') {
    imgWrapper.style.transform = `translate(-95px, -30px) scale(${1/scaleX_card * scaleX_img}, ${1/scaleY_card * scaleY_img})`
    infoWrapper.style.transform = `translate(-40px, -128px) scale(${1/scaleX_card * 1.6}, ${1/scaleY_card * 1.6})`
  }
  if(screen==='isTabletVertical') {
    imgWrapper.style.transform = `translate(3px, -17px) scale(${1/scaleX_card * scaleX_img}, ${1/scaleY_card * scaleY_img})`
    infoWrapper.style.transform = `translate(-40px, -97px) scale(${1/scaleX_card * 1.6}, ${1/scaleY_card * 1.6})`
  }

  if(screen==='isMobile') {
    imgWrapper.style.transform = `translate(0px, -60px) scale(${1/scaleX_card * scaleX_img}, ${1/scaleY_card * scaleY_img})`
    infoWrapper.style.transform = `translate(11px, -128px) scale(${1/scaleX_card * 1.6}, ${1/scaleY_card * 1.6})`
  }

  if (cardCenterX > parentCenterX) {
    card.style.transform = `translate(-${window.innerWidth > 645 ? translateX : 0}px, ${translateY}px) scale(${scaleX_card}, ${scaleY_card})`
  } else {
    card.style.transform = `translate(${window.innerWidth > 645 ? translateX : 0}px, ${translateY}px) scale(${scaleX_card}, ${scaleY_card})`
  }

}


function startAnimation(element = null, direction) {
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
function useDeterminateScreen(ratio) {
  //можно придумать лучше, но пока на глаз для простоты
  return  ratio > 1.8
      ? ['isTabletVertical', 2.5]
      : ratio > 1.65
          ? ['isMaxScreen', 2]
          : ratio > 1.5
              ? ['isTablet', 4]
              : ratio > 1.1
                  ? ['isMobile', 2.5]
                  : ratio > 0.9
                      ? ['isLargeTablet', 8] : ['isTablet', 5]
}

function handleClick(type, card) {
  if(type==='expand') {
    if(store.cardIsExpanded) return
    calculatePosition()
    startAnimation(null, 'forward')
    isExpanded.value = true
    store.cardIsExpanded = true

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
  //todo: по-хорошему инкапсулировать,переделать алгоритм и вывести в отдельный хук, но нет времени и пусть будет вот так по-уродски
  modalBlock.value.style.transform = 'none'
  modalBlock.value.querySelector('.image-wrapper').style.transform = 'none'
  const cardContent = modalBlock.value.querySelector('.card__content-info')
  cardContent.style.transform = 'none'
  cardContent.style.gap = '24px'
  startAnimation(modalBlock.value, 'reverse')
  isExpanded.value = false
  store.cardIsExpanded = false
}


defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
  .skeleton {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    background-color: #333b3b;
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

      &-info {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-top: 100px;
        transition: transform 0.3s ease-in-out;
        will-change: transform;
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
    z-index: 10;
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
    .cards-wrapper {
      gap: 108px 20px;
    }
    .card__content {
      flex-direction: column;
      gap: 0;

      &-info {
        padding-top: var(--base-unit2);
      }
    }
    .card__hidden-info {
      top: 50px;
      min-width: 300px;
    }
    .close-button {
      transform: scale(0.8, 1.3);
    }
  }
  @media (max-width: 1280px) {
    .card__content {
      left: 69px;
    }
    .close-button {
      transform: scale(1, 1);
    }
    .move-down {
      transform: translate(-45px, 165px) scale(0.625);
    }
  }
  @media (max-width: 1024px) {
    .card__hidden-info {
      top: 50px;
      min-width: 270px;
    }
    .move-down {
      transform: translate(-41px, 175px) scale(0.625);
    }
  }
  @media (max-width: 768px) {
    .cards-wrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .card__content {
      left: 59px;
    }
    .card__hidden-info {
      gap: 0;
      top: 28px;
      min-width: 170px;
    }
    .card__hidden-info div:not(:last-child) h4:first-child {
      min-width: 60px;
    }
    .card__hidden-info div:last-child h4:first-child {
      min-width: 35px;
    }
    .move-down {
      transform: translate(-7px, 117px) scale(0.66, 0.625);
    }
    .close-button {
      transform: translate(6px, -10px) scale(1.2, 1);
    }
    .skeleton-films {
      width: 100px;
    }
  }
</style>
