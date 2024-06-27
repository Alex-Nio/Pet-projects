<template>
  <div class="video-background">
    <div class="video-foreground">
      <video
        v-if="showDesktopVideo"
        :src="desktopVideoSrc"
        autoplay
        loop
        muted
        @canplay="showDesktopVideo = true"
      ></video>
      <!-- <video
        v-if="showTabletVideo"
        :src="tabletVideoSrc"
        autoplay
        loop
        muted
        @canplay="showTabletVideo = true"
      ></video> -->
      <!-- <video
        v-if="showMobileVideo"
        :src="mobileVideoSrc"
        autoplay
        loop
        muted
        @canplay="showMobileVideo = true"
      ></video> -->
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";

  const showDesktopVideo = ref(false);
  const showTabletVideo = ref(false);
  const showMobileVideo = ref(false);

  const desktopVideoSrc = "/videos/desktop/video1.mp4";
  const tabletVideoSrc = "/videos/tablet/video1.mp4";
  const mobileVideoSrc = "/videos/mobile/video1.mp4";

  // При монтировании компонента добавляем слушатель события изменения размера окна
  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  // При демонтаже компонента удаляем слушатель события изменения размера окна
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  // Функция, которая вызывается при изменении размера окна
  const handleResize = () => {
    if (window.innerWidth <= 440) {
      // showDesktopVideo.value = false;
      // showTabletVideo.value = false;
      // showMobileVideo.value = true;
      //   console.log(`Показано видео для мобильных: ${window.innerWidth}`);
    } else if (window.innerWidth >= 441 && window.innerWidth <= 1279) {
      // showDesktopVideo.value = false;
      // showTabletVideo.value = true;
      // showMobileVideo.value = false;
      //   console.log(`Видео выключено: ${window.innerWidth}`);
    }

    if (window.innerWidth >= 1280) {
      showMobileVideo.value = false;
      showTabletVideo.value = false;
      showDesktopVideo.value = true;
      //   console.log(`Показано видео для десктопа: ${window.innerWidth}`);
    }
  };
</script>

<style lang="scss" scoped>
  .video-background {
    background: url("@/assets/img/bg.png") no-repeat center / cover;
    position: fixed;
    min-height: 100vh;
    top: 113px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    z-index: -99;
    opacity: 0.5;
    transition: all 0.5s ease-out;

    &.bg-scroll {
      top: 48px;
      transition: all 0.5s ease-out;
    }
  }
  .video-foreground,
  .video-background video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 100vw;
    height: 100%;
    min-height: 100vh;
    pointer-events: none;
  }
  #vidtop-content {
    top: 0;
  }

  @media (min-aspect-ratio: 16/9) {
    .video-foreground {
      height: 300%;
      top: -100%;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground {
      width: 300%;
      left: -100%;
    }
  }
</style>
