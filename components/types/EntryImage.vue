<template>
	<div>
		<div v-if="image" class="flex flex-col">
			<div class="mx-auto mb-4"><img class="max-w-full" :src="image" alt="image-preview"></div>
			<button type="button" :class="`ml-auto btn btn-${colour}-outline`" @click="cancel">Cancel</button>
		</div>
		<div v-else @dragover.prevent="isDragging=true" @dragleave="isDragging=false" @drop.prevent="onFileSelected($event.dataTransfer.files[0])" :class="'rounded border-2 '+(isDragging?`border-${colour}`:'border-dashed border-gray-700')">
			<input class="hidden" id="image-input" type="file" accept="image/*" @change="onFileSelected($event.target.files[0])">
			<div class="text-center text-white px-4 py-16">
				<p>Drag and drop</p>
				<p>image here, or <label for="image-input" :class="`cursor-pointer link font-bold text-${colour}`">browse your files</label></p>
			</div>
		</div>
	</div>
</template>

<script>
import util from '~/assets/js/util'
export default {
	props: ['content'],
	methods: {
		async onFileSelected (file) {
			this.isDragging = false
			this.mime = file.type
			this.arrayBuffer = await util.blobToArrayBuffer(file)
			const reader = new FileReader()
			reader.onload = () => {
				this.image = reader.result
			}
			reader.readAsDataURL(file)
		},
		cancel () {
			this.mime = null
			this.image = null
			this.arrayBuffer = null
		}
	},
	watch: {
		arrayBuffer (val) {
			this.$emit('update:content', val ? {buffer: val, mime: this.mime} : null)
		}
	},
	data: () => ({
		isDragging: false,
		mime: null,
		image: null,
		arrayBuffer: null
	})
}
</script>
