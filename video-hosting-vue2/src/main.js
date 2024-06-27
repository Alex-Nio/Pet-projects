import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "animate.css";
import "./assets/scss/main.scss";
import Vue3VideoPlayer from "@cloudgeek/vue3-video-player";
import "@cloudgeek/vue3-video-player/dist/vue3-video-player.css";

const myLang = {
	dashboard: {
		btn: {
			play: "Воспроизвести",
			pause: "Пауза",
			fullscreen: "Полный экран",
			exitFullscreen: "Выйти из полноэкранного режима",
			mute: "Выкл. Звук",
			unmute: "Вкл. Звук",
			back: "Назад",
			pip: "Картинка в картинке"
		},
		settings: {
			autoplay: "Autoplay",
			loop: "Зациклить",
			speed: "Скорость воспроизведения",
			resolution: "Разрешение"
		}
	},
	layers: {
		error: {
			title: "Ошибка!",
			2404: "Источник видео не определен",
			2502: "Ошибка медиасети",
			2503: "Видео не удается декодировать",
			2504: "Видео не может воспроизводиться!",
			601: "Видео в реальном времени не может воспроизводиться!"
		},
		loading: {
			msg: "Загрузка ..."
		}
	}
};

createApp(App)
	.use(store)
	.use(router)
	.use(Vue3VideoPlayer, {
		lang: myLang
	})
	.mount("#app");
