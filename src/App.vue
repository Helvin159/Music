<template>
	<!-- Header -->
	<app-header />

	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>

	<!-- Player -->
	<app-player></app-player>
	<!-- Auth -->
	<auth-modal />
</template>

<script>
import AppHeader from "./components/Header/Header.vue";
import AuthModal from "./components/Auth/Auth.vue";
import AppPlayer from "@/components/Player/Player.vue";

export default {
	name: "App",

	components: {
		AppHeader,
		AuthModal,
		AppPlayer,
	},
	created() {
		this.$store.dispatch("init_login");
	},
};
</script>

<style>
.fade-enter-from {
	opacity: 0;
}

.fade-enter-active {
	transition: all 0.5s linear;
}

.fade-leave-to {
	transition: all 0.5s linear;
	opacity: 0;
}
</style>
