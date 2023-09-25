<template>
  <div class="empty-image-wrapper">
    <img src="../assets/empty.jpg" alt="">
    <h1>GALLERY</h1>
  </div>
</template>

<style scoped lang="scss">
.empty-image-wrapper {
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h1 {
    position: absolute;
    top: 100px;
    left: 100px;
  }
}
</style>
