<template>
  <div id="extra-container">
    <ul class="extra-checkboxes-list">
      <li
        v-for="dopStat in dopStats.filter((item) => item.value !== modelValue)"
        :class="{
          'extra-checkboxes-list__item': true,
          disabled: blocked && !dopStat.checked,
        }"
      >
        <input
          class="extra-checkboxes-list__input"
          type="checkbox"
          :id="dopStat.value"
          :value="dopStat.value"
          :disabled="blocked && !dopStat.checked"
          @change="checkboxToggle(dopStat)"
          v-model="dopStat.checked"
        /><label :for="dopStat.value" class="extra-checkboxes-list__label">{{
          dopStat.value
        }}</label>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import data from "@/data/data";
  import { ref, watch, onMounted } from "vue";

  const props = defineProps({
    modelValue: String,
    currentArtifact: String,
    kitSwitched: Boolean,
  });
  const emit = defineEmits(["currentDopStatsSelected"]);

  const dopStats = ref(data.dopStats);
  const blocked = ref(false);

  let currentDopStats = [];

  const checkboxToggle = (dopStat) => {
    currentDopStats.push(dopStat);

    if (dopStats.value.filter((item) => item.checked).length === 4) {
      blocked.value = true;
    } else {
      blocked.value = false;
    }

    if (currentDopStats.length === 4) {
      emit("currentDopStatsSelected", currentDopStats);
      currentDopStats = [];
    }
  };

  // reset all checkboxes to their default values
  watch(
    () => [props.modelValue, props.currentArtifact, props.kitSwitched],
    () => {
      if (props.modelValue === "Выберите верхний стат") {
        blocked.value = true;
      } else {
        blocked.value = false;
      }

      // if (props.kitSwitched || !props.kitSwitched) {
      //   console.log("kit was swithed");
      // }

      dopStats.value.forEach((value) => {
        value.checked = false;
      });
    }
  );

  onMounted(() => {
    dopStats.value.forEach((value) => {
      value.checked = false;
    });
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  #extra-container {
    position: relative;
    display: flex;
    width: 100%;
  }
  .extra-checkboxes-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    list-style: none;
    &__item {
      display: inline-flex;
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &__input {
      position: absolute;
      opacity: 0;
      & + .extra-checkboxes-list__label {
        transition: all 0.2s;
      }

      &:hover {
        & + .extra-checkboxes-list__label {
          border: 2px solid $checkbox-base-color;
          background-color: $checkbox-base-color;
          color: #fff;
          transition: all 0.2s;
        }
      }

      &:checked {
        & + .extra-checkboxes-list__label {
          border: $checkbox-checked-border;
          background-color: $checkbox-checked-background;
          color: #fff;
          transition: all 0.2s;

          &::before {
            content: "";
            width: 14px;
            height: 14px;
            background: url("@/assets/img/icons/close-icon.png") no-repeat center / 14px
              14px;
            transform: rotate(-360deg);
            transition: transform 0.3s ease-in-out;
          }
        }
      }

      &:disabled {
        & + .extra-checkboxes-list__label {
          background-color: $checkbox-disabled-background;
        }
      }
    }

    &__label {
      background-color: $checkbox-background;
      border: $checkbox-border;
      color: $primary;
      border-radius: 25px;
      white-space: nowrap;
      margin: 3px 0px;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition: all 0.2s;
      font-family: $ff_R;
      font-weight: $m;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      padding: 6px 12px 6px 2px;
      cursor: pointer;

      &::before {
        display: inline-block;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        padding: 0px 6px 2px 0px;
        content: "";
        width: 14px;
        height: 14px;
        background: url("@/assets/img/icons/checkbox-arrow.svg") no-repeat center / 14px
          14px;
        transition: transform 0.3s ease-in-out;
      }
    }
  }
</style>
