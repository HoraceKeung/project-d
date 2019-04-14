<template>
	<div class="relative z-10"><div class="fixed bottom-5 w-full">
		<div class="container px-5 flex justify-end">
			<button type="button" :class="`btn btn-${colour}`" @click="$modal.show('add-entry')">+ ENTRY</button>
		</div>
	</div></div>
</template>
