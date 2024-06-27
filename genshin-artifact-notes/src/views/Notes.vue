<template>
  <section>
    <div class="notes">
      <div class="container">
        <actions-panel :activeFilter="filterValue"></actions-panel>
        <notes-list
          v-if="filteredNotes.length != 0"
          :filteredNotes="filteredNotes"
        ></notes-list>
        <div v-else class="notes__warning">
          <p>Пожалуйста, сперва добавьте артефакт в отслеживаемые</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // imports
  import { ref, computed } from "vue";
  import { useStore } from "vuex";
  import actionsPanel from "@/components/artifactsActionsPanel/actionsPanel.vue";
  import notesList from "@/components/UI/notesList.vue";
  import { useRouter } from "vue-router";

  const route = useRouter().currentRoute;
  const store = useStore();

  const filter = ref("active");
  const filterValue = filter.value;

  const filteredNotes = computed(() => {
    const filterValue = filter.value;

    switch (filterValue) {
      default:
        return store.getters.getNotes.filter(
          (note) => note.title === route.value.params.title
        );
    }
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .notes {
    @include fdcjc;
    position: relative;
    height: 100%;
    min-height: 82vh;

    &__btns {
      @include fdrjs_aic;
    }

    &__warning {
      font-size: calc(22px + 9 * (100vw / 1920));
      margin: 40px 0;
      padding: 25px 0;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.9px);
      -webkit-backdrop-filter: blur(1.9px);
      border: 1px solid rgba(255, 255, 255, 0.59);
      text-align: center;
    }
  }
</style>
