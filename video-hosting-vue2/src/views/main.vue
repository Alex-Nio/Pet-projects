<template>
  <div class="container" :class="{ active: active }">
    <div class="categories">
      <categoriesList
        :courseCategories="data.categories"
        :courses="data.course"
        @openContent="openTab"
        @click="changeTab(this.index, this.trigger)"
      ></categoriesList>
    </div>
    <transition
      :key="activeTab"
      mode="in-out"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div
        v-if="this.changed && this.data.activeTab === this.tabIndex"
        class="category-content"
      >
        <button @click="closeCategoryContent" class="close-category-content">
          <img src="../assets/img/close-icon.svg" alt="" />
        </button>
        <coursesList :courses="data.course" :index="index"></coursesList>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import jsonCategories from "@/assets/data/video_titles.json";
import categoriesList from "@/components/categoriesList";
import coursesList from "@/components/coursesList";

export default {
  data() {
    return {
      jsonCategories: jsonCategories,
      tabs: [],
      data: {
        categories: "",
        course: "",
      },
      Title: null,
      active: false,
      index: null,
      changed: false,
      tabIndex: null,
      activeTab: null,
      trigger: false,
    };
  },
  components: {
    categoriesList,
    coursesList,
  },
  mounted() {
    const data = JSON.parse(JSON.stringify(this.jsonCategories));
    var categories = Object.keys(data);
    var courses = Object.values(data);

    this.data.categories = categories;
    this.data.course = courses;
  },
  methods: {
    openTab(i) {
      let allTabs = document.querySelectorAll(".category-title");
      this.tabs = allTabs;

      this.tabs.forEach((tab, index) => {
        tab.classList.remove("active");
        if (index === i) {
          tab.classList.add("active");
        }
      });

      this.index = i;
      this.active = true;
      this.trigger = !this.trigger;
      this.changed = !this.changed;
    },
    changeTab(tabIndex, trigger) {
      this.tabIndex = tabIndex;
      this.data.activeTab = tabIndex;

      if (trigger) {
        this.changed = true;
      }

      this.trigger = !this.trigger;
    },
    closeCategoryContent() {
      this.changed = false;
      this.active = false;
      this.tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/imports.scss";
.container {
  &.active {
    @include fdcjs_aic;
    flex-direction: column-reverse;
    transition: all 0.5s linear;

    & .category-content {
      margin-top: 0;
    }

    & .categories {
      animation: fadeIn 1.5s linear;
    }
  }
}

.categories {
  @include fdrjc_aic;
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 35px;
  margin: 0 auto;
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);
}

.category-list {
  &__item {
    margin: 10px 0;
  }
}

.category-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.8rem;
  transition: all 0.3s linear;
  &:hover {
    cursor: pointer;
    color: blue;
    transition: all 0.3s linear;
  }
}

.category-content {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 35px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  // opacity: 0;
  // visibility: hidden;
  transition: all 0.5s linear;
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);

  // &.active {
  //   opacity: 1;
  //   visibility: visible;
  //   transition: all 0.5s linear;
  // }
}

.close-category-content {
  width: 30px;
  height: 30px;
  background: transparent;
  margin-left: calc(100% - 40px);
  cursor: pointer;
  & img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
