<template>
  <div class="container">
    <div class="course__wrapper">
      <h1 class="course-title">{{ Title }}</h1>
      <div class="content">
        <CourseContentList></CourseContentList>
      </div>
      <scroll-top-btn @click="scrollTop" class="scroll-top-btn"
        >Наверх</scroll-top-btn
      >
    </div>
  </div>
</template>

<script>
import CourseContentList from "@/components/CourseContentList";
import ScrollTopBtn from "@/components/ScrollTopBtn";
export default {
  components: {
    CourseContentList,
    ScrollTopBtn,
  },
  data() {
    return {
      Title: "Курсы",
    };
  },
  mounted() {
    let title = this.$route.params.Title;
    this.Title = title;
  },
  methods: {
    scrollTop() {
      var scrollStep = -window.scrollY / (200 / 15),
        scrollInterval = setInterval(function () {
          if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
          } else clearInterval(scrollInterval);
        }, 15);
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/imports.scss";
.content {
  @include fdcjc_aic;
  position: relative;
  margin: 35px 0;
}
.course-title {
  font-size: 3rem;
  text-align: center;
}

.scroll-top-btn {
  position: fixed;
  bottom: 60px;
  right: 70px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  max-width: 120px;
  padding: 15px 25px;
  font-size: 1.4rem;
  text-transform: uppercase;
  background: $white;
  border: 1px solid teal;
  border-radius: 1rem;
  color: teal;
  transition: all 0.5s linear;

  &:hover {
    background: #46c5b0;
    color: #000;
    transition: all 0.5s linear;
  }

  &:active {
    background: #46c5b0;
    color: #000;
  }
}
</style>
