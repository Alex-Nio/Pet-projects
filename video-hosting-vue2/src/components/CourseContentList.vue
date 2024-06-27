<template>
  <Search
    v-model:searchQuery="searchQuery"
    :filteredItems="filteredItems"
    :folders="is_folders"
    @update:searchQuery="updateSearchQuery"
  ></Search>
  <ul v-if="is_folders" class="course-content-list" :class="{ active: active }">
    <li
      class="content-item"
      v-for="(folder, index) in this.folders"
      :key="folder"
    >
      <p class="folder" @click="openFiles(index, folder), openTab(index)">
        {{ folder }}
      </p>
      <transition
        :duration="750"
        :key="is_folders"
        mode="in-out"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div
          class="course-content-panel"
          :class="{ active: active }"
          v-if="active && this.index === index && is_folders"
        >
          <Folders
            :subfolders="subfolders"
            v-model:active="active"
            :videoTrigger="videoTrigger"
            :index="index"
            :videoTitle="videoTitle"
            :playEnded="playEnded"
            :videoSource="videoSource"
            :is_folders="is_folders"
            @closeOwerlay="closeOwerlay"
            @createSource="openVideo"
            @createSubfolder="openSubfolders"
            @closeVideo="closeVideo"
            @scroll="scroll"
            :is_subfolders="is_subfolders"
            :subfoldersContent="subfoldersContent"
          ></Folders>
        </div>
      </transition>
    </li>
  </ul>
  <ul v-if="!is_folders" class="course-content-list">
    <li class="content-item" v-for="(file, index) in this.files" :key="file">
      <p
        @click="openFiles(index), openVideo(file, index, is_folders), scroll()"
      >
        {{ file }}
      </p>
      <div v-if="this.index === index && this.videoTrigger" class="video">
        <button class="video-close-btn" @click="closeVideo">
          <img src="../assets/img/video-close-white.svg" alt="" />
        </button>
        <div id="video" v-if="this.index === index" class="test-player-wrap">
          <vue3-video-player
            :src="videoSource"
            :title="file"
            @ended="playEnded"
            cover="https://i.ytimg.com/vi/poPoWF3wSYI/maxresdefault.jpg"
          >
          </vue3-video-player>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import jsonContent from "@/assets/data/video_content.json";
