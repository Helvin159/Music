import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";

export default createStore({
	state: {
		authModalShow: false,
		userLoggedIn: false,
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
	},
	getters: {
		// authModalShow: (state) => {
		// 	return state.authModalShow;
		// },
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
	},
});
