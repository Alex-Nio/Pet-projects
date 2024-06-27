<template>
  <div class="subfolders" v-if="has_files">
    <div class="subfolders__content">
      <button @click="closePanel" class="close-panel-btn">
        <img src="../../assets/img/close-icon.svg" alt="" />
      </button>
      <div v-if="this.inFolderFiles" class="sub-files">
        <p
          class="sub-folder-item"
          :class="{ active: active == i && item == this.activeSubFolder }"
          @click="sourceCreator(i, 'subfile', item), openVideo()"
          v-for="(item, i) in this.inFolderFiles"
        >
          {{ item }}
        </p>
      </div>
      <div class="sub-folders">
        <p
          class="sub-folder-item"
          @click="sourceCreator(i, 'subfolder', item), findSubFiles(i, item), openVideo()"
          v-for="(item, i) in this.inFolderFolders"
        >
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
    };
  },
  props: [
    "has_files",
    "folderName",
    "courseRootFiles",
    "inFolderFiles",
    "inFolderFolders",
    "targetIndex",
    "activeSubFolder",
  ],
  methods: {
    sourceCreator(i, marker, item) {
      this.active = i;
      this.$emit("srcCreate", i, marker, item);
    },
    findSubFiles(i, item) {
      this.$emit("findSubFiles", i, item);
    },
    openVideo() {
      this.$emit("openVideo");
    },
    closePanel() {
      this.$emit("closePanel");
    },
  },
};
</script>

<style lang="scss" scoped>
.subfolders {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  height: 100%;
  max-height: 515px;
  min-height: 400px;
  border-radius: 1rem;
  background-image: linear-gradient(-225deg, #b7f8db 0%, #50a7c2 100%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all 0.5s linear;
  box-shadow: -1px 2px 8px 0px rgb(34 60 80 / 5%);
  overflow: hidden;
  overflow-y: scroll;
  animation: fadeIn 0.5s linear;
}

/* хром, сафари */
.subfolders::-webkit-scrollbar,
.content::-webkit-scrollbar {
  width: 0;
}

/* ie 10+ */
.subfolders,
.content {
  -ms-overflow-style: none;
}

/* фф (свойство больше не работает, других способов тоже нет)*/
.subfolders,
.content {
  overflow: -moz-scrollbars-none;
}

.subfolders__content {
  position: relative;
  height: 515px;
  padding: 35px;
}

.close-panel-btn {
  position: fixed;
  top: 25px;
  right: 30px;
  width: 35px;
  height: 35px;
  background: transparent;
  cursor: pointer;
  z-index: 25;

  & img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.sub-folder-item {
  font-size: 1.8rem;
  margin: 10px 0;
  transition: color 0.3s linear;

  &:hover {
    cursor: pointer;
    color: #f48c06;
    transition: all 0.3s linear;
  }

  &.active {
    color: #f48c06;
  }
}
</style>
