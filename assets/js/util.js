const util = {
	blobToArrayBuffer (blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.addEventListener('loadend', (e) => {
				resolve(reader.result)
			})
			reader.addEventListener('error', reject)
			reader.readAsArrayBuffer(blob)
		})
	},
	arrayBufferToBlob (buffer, type) {
		return new Blob([buffer], {type})
	}
}

export default util
