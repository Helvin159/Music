<template>
	<div
		class="text-white text-center font-bold p-4 mb-4"
		v-if="login_show_alert"
		:class="login_alert_variant"
	>
		{{ login_alert_message }}
	</div>
	<!-- Login Form -->
	<vee-form :validation-schema="loginSchema" @submit="login">
		<!-- Email -->
		<div class="mb-3">
			<label class="inline-block mb-2">Email</label>
			<vee-field
				type="email"
				name="email"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Email"
			/>
			<ErrorMessage class="text-red-600" name="email" />
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Password</label>
			<vee-field name="password" :bails="true" v-slot="{ field, errors }">
				<input
					type="password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Password"
					v-bind="field"
				/>
				<div class="text-red-600" v-for="error in errors" :key="error">
					{{ error }}
				</div>
			</vee-field>
		</div>
		<button
			:disabled="login_in_submission"
			type="submit"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
		>
			Submit
		</button>
	</vee-form>
</template>

<script>
export default {
	name: "LoginForm",
	data() {
		return {
			loginSchema: {
				email: "required|email",
				password: "password_required|min:3|max:32",
			},
			login_in_submission: false,
			login_show_alert: false,
			login_alert_variant: "bg-blue-500",
			login_alert_message: "Please wait! You're being logged in.",
		};
	},
	methods: {
		login(values) {
			const { email, password } = values;
			this.login_in_submission = true;
			this.login_show_alert = true;
			this.login_alert_variant = "bg-blue-500";
			this.login_alert_message = "Please wait! We are logging you in.";

			// Succress
			this.login_alert_variant = "bg-green-500";
			this.login_alert_message = "Success!! Logged in!!!";

			console.log({
				email,
				password,
				values: values,
				clg: "Login Values Destructured",
				location: "components/Auth.vue",
			});
		},
	},
};
</script>
