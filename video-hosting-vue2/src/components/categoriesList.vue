<template>
  <ul class="categories-list">
    <li
      class="category-list__item"
      v-for="(category, i) in courseCategories"
      :key="category"
    >
      <h3 @click="openTab(i)" class="category-title">
        {{ category }}
      </h3>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["courseCategories"],
  methods: {
    openTab(i) {
      this.$emit("openContent", i);
    },
  },
};
</script>

<style lang="scss">
.categories-list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}

.category-title {
  &.active {
    color: red;
  }
}
</style>
