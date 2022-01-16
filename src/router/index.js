import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import About from "@/views/About";
import Manage from "@/views/Manage";
import Song from "@/views/Song.vue";

const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "about",
		path: "/about",
		component: About,
	},
	{
		name: "manage",
		alias: "/gestire-la-musica",
		path: "/manage-music",
		meta: {
			requiresAuth: true, // routeGuard
		},
		component: Manage,
		beforeEnter: (to, from, next) => {
			// console.log("manage route");
			next();
		},
	},
	{
		path: "/manage",
		redirect: { name: "manage" },
	},
	{
		name: "song",
		path: "/song/:id",
		component: Song,
	},
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "home" },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
	// console.log(to.matched);

	if (!to.matched.some((record) => record.meta.requiresAuth)) {
		next();
		return;
	}

	if (store.state.userLoggedIn) {
		next();
	} else {
		next({
			name: "home",
		});
	}
});

export default router;
