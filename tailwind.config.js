const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				blue: {
					// 500: colors.sky[600],
				},
				sky: {
					400: colors.sky[300],
				},
			},
		},
	},
	plugins: [],
}
