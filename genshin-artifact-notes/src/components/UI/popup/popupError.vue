<template>
  <div class="popup-content__items">
    <h3 class="popup-content__title">Ошибка!</h3>
    <p class="popup-content__text">{{ error }}</p>
  </div>
</template>

<script setup>
  const props = defineProps({
    error: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  .popup-content {
    &__items {
      width: 100%;
    }

    &__title {
      font-family: $ff_R;
      font-size: 3rem;
      color: $primary;
      margin-bottom: 20px;
    }

    &__text {
      font-family: $ff_R;
      font-size: 2.2rem;
      color: $primary;
    }
  }
</style>
