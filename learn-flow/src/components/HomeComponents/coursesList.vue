<template>
  <!-- Категории курсов -->
  <courses-categories :courses="courses" @open="openCategory"></courses-categories>
  <!-- Курсы -->
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <course-content
      v-if="this.activeCategoryIndex !== null"
      :category="activeCategory"
      :categoryName="categoryName"
      :key="activeCategoryIndex"
    ></course-content>
  </transition>
</template>

<script>
import coursesCategories from "./coursesCategories.vue";
import courseContent from "./courseContent.vue";
export default {
  props: {
    courses: {
      type: Object,
      required: true,
    },
  },
  components: {
    coursesCategories,
    courseContent,
  },
  data() {
    return {
      showCategory: false,
      activeCategory: "",
      activeCategoryIndex: null,
      trigger: false,
      categoryName: "",
    };
  },
  methods: {
    openCategory(category, index) {
      this.activeCategoryIndex = index;
      this.activeCategory = category;
      this.trigger = true;
      this.categoryName = decodeURI(this.activeCategory[0]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
