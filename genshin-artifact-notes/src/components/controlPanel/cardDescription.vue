<template>
  <div class="card-description">
    <div class="card-description__top">
      <div class="dungeon-description">
        <div
          v-if="currentKit.location.image.length > 0"
          class="dungeon-description__preview"
        >
          <img
            class="dungeon-description__image"
            :src="require(`@/assets/img/dungeons${currentKit.location.image}`)"
            alt=""
          />
        </div>
        <p v-if="currentKit.location.image.length > 0" class="dungeon-description__text">
          <strong>Где достать:</strong> {{ currentKit.location.name }}
        </p>
        <p v-else class="dungeon-description__text" style="margin-top: 0px">
          <strong>Где достать:</strong> Дроп с Ворлд боссов
        </p>
      </div>
    </div>
    <div class="card-description__center">
      <div class="kit-description">
        <p class="kit-description__title">{{ currentKitTitle }}</p>
        <span class="kit-description__type">
          Тип артефакта: <strong>{{ currentKitType }}</strong>
        </span>
        <div class="kit-description__bonuses">
          <ul class="bonuses-list">
            <li id="bonusX2" class="bonuses-list__item">
              {{ currentKit.bonusX2 }}
            </li>
            <li
              id="bonusX4"
              class="bonuses-list__item"
              :class="{ 'text-clamp': !readMore, 'full-text': readMore }"
            >
              {{ currentKit.bonusX4 }}
            </li>
            <button
              v-if="isTextTooLong"
              class="read-more-btn"
              @click="readMore = !readMore"
            >
              Читать далее
            </button>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-description__bottom">
      <div class="actions">
        <create-btn @click="createNote"></create-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
  // imports
  import { watch, ref, computed } from "vue";
  import createBtn from "@/components/UI/createBtn.vue";

  // props
  const props = defineProps({
    currentKitTitle: {
      type: String,
    },
    currentKitType: {
      type: String,
    },
    currentKit: {
      type: Object,
    },
  });

  // emits
  const emit = defineEmits(["createNote"]);

  const createNote = () => {
    emit("createNote");
  };

  const readMore = ref(false);

  // computed property to calculate the length of bonusX4 text
  const isTextTooLong = computed(() => {
    const bonusX4Text = props.currentKit.bonusX4 || "";
    return bonusX4Text.split(" ").length >= 26;
  });

  watch(
    () => [props.currentKit],
    () => {
      readMore.value = false;
    }
  );
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .card-description {
    width: 100%;

    &__top {
      @include fdcjc_ais;
      padding: 15px;
      margin-bottom: 5px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.9px);
      -webkit-backdrop-filter: blur(1.9px);
      border: 1px solid rgba(255, 255, 255, 0.59);
      color: $white;
      border-radius: 5px;
    }

    &__center {
      @include fdcjc_ais;
      padding: 15px;
      margin-bottom: 5px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.9px);
      -webkit-backdrop-filter: blur(1.9px);
      border: 1px solid rgba(255, 255, 255, 0.59);
      color: $white;
      border-radius: 5px;
    }

    &__bottom {
      position: relative;
      @include fdcjc_ais;
      padding: 12px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.9px);
      -webkit-backdrop-filter: blur(1.9px);
      border: 1px solid rgba(255, 255, 255, 0.59);
      color: $white;
      border-radius: 5px;
    }
  }
  .dungeon-description {
    &__preview {
      position: relative;
      width: 100%;
    }

    &__image {
      object-fit: cover;
      width: 800px;
      height: 200px;
      background: $black;
      margin: 0 auto;
      border-radius: 5px;
    }

    &__text {
      font-size: 1.8rem;
      margin-top: 20px;
    }
  }
  .kit-description {
    &__title {
      font-family: $ff_C;
      font-weight: $b;
      font-size: 2.6rem;
      margin-bottom: 10px;
    }

    &__type {
      font-size: 2.2rem;
      margin-bottom: 5px;
      padding: 5px 10px;
      background-color: teal;
      color: $white;
    }

    &__bonuses {
      margin: 10px 0;
    }
  }

  #bonusX2,
  #bonusX4 {
    position: relative;

    &::before {
      position: absolute;
      left: 5px;
      top: 0;
      color: $white;
      font-family: $ff_R;
      font-size: 1.4rem;
      padding: 3px;
      background-color: teal;
      border-radius: 12px;
      transform: rotate(-15deg);
    }
  }

  #bonusX2 {
    &:before {
      content: "x2";
    }
  }

  #bonusX4 {
    &:before {
      content: "x4";
    }
  }

  .bonuses-list {
    &__item {
      font-size: 1.6rem;
      margin: 10px 0;
      padding: 0 5px 0 30px;
      line-height: 1.2;
      &.full-text {
        display: block;
        -webkit-line-clamp: none;
        -webkit-box-orient: inherit;
        overflow: hidden;
      }

      &.text-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 55px;
  }

  .read-more-btn {
    color: $white;
    font-weight: bold;
    position: relative;
    transition: all 0.3s linear;
    &:hover {
      color: $form-focus-color;
      transition: all 0.3s linear;
      &::before {
        border-bottom: 1px solid $form-focus-color;
        transition: all 0.3s linear;
      }
    }
    &::before {
      content: "";
      position: absolute;
      border-bottom: 1px solid #fff;
      bottom: -3px;
      left: 0;
      width: 100%;
      transition: all 0.3s linear;
    }
  }
</style>
