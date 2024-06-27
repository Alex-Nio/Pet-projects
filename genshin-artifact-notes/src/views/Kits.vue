<template>
  <section>
    <div class="kits">
      <div class="container">
        <actions-panel></actions-panel>
        <kits-list :kits="kits" @pageChange="pageChange"></kits-list>
        <div v-if="kits.length == 0" class="notes__warning">
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
  import data from "@/data/data";
  import actionsPanel from "@/components/artifactsActionsPanel/actionsPanel.vue";
  import kitsList from "@/components/UI/kitsList.vue";
  import { useRouter } from "vue-router";

  const store = useStore();
  const router = useRouter();

  const pageChange = (kit) => {
    router.push({ name: "notes", params: { title: kit.title } });
  };

  // Set Kits
  const kits = computed(() => {
    const notes = store.getters.getNotes;
    const result = Object.values(
      notes.reduce((acc, { id, title, type }) => {
        if (acc[title]) {
          acc[title].count++;
        } else {
          acc[title] = { id, title, types: [], count: 1 };
        }

        if (!acc[title].types.includes(type)) {
          acc[title].types.push(type);
        }

        return acc;
      }, {})
    );

    // get kits data
    const kitsData = data.kits;
    const artifactTypes = data.artifactTypes;

    // Add images to kits arr with kitItem object
    kitsData.forEach((kit) => {
      result.forEach((kitItem) => {
        if (kit.name === kitItem.title) {
          kit.images = kit.images.map((i) => {
            let values = Object.values(i);
            return values;
          });
          kitItem.images = [...(kitItem.images || []), ...kit.images];
        }
      });
    });

    // store.dispatch("setCollections", result);

    // return computed items
    return result;
  });
</script>

<style lang="scss">
  @import "@/assets/scss/imports.scss";

  .kits {
    @include fdcjc;
    height: 100%;
    min-height: 82vh;
  }

  .notes {
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

      & p {
        padding: 0 15px;
      }
    }
  }

  .completed-action {
    @include fdrjc_aic;

    &__checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      z-index: 20;
      margin-right: 5px;
    }
  }

  .kits {
    width: 100%;
  }
</style>
