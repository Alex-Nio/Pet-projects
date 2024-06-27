<template>
  <div class="notes__wrapper">
    <ul class="notes-list">
      <note-item
        v-for="(note, index) in filteredNotes"
        class="note-item"
        :note="note"
        :class="{ completed: note.completed }"
        :key="note.id"
      ></note-item>
    </ul>
  </div>
</template>

<script setup>
  import noteItem from "@/components/UI/noteItem.vue";

  const props = defineProps({
    filteredNotes: {
      type: Array,
    },
  });
</script>

<style lang="scss" scoped>
  .notes {
    width: 100%;
    &__wrapper {
      width: 100%;
    }

    &__warning {
    }
  }
  .notes-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 20px;
    margin: 30px 0;
  }

  @media screen and (max-width: 631px) {
    .notes-list {
      grid-template-columns: 1fr;
    }
  }
</style>
