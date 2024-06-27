<template>
  <section>
    <div class="container">
      <div class="collections">
        <div class="collections__wrapper">
          <h3>Мои коллекции</h3>
          <ul class="collection-list">
            <li v-for="item in collectionItems" class="collection-list__item">
              {{ item }}
              <br />
              <br />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // imports
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";

  const store = useStore();

  const collectionItems = computed(() => {
    return store.getters.getCollections;
  });

  onMounted(() => {
    // console.log(collectionItems.value);
  });
</script>

<style lang="scss" scoped></style>
