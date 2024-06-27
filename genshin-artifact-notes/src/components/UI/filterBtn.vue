<template>
  <button @click="click" class="filter-btn" :class="class" v-bind="$attrs">
    {{ value }}
  </button>
</template>

<script setup>
  const props = defineProps({
    value: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      default: "",
    },
    click: Function,
  });
</script>

<style lang="scss" scoped></style>
