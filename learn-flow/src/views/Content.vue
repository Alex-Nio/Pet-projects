<template>
  <div class="wrapper" @click="this.showFolders = !this.showFolders">
    <h1 class="course-title">{{ Title }}</h1>
    <video-player
      v-if="videoOpen"
      :source="source"
      :fileName="fileName.replace('.mp4', '')"
      @closeVideo="closeVideo"
    ></video-player>

    <div class="root">
      <div class="content">
        <!-- Папки в корне урока -->
        <lesson-folders
          @find="findIndex"
          @open="openFolder"
          :courseRootFiles="courseRootFiles"
        ></lesson-folders>

        <!-- Файлы по дефолту в корне -->
        <files-in-root
          :inRootFiles="inRootFiles"
          @find="findIndex"
          @srcCreate="sourceCreator"
        ></files-in-root>
      </div>

      <!-- Файлы и папки внутри папки урока -->
      <files-in-folders
        :activeSubFolder="subfolderName"
        v-show="showFolders"
        :has_files="has_files"
        :folderName="folderName"
        :courseRootFiles="courseRootFiles"
        :inFolderFiles="inFolderFiles"
        :inFolderFolders="inFolderFolders"
        :targetIndex="targetIndex"
        @findSubFiles="findSubFiles"
        @srcCreate="sourceCreator"
        @openVideo="openVideo"
        @closePanel="closePanel"
        :emits="['find', 'default']"
      ></files-in-folders>
      <!-- TODO: Подапки -->
      <!-- <subfolders-in-folders
      :filtredSubFiles="filtredSubfolderContentFiles"
      :filtredSubFolders="filtredSubfolderContentFolders"
      :deepFolders="deepFolders"
      >В разработке</subfolders-in-folders
    > -->
    </div>
  </div>
</template>

<script>
import videoPlayer from "@/components/ContentComponents/videoPlayer.vue";
import lessonFolders from "@/components/ContentComponents/lessonFolders.vue";
import filesInRoot from "@/components/ContentComponents/filesInRoot.vue";
import filesInFolders from "@/components/ContentComponents/filesInFolders.vue";
import subfoldersInFolders from "@/components/deepFoldering/subfoldersInFolders.vue";
export default {
  props: ["courses", "pageName", "categoryName"],
  components: {
    videoPlayer,
    filesInFolders,
    filesInRoot,
    lessonFolders,
    subfoldersInFolders,
  },
  data() {
    return {
      Title: "Default Title",
      // Data-файл
      courseData: [],
      // Корень курса: Папки и Файлы
      courseRootFiles: [],
      // Только файлы в корне
      inRootFiles: [],
      // файлы в папке
      inFolderFiles: [],
      // Папки внутри папки курса
      inFolderFolders: [],
      // Контент в подпапке
      subfolderContentFiles: [],
      // Отфильтрованное содержимое подпапки
      filtredSubfolderContentFiles: [],
      filtredSubfolderContentFolders: [],
      // Последний уровень
      deepFolders: [],
      // Индекс файла или папки
      fileIndex: null,
      targetIndex: null,
      fileName: "",
      folderName: "",
      subfolderName: "",
      rootDirectory: "data",
      source: "",
      has_files: false,
      has_more_folders: false,
      videoOpen: false,
      showFolders: false,
    };
  },
  mounted() {
    if (this.$route.path != "/") {
      window.removeEventListener("wheel", this.onSlideChange, this.onSwiper);
    }

    this.Title = this.pageName;

    let arr = this.courses.categories;
    let content = this.courseData;

    for (let i = 0; i < arr.length; i++) {
      let courseData = arr[i];

      let fullContent = Object.entries(courseData[1]);
      content.push(fullContent);
    }

    this.courseData.forEach((item) => {
      for (let i = 0; i < item.length; i++) {
        let lesson = item[i];

        if (lesson[0] === this.pageName) {
          this.courseRootFiles = lesson[1];

          if (lesson[1]["Файлы"]) {
            this.inRootFiles = lesson[1]["Файлы"];
            this.inRootFiles = this.inRootFiles.sort((a, b) => {
              if (a.match(/\d+/) != null) {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numA - numB;
              }
            });
            console.log(this.inRootFiles);
          }
        }
      }
    });
  },
  methods: {
    findIndex(index) {
      this.targetIndex = index;

      if (typeof index === "number") {
        // console.log("its file");
        this.fileIndex = this.courseRootFiles["Файлы"][index];
        this.fileName = this.fileIndex;
        this.source = `${decodeURI(this.$route.path)}/${this.fileName}`;
        this.openVideo();
      } else {
        // console.log("its folder");

        // Если внутри папки есть ещё папки
        if (Object.entries(this.courseRootFiles[index]).length > 2) {
          // console.log("Есть подпапки");

          // Находим подпапки
          let moreFolders = Object.keys(this.courseRootFiles[index]).filter(
            (item) => item !== "Папка" && item !== "Файлы"
          );

          this.inFolderFolders = moreFolders;
          this.has_more_folders = true;
          // moreFolders.forEach((folder) => {
          //   console.log(this.courseRootFiles[index][folder]["Папка"]);
          // });
        } else {
          this.has_more_folders = false;
          this.inFolderFolders = null;
        }

        this.folderName = this.courseRootFiles[index]["Папка"];
        this.inFolderFiles = this.courseRootFiles[index]["Файлы"];
      }
    },
    openFolder(i, folder) {
      // console.log("Открыта папка " + i);
      this.subfolderContentFiles = folder;
      //TODO: Возможна ошибка связанная с sub-folders
      this.has_files = true;
    },
    sourceCreator(i, marker, item) {
      this.subfolderName = item;

      if (marker === "subfile") {
        this.fileName = this.inFolderFiles[i];
        this.source = `${decodeURI(this.$route.path)}/${this.folderName}/${
          this.fileName
        }`;
      } else if (marker === "subfolder") {
        this.source = `${decodeURI(this.$route.path)}/${this.subfolderName}/ИМЯ ФАЙЛА`;
      }

      // logger
      // console.log(this.source);
    },
    findSubFiles(i, item) {
      this.filtredSubfolderContentFiles = "";
      this.filtredSubfolderContentFolders = "";
      this.deepFolders = "";

      let mutation = Object.entries(this.subfolderContentFiles[item]);
      let subContentFiles = [],
        subContentFolders = [],
        deepFolders = [];

      for (const [key, value] of mutation) {
        if (key !== "Папка") {
          if (key == "Файлы") {
            subContentFiles.push(value);
          } else {
            subContentFolders.push(value);
          }
        }
      }

      subContentFiles = subContentFiles.map(Object.values);

      this.filtredSubfolderContentFiles = subContentFiles;
      this.filtredSubfolderContentFolders = subContentFolders;

      this.filtredSubfolderContentFolders.forEach((item) => {
        if (Object.entries(item)[0][0] == "Папка") {
          deepFolders.push(item);
        }
      });

      this.deepFolders = deepFolders;
    },
    openVideo() {
      // console.log("video opened");

      if (this.source.includes(".mp4")) {
        this.videoOpen = !this.videoOpen;
        // console.log(".mp4 found in the string");
      } else {
        window.open(this.source);
        // console.log(".mp4 not found in the string");
      }
    },
    closeVideo() {
      this.videoOpen = !this.videoOpen;
    },
    closePanel() {
      this.has_files = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-inline: hidden;
  width: calc(100% - 40px);
  max-width: 1200px;
  min-height: 480px;
  max-height: 480px;
  position: absolute;
  top: 115px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  overflow-y: scroll;
  padding: 40px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);
}

.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100vh;
}

.course-title {
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
