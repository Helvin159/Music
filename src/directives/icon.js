export default {
	beforeMount(el, binding) {
		let iconClass = `fa fa-${binding.value}`;
		if (binding.arg === "full") {
			iconClass = binding.value;
		}

		if (binding.modifiers.right) {
			iconClass += " float-right";
		}

		if (binding.modifiers.left) {
			iconClass += "float-left";
		}

		if (binding.modifiers.yellow) {
			iconClass += " text-yellow-300";
		} else {
			iconClass += " text-green-500";
		}

		if (binding.modifiers.xl) {
			iconClass += " text-xl";
		}
		// eslint-disable-next-line no-param-reassign
		el.innerHTML += `<i class="${iconClass}"></i>`;
	},
};
