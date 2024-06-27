<template>
  <ul class="courses-list">
    <li
      class="courses-list__item"
      v-for="course in courses[index]"
      :key="course"
    >
      <router-link :to="{ name: 'courses', params: { Title: course } }">
        <p class="course-link">{{ course }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["courses", "index"],
};
</script>

<style lang="scss" scoped>
.courses-list {
  padding: 5px 10px;
  &__item {
    font-size: 2.2rem;
    margin: 5px 0;
    padding: 10px 25px;
    background: rgba(201, 204, 211, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
  }
}

.course-link {
  cursor: pointer;
}
</style>
