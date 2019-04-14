<template>
	<div class="flex flex-col">
		<textarea class="rounded w-full p-2 mb-2 bg-dark text-white" rows="9" :maxlength="maxlength" v-model="text"/>
		<div class="ml-auto h-6 w-6">
			<div class="absolute h-6 w-6 flex">
				<p v-show="remainChar<11" class="text-white text-xs m-auto">{{remainChar}}</p>
			</div>
			<div style="transform: rotate(-90deg);">
				<svg class="h-full w-full" viewBox="0 0 20 20">
					<circle cx="50%" cy="50%" stroke-width="2" r="9" fill="none" stroke="white"/>
					<circle cx="50%" cy="50%" stroke-width="2" r="9" fill="none" :stroke="circleColour" :style="`stroke-dashoffset: ${56.5487 - 56.5487 * textLength / maxlength}; stroke-dasharray: 56.5487;`"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['content'],
	computed: {
		textLength () { return this.text.length },
		remainChar () { return this.maxlength - this.textLength },
		circleColour () {
			let defaultConfig = require('tailwindcss/defaultConfig')
			return defaultConfig.theme.colors[this.colour]['500']
		}
	},
	watch: {
		text (val) {
			this.$emit('update:content', val)
		}
	},
	data: () => ({
		maxlength: 500,
		text: ''
	})
}
</script>
