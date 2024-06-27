<template>
  <div class="general-selection">
    <div class="general-selection__selector" @click="selectToggle()">
      <div
        class="general-selection__label"
        :class="{
          active: visible,
          disabled: selectValue === 'HP' || selectValue === 'Сила атаки',
        }"
      >
        <span class="general-selection__title">{{ selectValue }}</span>
      </div>
      <div :class="{ hidden: !visible, visible }">
        <ul class="general-selection__list">
          <li
            @click="handleMainStatSelection($event)"
            class="general-selection__list-item"
            :key="item"
            v-for="item in filteredMainStats"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  // imports
  import { ref, watch } from "vue";
  import data from "@/data/data";

  // settings
  const emit = defineEmits(["handleMainStatSelection", "generalSelectionDone"]);
  const props = defineProps({
    modelValue: {
      type: String,
    },
    mainTitle: {
      type: String,
    },
  });
  const selectValue = ref("HP");
  const visible = ref(false);
  const mainStats = ref(data.mainStats);
  let filteredMainStats = [];

  // Select visibility toggle
  const selectToggle = () => {
    if (selectValue.value == "HP" || selectValue.value == "Сила атаки") {
      visible.value = false;
    } else {
      visible.value = !visible.value;
    }
  };

  // Main Stat selection
  const handleMainStatSelection = (e) => {
    selectValue.value = e.target.innerText;
    emit("generalSelectionDone", selectValue.value);
  };

  const onSelectedChange = (newValue) => {
    // set default value
    if (newValue === "Цветок") {
      selectValue.value = "HP";
    } else if (newValue === "Перо") {
      selectValue.value = "Сила атаки";
    } else {
      selectValue.value = "Выберите верхний стат";
    }

    // Filtration function
    const filterMainStats = (newValue, mainStats) => {
      const currentFilters = data.filters[newValue] || [];
      return mainStats.filter((item) => !currentFilters.includes(item.value));
    };

    if (newValue) {
      filteredMainStats = filterMainStats(newValue, mainStats.value);
    }
  };

  watch(() => props.modelValue, onSelectedChange);

  // reset visibility watcher
  watch(
    () => [props.modelValue, props.mainTitle],
    () => {
      visible.value = false;
    }
  );
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  // Artifacts selection
  .general-selection {
    width: 100%;
    transition: all 0.3s linear;
    &__selector {
      cursor: pointer;
      background: transparent;
      position: relative;
      z-index: 1;

      & .general-selection__title {
        color: $white;
      }
    }

    &__label {
      position: relative;
      display: flex;
      font-family: $ff_R;
      font-style: normal;
      font-weight: 500;
      font-size: 2.2rem;
      line-height: 100%;
      color: $primary;
      background-color: $general-selection-default;
      padding: 10px 0;
      transition: all 0.3s linear;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: url("@/assets/img/icons/arrow-icon.svg") no-repeat center;
        transition: transform 0.3s linear;
      }

      &.active {
        color: $white;
        background: $general-selection-active;
        transition: all 0.3s linear;

        &:after {
          transform: translateY(-50%) scale(1, -1);
          transition: transform 0.3s linear;
        }

        & .general-selection__title {
          color: $white;
        }
      }

      &.disabled {
        cursor: not-allowed;
        background-color: $general-selection-disabled;
        color: $white;

        &:after {
          display: none;
        }
      }

      &:hover:not(.disabled) {
        color: $white;
        background: $general-selection-active;
        transition: all 0.3s linear;
      }

      &:hover img {
        opacity: 0.5;
        transition: all 0.3s linear;
      }
    }

    &__title {
      position: relative;
      margin-left: 11px;
    }

    &__list {
      width: 100%;
      list-style-type: none;
      padding: 24px 0;
      font-family: $ff_R;
      font-style: normal;
      font-weight: 400;
      font-size: 1.8rem;
      line-height: 100%;
      max-height: 180px;
      overflow-y: scroll;
      color: $primary;
      position: absolute;
      z-index: 35;
      background: #fff;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      &.disabled {
        display: none;
      }
    }

    &__list-item {
      padding: 15px 10px;
      color: $primary;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }

      &:hover {
        background: #fafafa;
      }
    }

    .current {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 120px;
        width: 10px;
        height: 7px;
        transform: translateY(-50%);
        background: url("@/assets/img/icons/selected-arrow-icon.svg") no-repeat center
          center / 10px 7px;
      }
    }
    .hidden {
      visibility: hidden;
    }
    .visible {
      visibility: visible;
      animation: fadeIn 0.2s linear;
    }
  }
</style>
