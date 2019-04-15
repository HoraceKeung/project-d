<template>
	<div class="bg-dark text-white p-4 max-w-3xl mx-auto border-b border-gray-700">
		<div class="flex text-sm mb-2">
			<p class="font-bold mr-4 my-auto">{{entry.date | date}}</p>
			<p class="opacity-50 my-auto">{{entry.type}}</p>
			<button type="button" :class="`btn btn-${colour}-outline ml-auto`" @click="deleteEntry">Delete</button>
		</div>
		<div v-if="entry.type==='Text'">
			<p v-for="(p,index) in entry.content.split('\n')" :key="entry.id+index">{{p}}</p>
		</div>
		<div v-else-if="entry.type==='Image' && media">
			<img class="max-w-full" :src="media" alt="image">
		</div>
		<div v-else-if="entry.type==='Video' && media">
			<video width="320" height="240" controls>
				<source :src="media" :type="this.entry.content.mime">
			</video>
		</div>
	</div>
</template>

<script>
import util from '~/assets/js/util'
export default {
	props: {
		entry: {type: Object, required: true}
	},
	created () {
		if (this.entry.type !== 'Text') {
			const blob = util.arrayBufferToBlob(this.entry.content.buffer, this.entry.content.mime)
			const reader = new FileReader()
			reader.onload = () => {
				this.media = reader.result
			}
			reader.readAsDataURL(blob)
		}
	},
	methods: {
		deleteEntry () {
			let clone = this.$store.state.entries.slice(0)
			clone.splice(clone.findIndex(e => e.id === this.entry.id), 1)
			this.$store.commit('setEntries', clone)
		}
	},
	data: () => ({
		media: null
	}),
	filters: {
		date (val) {
			return new Intl.DateTimeFormat('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			}).format(new Date(val))
		}
	}
}
</script>
