<template>
	<modal name="add-entry" adaptive height="auto" classes="rounded-lg" @before-open="reset" :clickToClose="false">
		<div class="bg-dark h-16 px-3 flex justify-between">
			<div :class="`hover-${colour} h-8 w-8 flex rounded-full cursor-pointer transition my-auto`" @click="type?reset():$modal.hide('add-entry')">
				<div class="m-auto">
					<img v-if="type" class="h-4" src="~/assets/img/back.png" alt="close">
					<img v-else class="h-4 w-4" src="~/assets/img/white-cross.png" alt="close">
				</div>
			</div>
			<button v-if="type" type="button" :class="`btn btn-${colour} my-auto`" @click="save" :disabled="!content">SAVE</button>
		</div>
		<div class="bg-darker p-4">
			<component v-if="type" :is="`Entry${type}`" :content.sync="content"/>
			<div v-else>
				<p class="text-white mb-2">Pick an entry type</p>
				<div class="flex -mx-1 sm:-mx-2">
					<div v-for="t in diaryTypes" :key="t" class="w-1/4 px-1 sm:px-2">
						<button type="button" :class="`btn btn-${colour} w-full uppercase text-sm sm:text-base`" @click="type=t">{{t}}</button>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
import uuid from 'uuid/v4'
import EntryText from '~/components/types/EntryText'
import EntryImage from '~/components/types/EntryImage'
import EntryAudio from '~/components/types/EntryAudio'
import EntryVideo from '~/components/types/EntryVideo'
export default {
	components: {EntryText, EntryImage, EntryAudio, EntryVideo},
	computed: {
		entries () { return this.$store.state.entries || [] }
	},
	methods: {
		reset () {
			this.type = null
			this.content = null
		},
		save () {
			this.$store.commit('setEntries', this.entries.concat([{
				id: uuid(),
				deviceId: this.$store.state.deviceId,
				date: new Date().toISOString(),
				type: this.type,
				content: this.content
			}]))
			this.$modal.hide('add-entry')
		}
	},
	data: () => ({
		diaryTypes: ['Text', 'Image', 'Audio', 'Video'],
		type: null,
		content: null
	})
}
</script>
