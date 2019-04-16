import localforage from "localforage"

export const plugins = [(store => {
	store.subscribe((mutation, state) => {
		if (state.persistentMutations.includes(mutation.type)) {
			localforage.setItem(mutation.type, mutation.payload)
		}
	})
})]

export const state = () => ({
	persistentMutations: ['setDeviceId', 'setColour', 'setEntries'],
	deviceId: null,
	colour: 'gray',
	entries: [],
	showSettings: false,
	hasDeferredPrompt: false
})

export const mutations = {
	setDeviceId (state, id) { state.deviceId = id },
	setColour (state, colour) { state.colour = colour },
	setEntries (state, arr) { state.entries = arr },
	setShowSettings (state, bool) { state.showSettings = bool },
	setHasDeferredPrompt (state, bool) { state.hasDeferredPrompt = bool }
}
