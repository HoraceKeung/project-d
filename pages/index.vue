<template>
	<section class="flex flex-col h-screen">
		<app-header/>
		<div class="bg-darker flex-1">
			<div class="container">

			</div>
		</div>
		<add-button/>
		<modal-add-entry/>
	</section>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AddButton from '~/components/AddButton'
import ModalAddEntry from '~/components/ModalAddEntry'
export default {
	components: {AppHeader, AddButton, ModalAddEntry},
	computed: {
		entries () { return this.$store.state.entries }
	}
}
</script>
