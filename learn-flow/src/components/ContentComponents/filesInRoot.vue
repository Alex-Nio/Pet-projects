<template>
  <div class="root-files">
    <div
      class="root-files__block"
      v-for="(folder, i) in this.inRootFiles"
      :class="{ active: this.activeIndex === i }"
    >
      <p
        class="root-files__item"
        @click="findIndex(i), sourceCreator(i, 'file'), setActiveIndex(i)"
      >
        {{ folder }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inRootFiles"],
  emits: ["find", "srcCreate"],
  data() {
    return {
      activeIndex: null,
    };
  },
  methods: {
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    findIndex(i) {
      this.$emit("find", i);
    },
    sourceCreator(i, marker) {
      this.$emit("srcCreate", i, marker);
    },
  },
};
</script>

<style lang="scss" scoped>
.root-files {
  width: 100%;
  grid-gap: 5px;
  font-size: 2.2rem;
  padding: 5px 0;

  &__block {
    &.active {
      color: red;
    }
  }
}

.root-files__item {
  &:hover {
    color: red;
    cursor: pointer;
  }
}
</style>
