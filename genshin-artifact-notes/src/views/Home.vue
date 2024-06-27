<template>
  <section>
    <div class="container">
      <scroll-parallax
        :up="parallaxTop.up"
        :down="parallaxTop.down"
        :speed="parallaxTop.speed"
      >
        <main-title-text></main-title-text>
      </scroll-parallax>
      <scroll-parallax
        :up="parallaxBottom.up"
        :down="parallaxBottom.down"
        :speed="parallaxBottom.speed"
      >
        <div class="control-panel">
          <div class="control-panel__inner">
            <div class="control-panel__text">
              <p>Выберите набор, его тип и необходимые Вам свойства</p>
              <p>Далее добавьте артефакт в свою коллекцию</p>
            </div>
            <div class="control-panel__content">
              <div class="card">
                <div class="card__wrapper">
                  <div class="card-content">
                    <div class="card-content__row">
                      <selection-list
                        :mainClass="'selection-list'"
                        :items="data.kits"
                        :activeClass="'selection-item current'"
                        :passiveClass="'selection-item'"
                        @handleKitSelection="handleKitSelection"
                      ></selection-list>
                      <selection-list
                        :mainClass="'types-list'"
                        :items="currentKit.images"
                        :activeClass="'selection-item current'"
                        :passiveClass="'selection-item'"
                        @handleTypeSelection="handleTypeSelection"
                      ></selection-list>
                    </div>
                    <div class="card-content__column">
                      <div class="control-panel__options">
                        <div class="option-item">
                          <general-selection
                            v-model="currentArtifactType"
                            :mainTitle="mainTitle"
                            @generalSelectionDone="generalSelectionDone"
                          ></general-selection>
                        </div>
                        <div class="option-item">
                          <extra-selection
                            v-model="selectedMainStat"
                            :currentArtifactType="currentArtifactType"
                            :kitSwitched="kitSwitched"
                            @currentDopStatsSelected="currentDopStatsSelected"
                            @createNote="createNote"
                          ></extra-selection>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card__wrapper">
                  <div class="card__content">
                    <card-description
                      :currentKitTitle="mainTitle"
                      :currentKitType="data.artifactTypes[currentTypeIndex]['type']"
                      :currentKit="currentKit"
                      @createNote="createNote"
                    ></card-description>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-parallax>
    </div>
  </section>
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="200"
  >
    <custom-popup v-model:show="popupVisible">
      <!-- Popup Error content -->
      <popup-error v-if="popupContentError" :error="error"></popup-error>

      <!-- Popup Default content -->
      <popup-default
        v-else
        @handleCompleteAction="handleCompleteAction"
        @handlePageChange="handlePageChange"
      ></popup-default>
    </custom-popup>
  </transition>
</template>

