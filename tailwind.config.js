let defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
	theme: {
		colors: {...defaultConfig.theme.colors,
			dark: '#24292e',
			darker: '#16191d'
		},
		inset: {...defaultConfig.theme.inset,
			...defaultConfig.theme.spacing
		},
		container: {
			center: true
		}
	}
}
