<template>
  <courses-list :courses="this.courses"></courses-list>
</template>

<script>
import coursesList from "@/components/HomeComponents/coursesList.vue";

export default {
  components: {
    coursesList,
  },
  props: {
    courses: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
