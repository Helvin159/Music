<template>
	<div class="border border-gray-200 p-3 mb-4 rounded">
		<div v-show="!showForm">
			<h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
				@click.prevent="deleteSong"
			>
				<i class="fa fa-times"></i>
			</button>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
				@click.prevent="showForm = !showForm"
			>
				<i class="fa fa-pencil-alt"></i>
			</button>
		</div>

		<div v-show="showForm">
			<div
				class="text-white text-center font-bold p-4 mb-4"
				v-if="showAlert"
				:class="alertVariant"
			>
				{{ alertMessage }}
			</div>
			<vee-form
				:validation-schema="schema"
				:initial-values="song"
				@submit="edit"
			>
				<div class="mb-3">
					<label class="inline-block mb-2">Song Title</label>
					<vee-field
						type="text"
						name="modified_name"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Song Title"
						@input="updateUnsavedFlag(true)"
					/>
					<ErrorMessage class="text-red-600" name="modified_name" />
				</div>
				<div class="mb-3">
					<label class="inline-block mb-2">Genre</label>
					<vee-field
						type="text"
						name="genre"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Genre"
						@input="updateUnsavedFlag"
					/>
					<ErrorMessage class="text-red-600" name="genre" />
				</div>
				<button
					type="submit"
					class="py-1.5 px-3 rounded text-white bg-green-600"
				>
					Submit
				</button>
				<button
					type="button"
					class="py-1.5 px-3 rounded text-white bg-gray-600"
					@click.prevent="showForm = !showForm"
				>
					Go Back
				</button>
			</vee-form>
		</div>
	</div>
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase.js";

export default {
	name: "CompositionItem",
	props: {
		song: {
			type: Object,
			required: true,
		},
		updateSong: {
			type: Function,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
		removeSong: {
			type: Function,
			required: true,
		},
		updateUnsavedFlag: {
			type: Function,
		},
	},
	data() {
		return {
			showForm: false,
			schema: {
				modified_name: "required",
				genre: "alpha_spaces",
			},
			inSubmission: false,
			showAlert: false,
			alertVariant: "bg-blue-500",
			alertMessage: "Please wait, updating song info!",
		};
	},
	methods: {
		async edit(values) {
			// console.log("song edit");
			this.inSubmission = true;
			this.showAlert = true;
			this.alertVariant = "bg-blue-500";
			this.alertMessage = "Please wait! Updating info!";

			try {
				await songsCollection.doc(this.song.docID).update(values);
			} catch (err) {
				this.inSubmission = false;
				this.alertVariant = "bg-red-500";
				this.alertMessage = "Something wen't wrong! Please try again later.";
				// console.log(err);
				return;
			}

			this.updateSong(this.index, values);
			this.updateUnsavedFlag(false);
			this.inSubmission = false;
			this.alertVariant = "bg-green-500";
			this.alertMessage = "Success!!";
			// this.showForm = !this.showForm;
			setTimeout(() => {
				this.showAlert = false;
				this.showForm = !this.showForm;
			}, 1500);
		},
		async deleteSong(values) {
			const storageRef = storage.ref();
			const songRef = storageRef.child(`songs/${this.song.original_name}`);

			await songRef.delete();
			await songsCollection.doc(this.song.docID).delete();

			this.removeSong(this.index);
		},
	},
};
</script>
