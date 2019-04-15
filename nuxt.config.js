import whitelister from 'purgecss-whitelister'
const webpack = require('webpack')

export default {
	mode: 'spa',
	loading: false,
	head: {},
	meta: {
		nativeUI: true
	},
	manifest: {
		name: 'Diary',
		short_name: 'Diary',
		theme_color: '#24292e',
		orientation: 'portrait'
	},
	modules: ['nuxt-purgecss', '@nuxtjs/pwa'],
	purgeCSS: {
		mode: 'postcss',
		whitelist: () => whitelister([
			'./assets/css/*.css',
			'./node_modules/video.js/dist/video-js.css',
			'./node_modules/videojs-record/dist/css/videojs.record.css'
		])
	},
	build: {
		postcss: {
			plugins: {
				tailwindcss: './tailwind.config.js'
			}
		},
		// Run ESLint on save
		extend(config, ctx) {
			config.resolve.alias['videojs'] = 'video.js'
			config.resolve.alias['WaveSurfer'] = 'wavesurfer.js'
			config.resolve.alias['RecordRTC'] = 'recordrtc'
			config.plugins.push(new webpack.ProvidePlugin({
				videojs: 'video.js/dist/video.cjs.js',
				RecordRTC: 'recordrtc',
				MediaStreamRecorder: ['recordrtc', 'MediaStreamRecorder']
			}))
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules|plugins)/
				})
			}
		}
	},
	css: ['~/assets/css/global.css'],
	plugins: ['~/plugins/main.js']
}
