import {
	Form as VeeForm,
	Field as VeeField,
	defineRule,
	configure,
	ErrorMessage,
} from "vee-validate";
import {
	required,
	min,
	max,
	email,
	min_value as minValue,
	max_value as maxValue,
	confirmed,
	not_one_of as excluded,
	alpha_spaces as alphaSpaces,
} from "@vee-validate/rules";

export default {
	install(app) {
		app.component("VeeForm", VeeForm);
		app.component("VeeField", VeeField);
		app.component("ErrorMessage", ErrorMessage);

		defineRule("required", required);
		defineRule("password_required", required);
		defineRule("name_required", required);
		defineRule("tos", required);
		defineRule("min", min);
		defineRule("max", max);
		defineRule("min_value", minValue);
		defineRule("max_value", maxValue);
		defineRule("email", email);
		defineRule("alpha_spaces", alphaSpaces);
		defineRule("confirmed", confirmed);
		defineRule("passwords_mismatch", confirmed);
		defineRule("excluded", excluded);
		defineRule("country_excluded", excluded);

		configure({
			generateMessage: (ctx) => {
				const messages = {
					required: `The ${ctx.field} is required.`,
					password_required: `A ${ctx.field} is required.`,
					name_required: `Your ${ctx.field} is required.`,
					min: `The ${ctx.field} is too short.`,
					max: `The ${ctx.field} is too long.`,
					alpha_spaces: `The ${ctx.field} may only contain alphabetic characters and spaces.`,
					min_value: `Your ${ctx.field} is too low.`,
					max_value: `Your ${ctx.field} is too high.`,
					email: `Your ${ctx.field} has to be a valid email.`,
					excluded: `The ${ctx.field} is not accepted at this time.`,
					country_excluded: `Due to restrictions, we currently do not accept registration from this location.`,
					passwords_mismatch: `The passwords don't match.`,
					tos: `You must accept the terms of service.`,
				};

				const message = messages[ctx.rule.name]
					? messages[ctx.rule.name]
					: `The field ${ctx.field} is invalid`;

				return message;
			},
			validateOnBlur: true,
			validateOnChange: true,
			validateOnInput: true,
			validateOnModelUpdate: true,
		});
	},
};
