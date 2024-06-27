<template>
  <div class="full-wrapper">
    <Navigation :courses="courses"></Navigation>
    <main class="main">
      <div class="container">
        <div class="main-content">
          <router-view :courses="courses" :pageName="this.$route.params.pageName" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import coursesData from "@/assets/data/courses";
import Navigation from "./components/HomeComponents/navActions/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      courses: {
        categories: [],
        categoryTitles: [],
      },
    };
  },
  mounted() {
    const data = JSON.parse(JSON.stringify(coursesData));
    const courses = data["Курсы"];
    let coursesCategoryList = [],
      coursesCategoryTitles = [],
      lessonsList = [];

    courses.forEach((course) => {
      let x = Object.entries(course);
      coursesCategoryList.push(x[0]);
    });

    this.courses.categories = coursesCategoryList;

    this.courses.categories.forEach((category, i) => {
      coursesCategoryTitles.push(category[0]);
    });

    this.courses.categoryTitles = coursesCategoryTitles;
  },
};
</script>

<style lang="scss">
@import "./assets/scss/imports.scss";

.main-content {
  min-height: calc(100vh - 135px);
  max-height: calc(100vh - 135px);
}

.header {
  width: 100%;
  height: 80px;
}
.nav {
  @include fdrjs_aic;
  width: 100%;
  height: 100%;
  padding: 0 45px;
}
.nav-item {
  font-size: 1.8rem;
  font-weight: $b;
}
</style>
