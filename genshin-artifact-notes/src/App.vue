<template>
  <div class="full-wrapper">
    <header :class="{ 'header-scroll': isScrolled }">
      <div class="navbar">
        <div class="navbar-content">
          <div v-if="isLoggedIn || !isLoggedIn" class="navbar-actions">
            <button
              @click="toggleMenu"
              class="burger-btn"
              :class="{ active: showMenu }"
            ></button>
          </div>
          <main-logo></main-logo>
          <div
            @click="toggleMenu"
            class="navbar-list__wrapper"
            :class="{ active: showMenu }"
          >
            <navigation-list></navigation-list>
          </div>
        </div>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
  <fullsize-background :class="{ 'bg-scroll': isScrolled }"></fullsize-background>
  <main-footer></main-footer>
</template>

<script setup>
  import { defineAsyncComponent, ref, onMounted, onUnmounted } from "vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import navigationList from "@/components/header/navigationList.vue";
  import mainLogo from "@/components/UI/Logo/mainLogo.vue";
  // import mobileLogo from "@/components/UI/Logo/mobileLogo.vue";
  import mainFooter from "@/components/footer/mainFooter.vue";
  const fullsizeBackground = defineAsyncComponent(() =>
    import("@/components/UI/fullsizeBackground.vue")
  );

  const showMenu = ref(false);
  const isLoggedIn = ref(false);
  let auth = getAuth();

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });
  });

  const toggleMenu = () => {
    if (window.innerWidth <= 991) {
      showMenu.value = !showMenu.value;
      document.body.classList.toggle("no-scroll", showMenu.value);
    }
  };

  // Header scroll
  const isScrolled = ref(false);

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      isScrolled.value = true;
    } else {
      isScrolled.value = false;
    }
  };
</script>

<style lang="scss">
  @import "@/assets/scss/imports.scss";

  .main-content {
    // position: relative;
    margin-top: 145px;
    transition: all 0.3 ease-out;
  }

  header {
    position: fixed;
    width: 100%;
    z-index: 45;
  }

  .header-scroll {
    position: fixed;
    width: 100%;
    z-index: 45;
    transition: padding 0.5s ease-out;

    & .navbar-content {
      padding: 15px 0;
      transition: all 0.5s ease-out;
    }

    & .navbar-content {
      &:before,
      &::after {
        opacity: 0;
        transition: all 0.4s ease-in;
      }

      &:before {
        left: 100%;
      }

      &:after {
        right: 100%;
      }
    }

    & .logo > img {
      width: 75px;
      transition: width 0.3s ease-out;
    }
  }

  .navbar {
    position: relative;
    width: 100%;
    background-color: $white;
    &:before {
      content: "";
      position: absolute;
      opacity: 0.35;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("@/assets/img/menu-bg.jpeg") no-repeat center center / cover;
    }
  }

  .navbar-content {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    padding: 45px 0;
    transition: padding 0.5s ease-out;
    z-index: 55;

    &:before,
    &:after {
      content: "";
      position: absolute;
      opacity: 1;
      bottom: 5px;
      width: 20vw;
      border-bottom: 4px solid #664147;
      transition: all 0.5s linear;
    }
    &:before {
      left: 100px;
    }

    &:after {
      right: 100px;
    }
  }
  .navbar-actions {
    display: none;
  }
  .burger-btn {
    display: none;
  }
  .navbar-list {
    @include fdrjc_aic;
    height: 28px;
  }
  .registration-items {
    @include fdrjc_aic;
    position: absolute;
    top: 50%;
    right: 120px;
    transform: translateY(-50%);

    & li {
      &:first-child {
        margin-right: 15px;
      }
    }

    &__item {
    }
  }

  @media screen and (max-width: 1060px) {
    .navbar-content {
      &:before,
      &:after {
        display: none;
      }
    }

    .registration-items {
      right: 40px;
    }
  }

  @media screen and (max-width: 768px) {
    .navbar-list__wrapper {
      display: none;
      position: absolute;
      flex-direction: column;
      height: 100vh;
      background: white;
      width: 100vw;
      top: 100%;
      right: 0;

      &.active {
        display: flex;
        animation: fadeIn 0.3s linear;
      }
    }

    .navbar-actions {
      position: relative;
      display: flex;
      height: 23px;
    }
    .burger-btn {
      display: inline-flex;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      width: 48px;
      height: 48px;
      z-index: 70;

      &::before {
        content: "";
        position: absolute;
        width: 48px;
        height: 48px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("@/assets/img/icons/burger-bg.svg") no-repeat center / contain;
      }

      &::after {
        content: "";
        position: absolute;
        width: 48px;
        height: 48px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("@/assets/img/icons/burger-main.svg") no-repeat center / contain;
      }

      &.active {
        &::after {
          content: "";
          position: absolute;
          width: 48px;
          height: 48px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: rotate(360deg);
          transition: all 2s linear;
        }
      }
    }
  }
</style>
