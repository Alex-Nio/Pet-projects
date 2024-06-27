<template>
  <ul :class="mainClass">
    <selection-item
      @click="handleClick(i), handleKitSelection(item), handleTypeSelection(i)"
      v-for="(item, i) in items"
      :key="i"
      :class="i === selectedIndex ? activeClass : passiveClass"
    >
      <img
        v-if="item.images"
        class="selection-item__image"
        :key="item.images[0]"
        :src="
          require(`@/assets/img/artifacts${Object.values(item.images[0]).toString()}`)
        "
        loading="lazy"
      />
      <transition
        v-else
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        :duration="350"
      >
        <img
          class="selection-item__image"
          :key="item"
          :src="require(`@/assets/img/artifacts${Object.values(item).toString()}`)"
          loading="lazy"
        />
      </transition>
    </selection-item>
    <button class="show-more-btn" @click="showAllItems" v-if="showMoreButtonVisible">
      Показать все
    </button>
    <button class="hide-btn" @click="hideAllItems" v-if="!showMoreButtonVisible">
      Скрыть
    </button>
  </ul>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import selectionItem from "./selectionItem.vue";
  const props = defineProps({
    // 1. Главный класс
    mainClass: {
      type: String,
    },
    // 2. Класс активного
    activeClass: {
      type: String,
    },
    // 3. Класс дефолтного
    passiveClass: {
      type: String,
    },
    // 4. Перебираемый массив
    items: {
      type: Array || Object,
    },
  });

  const emit = defineEmits(["handleKitSelection", "handleTypeSelection"]);

  const selectedIndex = ref(0);

  const handleClick = (i) => {
    selectedIndex.value = i;
  };

  const handleKitSelection = (item) => {
    emit("handleKitSelection", item);
  };

  const handleTypeSelection = (index) => {
    emit("handleTypeSelection", index);
  };

  const showMoreButtonVisible = ref(true);

  const showAllItems = () => {
    const list = document.querySelector(".selection-list");
    list.style.maxHeight = "none";
    showMoreButtonVisible.value = false;
  };

  const hideAllItems = () => {
    const list = document.querySelector(".selection-list");
    list.style.maxHeight = "335px";
    showMoreButtonVisible.value = true;
  };

  // set first item to current
  onMounted(() => {
    handleClick(0);
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  $imageWidth: 82px;

  .selection-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax($imageWidth, 1fr));
    width: 100%;
    justify-content: start;
    align-items: center;
    justify-items: center;
    grid-gap: 5px 5px;
    border-radius: 12px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1.9px);
    -webkit-backdrop-filter: blur(1.9px);
    border: 1px solid rgba(255, 255, 255, 0.59);
  }

  .selection-item {
    display: inline-block;
    width: $imageWidth;
    max-width: $imageWidth;

    &__image {
      width: $imageWidth;
      transform: scale(1);
      transition: all 0.3s linear;
    }

    &.current {
      position: relative;

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(8, 8, 8, 0.24);
        border-radius: 5px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(4.9px);
        -webkit-backdrop-filter: blur(4.9px);
        border: 1px solid rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s linear;
      }

      & .selection-item__image {
        transform: scale(1.05);
        transition: all 0.2s linear;
      }
    }

    &:hover {
      cursor: pointer;

      & .selection-item__image {
        transform: scale(1.05);
        transition: all 0.2s linear;
      }
    }
  }

  .show-more-btn {
    display: none;
  }

  .hide-btn {
    display: none;
  }

  //! Types

  .types-list {
    display: grid;
    grid-template-rows: repeat(5, minmax($imageWidth, $imageWidth));
    justify-content: start;
    align-items: center;
    grid-gap: 5px 20px;
    border-radius: 5px;
    padding: 15px;
    margin: 0 20px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1.9px);
    -webkit-backdrop-filter: blur(1.9px);
    border: 1px solid rgba(255, 255, 255, 0.59);
    & .selection-item {
      display: inline-block;
    }

    &__item {
      &.current {
        position: relative;

        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $types-selected-before;
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(4.9px);
          -webkit-backdrop-filter: blur(4.9px);
          border: 1px solid $types-selected-before-border;
          animation: fadeIn 0.3s linear;
        }

        & .selection-item__image {
          transform: scale(1.15);
          transition: all 0.2s linear;
        }
      }

      &:hover {
        cursor: pointer;
        & .selection-item__image {
          transform: scale(1.15);
          transition: all 0.2s linear;
        }
      }
    }
  }
  .selection-item {
    &__image {
      display: inline-block;
      width: $imageWidth;
      height: $imageWidth;
      transform: scale(1);
      transition: all 0.3s linear;
    }
  }

  @media screen and (max-width: 991px) {
    .types-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 589px) {
    .selection-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax($imageWidth, 1fr));
      max-height: 335px;
      overflow-y: hidden;
      padding: 15px 15px 55px 15px;

      & .show-more-btn {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: $white;
        width: 100%;
        background-color: teal;
        padding: 15px 25px;
        position: absolute;
        bottom: 0px;
      }

      & .hide-btn {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: $white;
        background-color: teal;
        padding: 15px 10px;
        position: absolute;
        bottom: 0px;
        right: 0;
        border-top-left-radius: 12px;
      }
    }
  }
</style>
