<template>
  <ul class="navbar-list">
    <li v-for="link in menuLinks" :key="link.title" class="navbar-item" exact>
      <router-link
        v-if="
          (isLoggedIn && link.title == 'Главная') ||
          (isLoggedIn && link.title == 'Наборы') ||
          (isLoggedIn && link.title == 'Планирование')
        "
        class="navbar-link"
        :to="`${link.url}`"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
  <ul @click.stop class="registration-items">
    <li v-for="link in registrationItems" :key="link.url">
      <router-link
        v-if="!isLoggedIn && link.title !== 'Выйти'"
        class="registration-items__item"
        :to="`${link.url}`"
        >{{ link.title }}</router-link
      >
      <router-link
        v-if="isLoggedIn && link.title == 'Выйти'"
        class="registration-items__item"
        @click.stop="handleSignOut"
        :to="`${link.url}`"
        >{{ link.title }}</router-link
      >
    </li>
  </ul>
</template>

<script setup>
  // imports
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

  const router = useRouter();
  const isLoggedIn = ref(false);

  const menuLinks = [
    { title: "Главная", url: "/" },
    { title: "Наборы", url: "/kits" },
    // { title: "Планирование", url: "/planning" },
  ];

  const registrationItems = [
    { title: "Логин", url: "/login" },
    { title: "Регистрация", url: "/registration" },
    { title: "Выйти", url: "/registration" },
  ];

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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/registration");
    });
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  $active: #40c9a2;

  .navbar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  .navbar-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-family: $ff_C;
    color: $black;
    border-radius: 5px;
    padding: 5px 15px;

    &:hover {
      opacity: 1;
      color: $white;
      background-color: $black;
    }

    &.router-link-active {
      color: $white;
      background-color: $active;
      border-radius: 5px;
    }
  }

  .registration-items {
    &__item {
      color: $black;
    }
  }

  @media screen and (max-width: 768px) {
    .registration-items {
      flex-direction: column;
      align-items: center;
      position: relative;
      transform: none;
      top: unset;
      right: unset;
      height: calc(50% - 118px);
      & li {
        font-size: 2.8rem;
        margin: 5px auto;

        &:first-child {
          margin-right: auto;
        }
      }
    }

    .navbar-list {
      flex-direction: column;
      height: calc(50% - 118px);
      padding: 0 20px;
    }

    .navbar-item {
      width: 100%;
      margin: 15px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .navbar-link {
      width: 100%;
      max-width: 150px;
    }
  }
</style>