<script setup>
  // imports
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import data from "@/data/data";
  import mainTitleText from "@/components/UI/mainTitleText.vue";
  import selectionList from "@/components/UI/selectionList.vue";
  import cardDescription from "@/components/controlPanel/cardDescription.vue";
  import generalSelection from "@/components/controlPanel/generalSelection.vue";
  import extraSelection from "@/components/controlPanel/extraSelection.vue";
  import customPopup from "@/components/UI/popup/customPopup.vue";
  import popupError from "@/components/UI/popup/popupError.vue";
  import popupDefault from "@/components/UI/popup/popupDefault.vue";

  // settings
  const emit = defineEmits([
    "handleKitSelection",
    "handleTypeSelection",
    "currentDopStatsSelected",
  ]); // emits
  const store = useStore(); // store
  const router = useRouter(); // router

  // Parallax settings
  const parallaxTop = {
    speed: 0.25,
    down: true,
    up: false,
  };

  const parallaxBottom = {
    speed: 0.1,
    down: true,
    up: false,
  };

  //? defaults
  const mainTitle = ref("Цветок потерянного рая"); // set default title
  const currentTypeIndex = ref(0); // index of current artefact type
  const selectedMainStat = ref("HP"); // default main stat
  let currentArtifactType = "Цветок"; // default artifact type
  const currentKit = ref({
    name: "Цветок потерянного рая",
    images: [
      { blossom: "/Цветок потерянного рая/blossom.png" },
      { feather: "/Цветок потерянного рая/feather.png" },
      { watch: "/Цветок потерянного рая/watch.png" },
      { goblet: "/Цветок потерянного рая/goblet.png" },
      { hat: "/Цветок потерянного рая/hat.png" },
    ],
    location: { name: "Песчаное царство", image: "/Цветок потерянного рая/dungeon.png" },
    description: "",
    bonusX2: "Увеличивает мастерство стихий на 80 ед.",
    bonusX4:
      "Увеличивает урон реакций Бутонизация, Вегетация и Цветение экипированного этим набором персонажа на 40%. Кроме того, активация реакций Бутонизация, Вегетация и Цветение экипированным этим набором персонажем усилит этот эффект на 25%. Каждое суммирование длится 10 сек. Эффект складывается до 4 раз, может возникнуть раз в 1 сек. и активируется, даже если экипированный этим набором персонаж не активен.",
  }); // default kit images

  //? mutable properties
  let currentArtifactImage;
  let currentDopStats = [];
  const kitSwitched = ref(false);

  // Kit selection on done
  const handleKitSelection = (item) => {
    mainTitle.value = item.name;
    currentKit.value = item;
    currentArtifactImage = currentKit.value["images"][currentTypeIndex.value];

    // reset
    resetCheckboxes();
  };

  const resetCheckboxes = () => {
    // reset current dop stats array
    currentDopStats = [];
    kitSwitched.value = !kitSwitched.value;
  };

  // Type selection on done
  const handleTypeSelection = (index) => {
    currentTypeIndex.value = index;
    currentArtifactType = data.artifactTypes[currentTypeIndex.value]["type"];
    currentArtifactImage = currentKit.value["images"][index];

    if (currentArtifactType == "Цветок") {
      selectedMainStat.value = "HP";
    } else if (currentArtifactType == "Перо") {
      selectedMainStat.value = "Сила атаки";
    } else {
      selectedMainStat.value = "Выберите верхний стат";
    }

    // reset
    currentDopStats = [];
  };

  // Top stat selection on done
  const generalSelectionDone = (value) => {
    selectedMainStat.value = value;
    currentDopStats = [];
  };

  // Emit for note creation.
  // Creates new array of selected dop stats.
  const currentDopStatsSelected = (items) => {
    currentDopStats = items;
  };

  //? Popup properties
  const popupContentError = ref(false); // контент попапа
  const popupVisible = ref(false);
  const selectionDone = ref(false);
  const error = "Вы не выбрали дополнительные статы (Минимум 4 шт.)";

  // Change page on artifact created
  const handlePageChange = () => {
    router.push("/kits");
  };

  // Handle complete add artifacts by user
  const handleCompleteAction = () => {
    popupVisible.value = false;
    selectionDone.value = true;

    // reset
    resetCheckboxes();
  };

  // Note Creation
  const createNote = () => {
    //! Logger
    //* Картинка артефакта
    // console.log(Object.values(currentArtifactImage)[0]);
    //* Название набора
    // console.log(mainTitle.value);
    //* Тип артефакта
    // console.log(currentArtifactType);
    //* Верхний стат
    // console.log(selectedMainStat.value);
    //* Доп статы
    // console.log(Object.values(currentDopStats).map((item) => item.value));

    const note = {
      image: Object.values(currentArtifactImage)[0],
      title: mainTitle.value,
      type: currentArtifactType,
      main: selectedMainStat.value,
      extra: Object.values(currentDopStats).map((item) => item.value),
      completed: false,
    };

    // note creation validation. Shows error || create popup
    if (note.extra.length === 0) {
      popupContentError.value = true;
      popupVisible.value = true;
    } else {
      addNote(note);
      popupContentError.value = false;
      popupVisible.value = true;
      selectionDone.value = true;
      // reset
      resetCheckboxes();
    }
  };

  // Creates a new note
  const addNote = (note) => {
    store.dispatch("addNote", note);
  };

  // set defaults
  onMounted(() => {
    const currentArtifactType = "Цветок";
    currentArtifactImage = currentKit.value["images"][0];
  });
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";

  .control-panel {
    @include fdrjc_aic;
    height: 100%;
    min-height: 100vh;

    &__text {
      font-family: $ff_MainText;
      font-size: calc(16px + 12 * (100vw / 1920));
      text-align: center;
      margin-bottom: 30px;
    }

    &__inner {
    }

    &__content {
      @include fdrjsb_ais;
    }

    &__options {
      padding: 15px;
      background: $white;
      border-radius: 5px;
      margin: 0 20px 0 0;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1.9px);
      -webkit-backdrop-filter: blur(1.9px);
      border: 1px solid rgba(255, 255, 255, 0.59);

      & .option-item:first-child {
        margin-bottom: 5px;
      }
    }
  }
  .card {
    width: 100%;
    display: flex;

    &__wrapper {
      width: 100%;
    }
  }

  .card-content {
    width: 100%;
    &__row {
      @include fdrjs_ais;
      margin-bottom: 20px;
    }
    &__column {
      @include fdcjc_ais;
    }
  }

  @media screen and (max-width: 1396px) {
    .card-content__row {
      flex-direction: column;
      margin-right: 20px;
    }
    .types-list {
      grid-template-columns: repeat(5, minmax(82px, 82px));
      grid-template-rows: auto;
      margin: 20px 0;
    }
  }
  @media screen and (max-width: 991px) {
    .control-panel__content {
      flex-direction: column;
    }

    .card-content__row {
      margin-right: 0;
      margin-bottom: 0;
    }

    .control-panel__options {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
</style>
