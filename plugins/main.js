import Vue from 'vue'
import uuid from 'uuid/v4'
import localforage from "localforage"
import VModal from 'vue-js-modal'
Vue.use(VModal)

// Global mixin
Vue.mixin({
	computed: {
		colour () { return this.$store.state.colour }
	}
})

export default async ({ store }) => {
	// Load state from indexedDB to store
	await Promise.all(store.state.persistentMutations.map(m => localforage.getItem(m))).then(values => {
		values.forEach((v, index) => {
			if (v) store.commit(store.state.persistentMutations[index], v)
		})
	})
	if (!store.state.deviceId) store.commit('setDeviceId', uuid())
	window.addEventListener('beforeinstallprompt', e => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault()
		// Stash the event so it can be triggered later.
		window.__deferredPrompt__ = e
		store.commit('setHasDeferredPrompt', true)
	})
}
