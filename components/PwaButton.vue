<template>
	<button v-if="hasDeferredPrompt" type="button" class="btn-pwa" @click="a2hs">
		<div class="ml-auto my-auto mr-1"><img class="h-10 min-w-10" src="/icon.png" alt="logo"></div>
		<p class="mr-auto my-auto font-bold text-sm">ADD TO HOME SCREEN</p>
	</button>
</template>

<script>
export default {
	computed: {
		hasDeferredPrompt () { return this.$store.state.hasDeferredPrompt }
	},
	methods: {
		a2hs () {
			window.__deferredPrompt__.prompt()
			window.__deferredPrompt__.userChoice.then(choiceResult => {
				window.__deferredPrompt__ = undefined
				this.$store.commit('setHasDeferredPrompt', false)
			})
		}
	}
}
</script>

<style scoped>
.btn-pwa {
	@apply w-full bg-dark text-white border-2 flex rounded-lg mb-4 p-1
}
</style>
