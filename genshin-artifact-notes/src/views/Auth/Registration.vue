<template>
  <section id="registration">
    <div class="container">
      <h2 class="section-title">Регистрация</h2>
      <div class="form-container">
        <div class="form-container__wrapper">
          <auth-form @authError="authError"></auth-form>
        </div>
      </div>
    </div>
    <custom-popup v-model:show="popupVisible">
      <popup-error v-if="popupVisible" :error="error"></popup-error>
    </custom-popup>
  </section>
</template>

<script setup>
  // imports
  import { ref } from "vue";
  import authForm from "@/components/UI/authForm/authForm.vue";
  import customPopup from "@/components/UI/popup/customPopup.vue";
  import popupError from "@/components/UI/popup/popupError.vue";

  const popupVisible = ref(false);
  const error = "Такой пользователь уже зарегистрирован";

  const authError = () => {
    popupVisible.value = true;
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .section-title {
    font-size: 6.2rem;
    margin: 45px 0;
  }

  @media screen and (max-width: 876px) {
    .section-title {
      text-align: center;
    }
    .form-container {
      @include fdrjc_aic;
    }
  }

  @media screen and (max-width: 378px) {
    .section-title {
      font-size: 3.6rem;
      text-align: center;
    }
  }
</style>
