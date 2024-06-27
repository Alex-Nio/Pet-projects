import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import "animate.css";
import "./assets/scss/main.scss";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";
import {firebaseConfig} from "./key.js";

const app = createApp(App);
const imports = [router, store];
app.component("scroll-parallax", ScrollParallax);

imports.forEach(item => {
  app.use(item);
});

initializeApp(firebaseConfig);

store.dispatch("Authorization");

app.mount("#app");
