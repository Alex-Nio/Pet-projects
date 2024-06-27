import { createRouter, createWebHistory } from "vue-router";
import main from "../views/main.vue";
import course from "../views/course.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: main
	},
	{
		path: "/courses/:Title",
		name: "courses",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ "../views/course.vue")
		component: course,
		props: true
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
