<template>
  <div class="input-wrap">
    <input :class="['border','border-small', {
    'input-wrap__paddingBig':name==='search',
    'input-wrap__paddingSmall':name==='email'
  }]"
           type="text"
           :placeholder="name==='search'?'Search character...':'Enter e-mail'"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           v-bind="$attrs">
    <SVG class="input-inside icon1" v-if="name==='search'" name="search"/>
    <div class="input-inside icon2 element-wrapper bg-purple-light border-small" :style="{paddingTop: 0}" v-if="name==='email'">
      <SVG name="email"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, defineProps} from "vue";
import SVG from "@/components/UI/SVG.vue";
import {InputType} from '@/types';


defineProps({
  name: {
    type: String as () => InputType,
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  }
})


</script>

<style scoped lang="scss">
  .input-wrap {
    position: relative;

    &__paddingBig {
      padding-left: calc(var(--base-unit) * 2);
    }
    &__paddingSmall {
      padding-left: calc(var(--base-unit) / 3);
    }
    //в макете верхний инпут 312 пикселей, нижний 324. Пусть оба будут 320
    input {
      width: var(--input-width);
      height: var(--input-height);
      font-weight: 300;
    }
  }
  .input-inside {
    position: absolute;
    top: calc(var(--base-unit) / 3);
  }
  .icon1 {
    left: calc(var(--base-unit) / 3);
  }
  //в макете отступы от иконкок в верхнем и нижнем инпуте разные, привел более менее к кратным величинам(4,8...24)
  .icon2 {
    left: calc(var(--input-width) - calc(var(--base-unit) / 3) - var(--base-unit));
  }
  @media (max-width: 1280px) {
    .input-inside {
      top: calc(var(--base-unit) / 4);
    }
  }
</style>
