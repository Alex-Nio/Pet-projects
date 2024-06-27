<template>
  <div class="actions-panel">
    <div class="container">
      <div class="actions-panel__wrapper">
        <h1 class="notes-title">Отслеживаемые наборы:</h1>
        <div class="actions-panel__actions">
          <button class="go-back-btn" @click="handleClick">Вернуться</button>
          <!-- TODO:Добавить сортировку -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // imports
  import { ref, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  // import filterBtn from "@/components/UI/filterBtn.vue";

  // Emits
  const emit = defineEmits(["filterToggle"]);
  const router = useRouter();

  // Props
  // const props = defineProps({
  //   activeFilter: {
  //     type: String,
  //     required: true,
  //   },
  // });
  // Filter btns
  const buttons = [
    {
      value: "Текущие",
      filter: "active",
      handler: () => {
        emit("filterToggle", "active");
      },
    },
    {
      value: "Завершенные",
      filter: "completed",
      handler: () => {
        emit("filterToggle", "completed");
      },
    },
    {
      value: "Все",
      filter: "all",
      handler: () => {
        emit("filterToggle", "all");
      },
    },
  ];

  const mobileView = ref(false);
  const showBtns = ref(true);

  const showActions = () => {
    showBtns.value = !showBtns.value;
    mobileView.value = !mobileView.value;
  };

  const handleClick = () => {
    if (router.currentRoute.value.path == "/kits") {
      router.push("/");
    } else {
      router.push("/kits");
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 461) {
      mobileView.value = true;
      showBtns.value = false;
    } else {
      mobileView.value = false;
      showBtns.value = true;
    }
  };

  onMounted(() => {
    if (window.innerWidth <= 461) {
      mobileView.value = true;
      showBtns.value = false;
    }

    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .actions-panel {
    @include fdrjc_aic;
    width: 100%;
    padding: 25px 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1.9px);
    -webkit-backdrop-filter: blur(1.9px);
    border: 1px solid rgba(255, 255, 255, 0.59);
    &__wrapper {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
    }

    &__toggle {
      display: none;
    }
  }

  .notes-title {
    color: $white;
    font-size: 2.8rem;
    margin-bottom: 15px;
  }

  .filter-btn,
  .go-back-btn {
    display: inline-block;
    width: 100%;
    max-width: fit-content;
    margin: 5px 10px;
    color: $white;
    background-color: $black;
    padding: 10px 25px;
    border-radius: 30px;
    font-size: 1.8rem;
    text-transform: uppercase;
    transition: all 0.3s linear;
    &.active {
      background-color: teal;
      transition: all 0.3s linear;
    }

    &:hover {
      background-color: $btn-back;
      transition: all 0.3s linear;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 461px) {
    .actions-panel__toggle {
      display: flex;
      color: $white;
      font-size: 3rem;
      margin-bottom: 20px;
    }
    .notes__btns {
      flex-direction: column;
      align-items: flex-start;
    }

    .filter-btn {
      margin: 5px 0;
    }
  }
</style>
