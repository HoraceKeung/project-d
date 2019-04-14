import localforage from "localforage"

export const plugins = [(store => {
	store.subscribe((mutation, state) => {
		if (state.persistentMutations.includes(mutation.type)) {
			localforage.setItem(mutation.type, mutation.payload)
		}
	})
})]

export const state = () => ({
	persistentMutations: ['setDeviceId', 'setEntries'],
	deviceId: null,
	colour: 'red',
	entries: []
})

export const mutations = {
	setDeviceId (state, id) { state.deviceId = id },
	setColour (state, colour) { state.colour = colour },
	setEntries (state, arr) { state.entries = arr }
}
