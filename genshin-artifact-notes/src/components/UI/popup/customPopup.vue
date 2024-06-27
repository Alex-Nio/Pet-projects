<template>
  <div class="popup" v-if="show" @click.stop="closePopup">
    <div @click.stop class="popup__wrapper">
      <div class="popup-content">
        <slot></slot>
        <div class="popup-content__actions">
          <button class="close-popup-btn" @click="closePopup">
            <svg viewBox="0 0 20 20">
              <path
                fill="#000000"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(["update:show"]);
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  });
  const closePopup = () => {
    emit("update:show", false);
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  .popup {
    position: fixed;
    @include fdrjc_aic;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(#000, 0.6);

    &__wrapper {
      @include fdcjc_aic;
      position: relative;
      margin: 0 auto;
      background-color: $white;
      width: 600px;
      max-width: 75rem;
      min-height: 20rem;
      padding: 1rem;
      border-radius: 3px;
    }
  }
  .popup-content {
    width: 100%;
    text-align: center;

    &__actions {
      position: absolute;
      top: 0;
      right: 0;
      width: 56;
      height: 56px;
    }
  }

  .close-popup-btn {
    & svg {
      width: 100%;
      max-width: 36px;
      height: 36px;
    }
  }
</style>
