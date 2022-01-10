import { isSwitchStatement } from "typescript";
import { createStore } from "vuex";

export default createStore({
	state: {
		authModalShow: false,
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
			console.log({
				value: state.authModalShow,
				location: "toggleAuthModal store/index.js",
			});
		},
	},
	getters: {
		// authModalShow: (state) => {
		// 	return state.authModalShow;
		// },
	},
});
