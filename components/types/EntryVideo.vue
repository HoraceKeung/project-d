<template>
	<div class="flex"><div class="mx-auto">
		<video id="myVideo" class="video-js vjs-default-skin" playsinline></video>
	</div></div>
</template>

<script>
import videojs from 'video.js'
import Record from 'videojs-record/dist/videojs.record.js'
import util from '~/assets/js/util'
export default {
	props: ['content'],
	mounted () {
		this.player = videojs('#myVideo', {
			controls: true,
			autoplay: false,
			fluid: false,
			loop: false,
			width: (window.innerWidth > 600 ? 600 : window.innerWidth) - 32,
			height: 240,
			controlBar: {
				volumePanel: false
			},
			plugins: {
				record: {
					audio: false,
					video: true
				}
			}
		})
		this.player.on('deviceReady', () => {
			console.log('device is ready!')
		})
		this.player.on('startRecord', () => {
			console.log('started recording!')
		})
		this.player.on('finishRecord', async () => {
			console.log('finished recording: ', this.player.recordedData)
			const buffer = await util.blobToArrayBuffer(this.player.recordedData)
			this.$emit('update:content', {buffer, mime: this.player.recordedData.type})
		})
		this.player.on('error', (element, error) => {
			console.warn(error)
		})
		this.player.on('deviceError', () => {
			console.error('device error:', this.player.deviceErrorCode)
		})
	},
	beforeDestroy () {
		this.$emit('update:content', null)
		if (this.player) this.player.dispose()
	},
	data: () => ({
		player: ''
	})
}
</script>
