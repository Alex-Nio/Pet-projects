<template>
  <div v-if="selectedTab === 'Tab 1'" class="content">Tab 1 Content</div>
  <div v-if="selectedTab === 'Tab 2'" class="content">Tab 2 Content</div>
  <div v-if="selectedTab === 'Tab 3'" class="content">Tab 3 Content</div>
</template>

<script>
export default {
  props: ["selectedTab", "tabs"],
};
</script>

<style lang="scss" scoped>
</style>
