<template>
  <div class="popup-content__items">
    <h3 class="popup-content__title">Добавлено!</h3>
    <h3 class="popup-content__text">Перейти к артефактам?</h3>
    <div class="popup-controls">
      <button
        @click="handlePageChange"
        class="popup-control-btn popup-control-btn--green"
      >
        Да
      </button>
      <button
        @click="handleCompleteAction"
        class="popup-control-btn popup-control-btn--red"
      >
        Нет
      </button>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(["handlePageChange", "handleCompleteAction"]);

  const handlePageChange = () => {
    emit("handlePageChange");
  };

  const handleCompleteAction = () => {
    emit("handleCompleteAction");
  };
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

  .popup-controls {
    @include fdrjc_aic;
    border-radius: 15px;
    width: 100%;
    padding: 20px;
  }
  .popup-control-btn {
    display: inline-flex;
    justify-content: center;
    width: 100%;
    max-width: 120px;
    padding: 15px 35px;
    margin: 0 10px;
    border-radius: 10px;
    font-family: $ff_R;
    font-size: 1.6rem;
    color: $white;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);

    transition: all 0.3s linear;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }

    &:hover {
      transform: scale(1.05);
      transition: all 0.3s linear;
    }

    &:active {
      color: $white;
      background-color: $popup-btn-active;
      transition: all 0.1s linear;
    }
  }
  .popup-control-btn--green {
    background-color: $popup-btn-submit;
  }
  .popup-control-btn--red {
    background-color: $popup-btn-declined;
  }
</style>
