import whitelister from 'purgecss-whitelister'

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
		whitelist: () => whitelister([
			'./assets/css/*.css'
		])
	},
	build: {
		extractCSS: true,
		// Run ESLint on save
		extend(config, ctx) {
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
