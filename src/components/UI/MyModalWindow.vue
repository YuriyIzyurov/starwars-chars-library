<template>
  <div class="modal" v-if="isVisible">
    <div @click.stop class="modal__content">
      <slot></slot>
      <my-styled-btn @click="emit('message', 1)">передать сообщение родителю</my-styled-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
/*import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: 'my-modal',
  mixins: [toggleMixin]
}*/
import {defineEmits, defineExpose, ref} from 'vue'

const isVisible = ref<boolean>(true)
const open = () => {
  isVisible.value = true
}
const close = () => {
  isVisible.value = false
}
const emit = defineEmits<{(e:'message', id:number):void}>()
defineExpose({ open, close })
</script>

<style scoped>
  .modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;

  }
  .modal__content {
    margin: auto;
    background-color: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
  }
</style>
