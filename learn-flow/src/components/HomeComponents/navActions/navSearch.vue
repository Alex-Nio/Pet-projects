<template>
  <div class="search">
    <div class="search-box">
      <div class="search-block">
        <label for="search"></label>
        <input
          :value="searchQuery"
          @input="updateSearchQuery"
          class="search-input"
          id="search"
          name="search"
          type="search"
          placeholder="Найти"
        />
        <button type="submit" class="searchButton">
          <img src="../../../assets/img/search-btn.gif" alt="" />
        </button>
      </div>
      <p class="search-title">Искать:</p>
      <div class="search-field">
        <label for="lesson-checkbox">Урок</label>
        <input
          type="checkbox"
          class="search-lesson-checkbox"
          name="lesson-checkbox"
          id="category-checkbox"
        />
      </div>
      <div class="search-field">
        <label for="category-checkbox">Курс</label>
        <input
          type="checkbox"
          class="search-category-checkbox"
          name="category-checkbox"
          id="category-checkbox"
        />
      </div>
    </div>
  </div>
  <!-- <div v-if="searchQuery.length" class="search-result-wrapper">
    <div class="search-result" v-for="item in filteredItems.slice(0, 2)" :key="item">
      <div class="search-result-item">
        <a>{{ item }}</a>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: ["searchQuery", "courses", "filteredItems"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    updateSearchQuery(event) {
      this.$emit("update:searchQuery", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/imports.scss";
.search {
  width: 100%;
  max-width: 610px;
  margin: 0 auto;
}

.search-title {
  font-size: 1.8rem;
}

.search-input {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 15px 45px 15px 15px;
  border: 1px solid #fefefe;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box;

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    right: 22px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
  }
}

.search-box {
  @include fdrjsb_aic;
  overflow: hidden;
}

.search-field {
  @include fdrjs_aic;
  & label {
    font-size: 1.8rem;
    margin-right: 5px;
  }
}

.search-block {
  @include fdr;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
}

.searchButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 48px;
  background: #ffffff;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  font-size: 20px;

  & img {
    width: 30px;
  }
}

.search-result-wrapper {
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin: 40px 0 0 0;
  overflow: hidden;
  max-height: 120px;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  z-index: 60;
  animation: fadeIn 0.3s linear;
}
.search-result {
  border-radius: 1rem;
}
.search-result-item {
  font-size: 2rem;
  margin: 2px 0;
}
</style>
