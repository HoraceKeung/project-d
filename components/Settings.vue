<template>
	<div class="relative z-20">
		<div v-show="$store.state.showSettings" class="settings-overlay" @click="$store.commit('setShowSettings', false)"></div>
		<div class="fixed bg-dark text-white w-64 h-full transition top-0" :style="`right: ${$store.state.showSettings?'0':'-16rem'};`">
			<div class="h-16 flex justify-between px-2 border-b border-gray-700">
				<p class="font-bold text-xl my-auto">Settings</p>
				<div :class="`hover-${colour} h-8 w-8 flex rounded-full cursor-pointer transition my-auto`" @click="$store.commit('setShowSettings', false)">
					<div class="m-auto">
						<img class="h-4 w-4" src="~/assets/img/white-cross.png" alt="close">
					</div>
				</div>
			</div>
			<div class="p-4">
				<p class="mb-2">Colour</p>
				<div class="flex flex-wrap -mx-1">
					<div v-for="c in colours" :key="c" class="w-1/2 px-1 mb-2">
						<button type="button" :class="`btn btn-${c} w-full capitalize`" :disabled="c===colour" @click="$store.commit('setColour', c)">{{c}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		colours: [
			'gray',
			'red',
			'orange',
			'yellow',
			'green',
			'teal',
			'blue',
			'indigo',
			'purple',
			'pink'
		]
	})
}
</script>

<style scoped>
.settings-overlay {
	background-color: rgba(0, 0, 0, 0.7);
	@apply fixed inset-0 flex
}
</style>
