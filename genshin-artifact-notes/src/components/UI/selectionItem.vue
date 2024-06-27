<template>
  <li :class="class">
    <slot></slot>
  </li>
</template>

<script setup>
  const props = defineProps({
    class: {
      type: String,
    },
  });
</script>

<style lang="scss" scoped></style>
