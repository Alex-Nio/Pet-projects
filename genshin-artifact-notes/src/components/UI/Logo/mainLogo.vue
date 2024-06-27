<template>
  <router-link to="/" class="logo">
    <img src="@/assets/img/main-logo.svg" alt="Logo" />
  </router-link>
</template>

<script setup></script>

<style lang="scss" scoped>
  .logo {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 160px;
    transform: translateY(-50%);
    z-index: 30;

    & > img {
      width: 125px;
      transition: width 0.3s ease-out;
    }
  }

  @media screen and (max-width: 1060px) {
    .logo {
      left: 20px;
    }
  }
</style>
