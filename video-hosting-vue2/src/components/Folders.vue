<template>
  <ul v-if="active" class="folders-list">
    <li class="folders-list__item">
      <div class="folders-list__actions">
        <span><strong>Файлы:</strong></span>
        <button class="close-btn" @click="closeOwerlay">
          <img src="../assets/img/close-icon.svg" alt="" />
        </button>
      </div>
      <div class="subfolder-items">
        <p
          class="file"
          v-for="file in subfolders"
          @click="openVideo(file, index, is_folders)"
          :key="file"
        >
          {{ file }}
        </p>
      </div>
      <div
        class="subfolders-content"
        v-if="active && this.index === index && subActive"
      >
        <p
          class="file"
          v-for="(file, x) in subfoldersContent"
          @click="openVideo(file, index, is_folders, is_subfolders, x)"
          :key="file"
        >
          {{ file }}
        </p>
      </div>
      <div
        v-if="active && this.index === index && this.videoTrigger"
        class="video"
      >
        <button class="video-close-btn" @click="closeVideo">
          <img src="../assets/img/video-close-white.svg" alt="" />
        </button>
        <div id="video" class="test-player-wrap">
          <vue3-video-player
            :src="videoSource"
            :title="videoName"
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
export default {
  props: [
    "subfolders",
    "active",
    "videoTrigger",
    "index",
    "playEnded",
    "videoSource",
    "is_folders",
    "is_subfolders",
    "subfoldersContent",
    "videoTitle",
  ],
  data() {
    return {
      subActive: false,
      subfolder: null,
      closed: true,
      videoName: "Title",
    };
  },
  methods: {
    closeVideo() {
      this.$emit("closeVideo", this.active, this.videoTrigger);
    },
    closeOwerlay() {
      this.$emit("closeOwerlay", this.active);
    },
    openVideo(file, i, is_folders, is_subfolders, index) {
      function checkFileType(file) {
        let types = [
          ".py",
          ".gz",
          ".js",
          ".doc",
          ".mp4",
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

        let x;

        for (let i = 0; i < types.length; i++) {
          let type = types[i];

          if (file.substr(-type.length) == type) {
            x = "File";
          }
        }

        return x;
      }

      const checking = checkFileType(file);

      this.videoName = file.substring(0, file.length - 4);

      if (is_subfolders) {
        // Создаём каталог для подпапки
        let subs = document
          .querySelector(".subfolder-items")
          .querySelectorAll(".file");

        let subIndex;

        // Вычисляем индекс по папке из HTML
        function setSub(arr, sub, index) {
          for (let i = 0; i < arr.length; i++) {
            let el = arr[i];
            if (sub.innerText == el) {
              return index;
            }
          }
        }

        // Устанавливаем индекс папки
        subs.forEach((sub, index) => {
          subIndex = setSub(this.subfolders, sub, index);
        });

        // Собираем SRC файла
        this.subfolder = this.subfolders[subIndex];
        file = `${this.subfolder}/${file}`;

        this.$emit("createSource", file, i, is_folders);
      } else {
        if (checking == "File" && is_subfolders == undefined) {
          this.$emit("createSource", file, i, is_folders);
        } else if (checking == undefined) {
          this.subActive = !this.subActive;
          this.$emit("createSubfolder", file, i, is_folders);
        }
      }
      this.$emit("scroll");
    },
  },
};
</script>


<style lang="scss">
.folders-list__actions span {
  font-size: 1.6rem;
}

.close-btn,
.video-close-btn {
  width: 30px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  & img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.video-close-btn {
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 100;
}

.folders-list {
  order: 1;
  width: 100%;
  max-width: 1200px;
  padding: 35px;
  margin: 25px 0 0 0;
  border-radius: 1rem;
  background-image: linear-gradient(-225deg, #b7f8db 0%, #50a7c2 100%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all 0.5s linear;
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.subfolders-content {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 35px;
  background-image: linear-gradient(-225deg, #fffeff 0%, #d7fffe 100%);
  border-radius: 1rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all 0.5s linear;
  box-shadow: -1px 2px 8px 0px rgba(34, 60, 80, 0.05);
}

.video {
  width: 100%;
  padding: 5px 20px;
  background-image: linear-gradient(
    -225deg,
    #ffe29f 0%,
    #ffa99f 48%,
    #ff719a 100%
  );
  border-radius: 1rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transform: scale(1.1);
}
</style>
