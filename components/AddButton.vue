<template>
	<div class="relative container">
		<div class="absolute right-5 bottom-5">
			<button type="button" :class="`btn btn-${colour}`" @click="$modal.show('add-entry')">+ ENTRY</button>
		</div>
	</div>
</template>
