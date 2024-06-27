<template>
  <header class="header">
    <nav class="nav">
      <router-link class="nav-item" to="/">
        <span>На главную</span>
        <img src="../../../assets/img/home.png" alt="" />
      </router-link>
      <nav-search
        :courses="courses"
        v-model:searchQuery="searchQuery"
        @update:searchQuery="updateSearchQuery"
        :filteredItems="filteredItems"
      ></nav-search>
    </nav>
  </header>
</template>

<script>
import navSearch from "@/components/HomeComponents/navActions/navSearch";
export default {
  props: ["courses"],
  data() {
    return {
      searchQuery: "",
    };
  },
  components: {
    navSearch,
  },
  methods: {
    updateSearchQuery(value) {
      this.searchQuery = value;
    },
  },
  computed: {
    filteredItems() {
      let items = this.courses.categoryTitles;

      return items.filter((item) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
}
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    margin-right: 5px;
  }

  & img {
    width: 46px;
    height: 46px;
    padding-bottom: 4px;
  }

  &:hover {
    color: #ee9b00;
  }
}
</style>
