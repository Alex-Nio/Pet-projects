<template>
  <div class="root-folders" v-for="(folder, i) in this.courseRootFiles">
    <div @click="findIndex(i), openFolder(i, folder)">
      <p
        v-if="folder['Папка']"
        class="root-folders__item"
        :class="{
          active: active == i,
        }"
      >
        {{ folder["Папка"] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["courseRootFiles"],
  emits: ["find", "open"],
  data() {
    return {
      active: null,
    };
  },
  methods: {
    findIndex(i) {
      this.active = i;
      this.$emit("find", i);
    },
    openFolder(i, folder) {
      this.$emit("open", i, folder);
    },
  },
};
</script>

<style lang="scss" scoped>
.root-folders__item {
  font-size: 2.2rem;
  padding: 5px 0;

  &:hover {
    color: red;
    cursor: pointer;
  }

  &.active {
    color: red;
  }
}
</style>
