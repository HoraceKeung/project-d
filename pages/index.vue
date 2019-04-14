<template>
	<section class="flex overflow-hidden">
		<div class="flex flex-col h-screen w-full">
			<app-header/>
			<div class="bg-darker flex-1">
				<div class="container pt-4">
					<p v-if="!entries.length" class="text-center text-white">No entry</p>
					<read-entry v-for="e in entries" :key="e.id" :entry="e"/>
				</div>
			</div>
			<add-button/>
			<modal-add-entry/>
		</div>
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
