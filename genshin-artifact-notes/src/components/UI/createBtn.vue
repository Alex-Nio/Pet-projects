<template>
  <div class="btn-container">
    <button id="button" @click="handleClick"></button>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";

  const handleClick = function () {
    const btn = document.getElementById("button");
    btn.classList.add("onclic");
    setTimeout(function () {
      btn.classList.remove("onclic");
      btn.classList.add("validate");
      setTimeout(function () {
        btn.classList.remove("validate");
      }, 650);
    }, 1250);
  };

  onMounted(() => {
    const btn = document.getElementById("button");
    btn.addEventListener("click", handleClick);
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .btn-container {
    @include fdcjc_aic;
  }
  #button {
    font-family: $ff_R;
    font-size: 1.8rem;
    outline: none;
    height: 45px;
    text-align: center;
    width: 130px;
    background: $primary;
    border: 2px solid $white;
    color: $white;
    text-shadow: 0;
    cursor: pointer;
    transition: all 0.25s ease;
    &:hover {
      opacity: 0.8;
      background: $white;
      color: $black;
    }
    &:active {
      //letter-spacing: 2px;
      letter-spacing: 2px;
    }
    &:after {
      font-size: 2.2rem;
      content: "Добавить";
    }
  }
  #button.onclic {
    width: 45px;
    border-color: $secondary;
    border-radius: 42px;
    border-width: 3px;
    font-size: 0;
    background-color: transparent;
    border-left-color: red;
    animation: rotating 1s 0.25s linear infinite;

    &:after {
      content: "";
    }
  }
  #button.validate {
    max-width: 140px;
    position: relative;
    border-radius: 42px;
    font-size: 1.8rem;
    color: white;
    background: teal;
    &:after {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: url("@/assets/img/icons/selected-arrow-icon.svg") no-repeat center;
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
