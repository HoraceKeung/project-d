<template>
	<div class="container p-2 flex justify-between">
		<div><img class="h-12 w-12" src="/icon.png" alt="app-icon"></div>
		<button type="button" :class="`btn btn-${colour}-outline my-auto`" @click="$store.commit('setShowSettings', true)">Settings</button>
	</div>
</template>
