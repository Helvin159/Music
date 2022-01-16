import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";
import { Howl } from "howler";
import helper from "../includes/helper";

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
		currentSong: {},
		sound: {},
		seek: "00:00",
		duration: "00:00",
		playerProgress: "0%",
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
		newSong(state, payload) {
			if (state.sound instanceof Howl) {
				state.sound.unload();
			}

			state.currentSong = payload;
			state.sound = new Howl({
				src: [payload.url],
				html5: true,
			});
		},
		updatePosition(state) {
			state.seek = helper.formatTime(state.sound.seek());
			state.duration = helper.formatTime(state.sound.duration());

			state.playerProgress = `${
				(state.sound.seek() / state.sound.duration()) * 100
			}%`;
		},
	},
	getters: {
		// authModalShow: (state) => {
		// 	return state.authModalShow;
		// },
		playing: (state) => {
			if (state.sound.playing()) {
				return state.sound.playing();
			}

			return false;
		},
	},
	actions: {
		async register({ commit }, payload) {
			const { name, user_name, email, age, country, profile_type, password } =
				payload;
			const userCred = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await usersCollection.doc(userCred.user.uid).set({
				name: name,
				username: user_name,
				email: email,
				age: age,
				country: country,
				profile_type: profile_type,
			});

			await userCred.user.updateProfile({
				displayName: user_name,
			});

			commit("toggleAuth");
		},
		async login({ commit }, payload) {
			const { email, password } = payload;

			await auth.signInWithEmailAndPassword(email, password);

			commit("toggleAuth");
		},
		init_login({ commit }) {
			const user = auth.currentUser;
			if (user) {
				commit("toggleAuth");
				console.log("logged in");
			} else {
				console.log("nobody logged in");
			}
		},
		async signOut({ commit }) {
			await auth.signOut();
			commit("toggleAuth");
			// window.location.reload();
			// if (payload.$route.meta.requiresAuth === true) {
			// 	payload.$router.push({ name: "home" });
			// }
		},
		async newSong({ commit, state, dispatch }, payload) {
			commit("newSong", payload);

			state.sound.play();

			state.sound.on("play", () => {
				requestAnimationFrame(() => {
					dispatch("progress");
				});
			});
		},
		async toggleAudio({ state }) {
			if (!state.sound.playing) {
				return;
			}

			if (state.sound.playing()) {
				state.sound.pause();
			} else {
				state.sound.play();
			}
		},
		progress({ commit, state, dispatch }) {
			commit("updatePosition");

			if (state.sound.playing()) {
				requestAnimationFrame(() => {
					dispatch("progress");
				});
			}
		},
		updateSeek({ state, dispatch }, payload) {
			if (!state.sound.playing) {
				return;
			}
			console.log(state, "state");
			console.log(payload, "payload");

			const { x, width } = payload.currentTarget.getBoundingClientRect();

			const clickX = payload.clientX - x;
			const percentage = clickX / width;
			const seconds = state.sound.duration() * percentage;

			state.sound.seek(seconds);

			state.sound.once("seek", () => {
				dispatch("progress");
			});
		},
	},
});
