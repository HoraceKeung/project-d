<template>
	<div class="flex"><div class="mx-auto">
		<audio id="myAudio" :class="`video-js vjs-default-skin bg-${colour}`"></audio>
	</div></div>
</template>

<script>
import videojs from 'video.js'
import WaveSurfer from 'wavesurfer.js'
import 'webrtc-adapter'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
WaveSurfer.microphone = MicrophonePlugin
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js'
import Record from 'videojs-record/dist/videojs.record.js'
import util from '~/assets/js/util'
export default {
	props: ['content'],
	mounted () {
		this.player = videojs('#myAudio', this.options)
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
		player: '',
		options: {
			controls: true,
			fluid: false,
			width: 565,
			height: 300,
			plugins: {
				wavesurfer: {
					src: 'live',
					waveColor: 'white',
					progressColor: '#24292e',
					cursorWidth: 1,
					msDisplayMax: 20,
					hideScrollbar: true
				},
				record: {
					audio: true,
					video: false,
					maxLength: 20
				}
			}
		}
	})
}
</script>
