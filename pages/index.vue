<template>
	<section class="flex flex-col h-screen w-full">
		<app-header/>
		<div class="flex-1">
			<div class="container p-4">
				<p v-if="!entries.length" class="text-center text-white">No entry</p>
				<read-entry v-for="e in entries" :key="e.id" :entry="e"/>
			</div>
		</div>
		<add-button/>
		<modal-add-entry/>
		<settings/>
	</section>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AddButton from '~/components/AddButton'
import ModalAddEntry from '~/components/ModalAddEntry'
import Settings from '~/components/Settings'
import ReadEntry from '~/components/ReadEntry'
export default {
	components: {AppHeader, AddButton, ModalAddEntry, Settings, ReadEntry},
	computed: {
		entries () { return this.$store.state.entries }
	}
}
</script>
