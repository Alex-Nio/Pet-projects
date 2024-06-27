<template>
  <div class="video">
    <button @click="closeVideo" class="video-close-btn">
      <img src="../../assets/img/video-close-white.svg" alt="" />
    </button>
    <div id="video" class="test-player-wrap">
      <vue3-video-player
        :src="source"
        :title="fileName"
        @ended="playEnded"
        resolution="1080p"
        :view-core="viewCore.bind(null, 'video1')"
        cover="https://i.ytimg.com/vi/poPoWF3wSYI/maxresdefault.jpg"
      >
      </vue3-video-player>
    </div>
  </div>
</template>

<script>
export default {
  props: ["source", "fileName"],
  data() {
    return {
      players: {},
      volume: 50,
    };
  },
  methods: {
    viewCore(id, player) {
      // console.log(id, player);
      this.players[id] = player;
    },
    play(id) {
      // console.log("custom play: id =", id);
      this.players && this.players[id] && this.players[id].play();
    },
    destroy(id) {
      this.players && this.players[id] && this.players[id].destroy();
    },
    playEnded(e) {
      // console.log(e);
      if (e.target === document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    },
    volumeUp(id) {
      this.volume += 2;
      if (this.volume > 100) {
        this.volume = 100;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    volumeDown(id) {
      this.volume -= 2;
      if (this.volume < 0) {
        this.volume = 0;
      }
      this.players &&
        this.players[id] &&
        this.players[id].setVolume(this.volume / 100, true);
    },
    closeVideo() {
      this.$emit("closeVideo");
    },
  },
  mounted() {
    let btn = document.querySelector(".btn-volume");
    let controlPanel = document.querySelector(".btn-control-panel");
    let volumeCntrl = document.querySelector(".volume-current");
    let volumeInfo = document.querySelector(".volume-info");
    let mouseEnterHandler;

    function volumeUpdate(volume) {
      volumeCntrl.style.height = `${volume}%`;
      volumeInfo.innerText = `${volumeCntrl.style.height}`;
    }

    mouseEnterHandler = () => {
      let wheelHandler = (event) => {
        // Move down / up wheel
        if (event.deltaY > 0) {
          this.volumeDown("video1");
          volumeUpdate(this.volume);
        } else {
          this.volumeUp("video1");
          volumeUpdate(this.volume);
        }
      };

      document.addEventListener("wheel", wheelHandler);
      btn.addEventListener("mouseleave", () => {
        document.removeEventListener("wheel", wheelHandler);
      });

      controlPanel.addEventListener("mouseleave", () => {
        document.removeEventListener("wheel", wheelHandler);
      });
    };

    btn.addEventListener("mouseenter", mouseEnterHandler);
    controlPanel.addEventListener("mouseenter", mouseEnterHandler);

    volumeUpdate(this.volume);
  },
  beforeDestroy() {
    btn.removeEventListener("mouseenter", mouseEnterHandler);
    controlPanel.removeEventListener("mouseenter", mouseEnterHandler);
  },
};
</script>

<style lang="scss">
.video {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  // background-image: linear-gradient(-225deg, #ffe29f 0%, #ffa99f 48%, #ff719a 100%);
  border-radius: 1rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 50;
}

.video-close-btn {
  position: absolute;
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

.test-player-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
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

.video-title {
  padding: 10px 0px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.play-pause-layer .btn-control .btn-play {
  margin-left: 18px !important;
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