import Folders from "@/components/Folders";
import Search from "@/components/search";
export default {
  components: {
    Folders,
    Search,
  },
  data() {
    return {
      jsonContent: jsonContent,
      files: [],
      folders: [],
      sourceFolders: [],
      allFiles: [],
      subfolders: [],
      subfoldersContent: [],
      is_subfolders: false,
      videoTrigger: false,
      active: false,
      is_folders: false,
      index: null,
      Title: null,
      videoTitle: "",
      videoSource: "data/Курсы/",
      folderTabs: [],
      searchQuery: "",
    };
  },
  mounted() {
    const dataCourseContent = JSON.parse(JSON.stringify(this.jsonContent));
    var courseData = Object.values(dataCourseContent);
    this.Title = this.$route.params.Title;
    let files = [];
    let folders = [];

    // Отделяем файлы от папок
    function sortFiles(files, filesArray) {
      let file;
      let types = [
        ".py",
        ".gz",
        ".js",
        ".mp4",
        ".doc",
        ".pdf",
        ".txt",
        ".rtf",
        ".pkt",
        ".svg",
        ".sfk",
        ".apk",
        ".jar",
        ".yml",
        ".css",
        ".csv",
        ".gif",
        ".TTF",
        ".zip",
        ".key",
        ".ico",
        ".png",
        ".srt",
        ".jpg",
        ".url",
        ".html",
        ".webm",
        ".xlsx",
        ".json",
        ".docx",
        ".pptx",
        ".cache",
        "Dockerfile",
        ".unitypackage",
      ];

      // 1
      function filesSorting(typesArr, file) {
        typesArr.forEach((type) => {
          if (file.substr(-type.length) == type) {
            filesArray.push(file);
          }
        });
      }

      // 2
      function foldersSorting(typesArr, files) {
        typesArr.forEach((type) => {
          const fileExtension = type;
          files = files.filter((item) => !item.endsWith(fileExtension));
        });
        return files;
      }

      for (let i = 0; i < files.length; i++) {
        file = files[i];
        filesSorting(types, file);
      }

      folders = foldersSorting(types, files);
    }

    courseData.forEach((course) => {
      if (course["Название курса"] == this.Title) {
        this.allFiles = course;

        sortFiles(course["Папки"], files, folders);
        this.files = files;
        this.folders = folders;
        this.sourceFolders = folders;

        if (course["Папки"].length > 0) {
          if (folders.length > 0) {
            this.is_folders = true;
          } else {
            this.is_folders = false;
          }
        } else {
          this.files = course["Файлы"];
        }
      }
    });
  },
  created() {
    this.Title = this.$route.params.Title;
    this.videoSource += this.Title;
  },
  methods: {
    updateSearchQuery(value) {
      this.searchQuery = value;
    },
    openTab(i) {
      let allTabs = document.querySelectorAll(".folder");
      this.folderTabs = allTabs;

      this.folderTabs.forEach((tab, index) => {
        tab.classList.remove("active");
        if (index === i) {
          tab.classList.add("active");
        }
      });

      this.index = i;
      this.active = true;
      this.trigger = !this.trigger;
      this.changed = !this.changed;
    },
    scroll() {
      this.$nextTick(() => {
        const element = document.getElementById("video");
        const rect = element.getBoundingClientRect();
        let offset = rect.top + window.pageYOffset;
        offset = offset - 120;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      });
    },
    closeVideo() {
      this.videoTrigger = false;
    },
    closeOwerlay() {
      this.active = false;
      this.videoTrigger = false;

      this.folderTabs.forEach((tab) => {
        tab.classList.remove("active");
      });
    },
    openFiles(i, folder) {
      this.active = true;
      this.index = i;
      this.subfolders = this.allFiles[folder];
      this.is_subfolders = true;
    },
    openSubfolders(folder) {
      this.subfoldersContent = this.allFiles[folder];
    },
    // Формируем src для видео и находим файл
    openVideo(file, i, is_folders) {
      this.videoSource = "data/Курсы/";

      function checkFileType(file) {
        let types = [
          ".py",
          ".gz",
          ".js",
          ".doc",
          ".pdf",
          ".txt",
          ".rtf",
          ".pkt",
          ".svg",
          ".sfk",
          ".apk",
          ".jar",
          ".yml",
          ".css",
          ".csv",
          ".gif",
          ".TTF",
          ".zip",
          ".key",
          ".ico",
          ".png",
          ".srt",
          ".jpg",
          ".url",
          ".html",
          ".webm",
          ".xlsx",
          ".json",
          ".docx",
          ".pptx",
          ".cache",
          "Dockerfile",
          ".unitypackage",
        ];

        for (let i = 0; i < types.length; i++) {
          let type = types[i];

          if (file.substr(-type.length) == type) {
            return false;
          }
        }
      }

      const checking = checkFileType(file);

      this.videoTitle = file;

      if (is_folders) {
        this.videoSource = `${this.videoSource}${this.Title}/${this.sourceFolders[i]}/${file}`;
      } else if (!is_folders) {
        this.videoSource += this.Title + "/";
        this.videoSource = this.videoSource + file;
      }

      this.videoTrigger = !this.videoTrigger;

      console.log(this.videoSource);

      // Открытие файла
      if (checking == false) {
        window.open(this.videoSource);
        this.videoTrigger = !this.videoTrigger;
      }
    },
    playEnded(e) {
      console.log(e);
      if (e.target === document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    },
  },
  computed: {
    filteredItems() {
      if (this.is_folders) {
        this.items = this.subfolders;
      } else if (!this.is_folders) {
        this.items = this.files;
      }

      return this.items.filter(
        (item) =>
          item.includes(this.searchQuery) && this.searchQuery.length >= 2
      );
    },
  },
};
</script>

<style lang="scss">
.course__wrapper {
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.5s linear;
}

.course-content-list {
  order: 2;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 35px;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all 0.5s linear;
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);
}

.file {
  font-family: "Roboto", sans-serif;
  font-size: 1.8rem;
  cursor: pointer;
  margin: 10px 0;
}

.content-item,
.folder {
  font-size: 2.4rem;
  margin: 10px 0;
  cursor: pointer;
}

.folder.active {
  color: red;
}

.test-player-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 15px auto;
  animation: fadeIn 0.5s ease-in-out;
}
.btn-play {
  color: white;
  margin-right: 10px;
  cursor: pointer;
}
.btn-play svg {
  width: 16px;
}

.vcp-dashboard {
  width: 100% !important;
  margin: 0 !important;
}

.course-content-panel {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 3;
}

.cover-layer,
.vcp-layer,
.error-layer,
.title-layer,
.video,
.loading-layer,
.play-pause-layer,
.cover-layer img,
.error-layer .error-msg-wrap,
.title-layer,
.title-layer .video-title,
.vcp-dashboard,
.vue-core-video-player-layers,
.vcp-container,
.vcp-container video {
  border-radius: 1rem !important;
}
</style>
