<template>
  <slot></slot>
  <div class="sub-folders-more">
    <p style="font-size: 2rem; font-weight: bold">Контент подпапки</p>
    <div v-for="(item, i) in filtredSubFiles[0]">
      <p class="sub-folders-more__item">{{ item }}</p>
    </div>
    <div v-for="(item, i) in filtredSubFolders">
      <p @click="openFolderContent" class="sub-folders-more__item">{{ item["Папка"] }}</p>
    </div>
    <div v-if="deepFolders.length > 0 && showSubs">
      <p style="font-size: 2rem; font-weight: bold">Содержимое</p>
      <div style="background-color: red" v-for="(item, i) in Object.keys(deepFolders[0])">
        <p
          style="font-size: 2rem"
          @click="LoadMore(i)"
          v-if="item !== 'Папка'"
          class="sub-folders-more__item"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div v-if="loadMore == true">
      <p style="font-size: 2rem; font-weight: bold">Контент подпапки</p>
      <div style="background-color: blue" v-for="(item, i) in Object.values(deepFolders)">
        <div v-if="i === 0">
          <div v-for="(property, z) in Object.entries(item)">
            <div v-if="property[0] !== 'Папка' && z == 1">
              <!-- Файлы -->
              <div v-for="(prop, idx) in Object.entries(property[1])[1]">
                <div v-if="prop !== 'Файлы' && idx == 1">
                  <p style="font-size: 2rem" v-for="file in prop">
                    {{ file }}
                  </p>
                </div>
              </div>
              <!-- Папки -->
              <div v-for="(prop, idx) in Object.entries(property[1])[2]">
                <div v-if="prop !== 'Файлы' && idx == 1">
                  <div v-for="(folder, type) in prop">
                    <p @click="LoadLast" style="font-size: 2rem" v-if="type == 'Папка'">
                      {{ folder }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loadLast == true">
      <p style="font-size: 2rem; font-weight: bold">Содержимое</p>
      <div v-for="(item, i) in Object.values(deepFolders)">
        <div v-for="(property, key) in Object.entries(item)">
          <!-- <p>Цикл {{ key }}</p> -->
          <div v-if="property[0] !== 'Папка' && key == 1 && i == 0">
            <div v-for="prop in property[1]">
              <div v-if="Object.keys(prop)[1] == 'Файлы'">
                <p style="font-size: 2rem" v-for="file in prop['Файлы']">
                  {{ file }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   TODO: filtredSubFolders это массив с подпапками внутри подпапки
  //   TODO: переделать компонент!
  props: ["filtredSubFiles", "filtredSubFolders", "deepFolders"],
  data() {
    return {
      loadMore: false,
      loadLast: false,
      showSubs: false,
      activeIndex: null,
    };
  },
  methods: {
    LoadMore(i) {
      this.activeIndex = i;
      this.loadMore = !this.loadMore;
    },
    LoadLast() {
      this.loadLast = !this.loadLast;
    },
    openFolderContent() {
      this.showSubs = !this.showSubs;
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-folders-more {
  &__item {
    font-size: 1.4rem;
  }
}
</style>
