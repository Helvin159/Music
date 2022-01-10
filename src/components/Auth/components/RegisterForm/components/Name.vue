<template>
	<!-- Name -->
	<div class="mb-3">
		<label class="inline-block mb-2">Name</label>
		<vee-field
			as="input"
			type="text"
			name="name"
			class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
			placeholder="Enter Name"
		/>
		<ErrorMessage class="text-red-600" name="name" />
	</div>
</template>

<script>
export default {};
</script>
