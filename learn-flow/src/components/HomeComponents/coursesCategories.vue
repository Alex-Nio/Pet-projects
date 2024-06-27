<template>
  <swiper
    :direction="'vertical'"
    :slides-per-view="5"
    :centeredSlides="true"
    :spaceBetween="25"
    :loop="true"
    :mousewheel="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="slider"
  >
    <swiper-slide class="courses" v-for="(category, index) in this.courses.categories">
      <div
        @click="openCategory(category, index), slideToActiveSlide(index)"
        class="course-title"
      >
        {{ category[0] }}
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination } from "swiper";

export default {
  props: ["courses"],
  emits: ["open"],
  data() {
    return {
      activeSlideIndex: null,
      onSwiper: (swiper) => {
        let slides;

        // if (swiper) {
        //   slides = document.querySelectorAll(".swiper-slide");

        //   slides[swiper.activeIndex].lastElementChild.click();
        // }
      },
      onSlideChange: (swiper) => {
        let slides;

        if (swiper) {
          slides = document.querySelectorAll(".swiper-slide");

          slides[swiper.activeIndex].lastElementChild.click();
        }

        document.addEventListener("wheel", (event) => {
          // Move down / up wheel
          if (event.deltaY > 0) {
            swiper.slidePrev(800);
          } else {
            swiper.slideNext(800);
          }
        });
      },
      modules: [Mousewheel, Pagination],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    openCategory(category, index) {
      this.activeSlideIndex = index;
      this.$emit("open", category, index);
    },
    slideToActiveSlide(index) {
      const swiperElement = document.querySelector(".swiper");
      if (swiperElement) {
        const swiper = swiperElement.swiper;
        const w = swiper.slidesEl;
        swiper.slideToLoop(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$slider-max-height: 270px;

.slider {
  margin-bottom: 40px;
}

.course-title {
  font-size: 3.6rem;
  text-align: center;
  cursor: pointer;
}

.swiper {
  width: 100%;
  height: 100%;
  max-height: $slider-max-height;
  overflow: hidden !important;
  background: transparent;
}

.swiper-slide {
  text-align: center;
  max-height: $slider-max-height;
  font-size: 18px;
  color: rgba(164, 163, 164, 0.629);
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide-active {
  color: #000;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .course-title {
    font-size: 1.8rem;
  }

  .swiper {
    max-height: 346px;
  }
}
</style>
