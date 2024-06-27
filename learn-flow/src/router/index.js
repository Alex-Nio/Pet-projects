import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Content from "../views/Content.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        props: true
    },
    {
        path: encodeURI("/Курсы/:categoryName/:pageName"),
        name: "Content",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Content,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
