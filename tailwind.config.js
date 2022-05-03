module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					brand: '#89c438',
					brand_light: '#a2e93f',
					background: '#f9fafd',
					sidebar: '#303030',
					dark: '#212529',
					darkText: '#07162d'
				}
			},
			backgroundImage: {
				'intro_bg': 'linear-gradient(117.71deg,#242424 18.76%,#4a4848 43.13%,#7c8393 96.83%)',
				'right_gradient': "linear-gradient(267.72deg,rgba(92,91,91,.1) 3.42%,rgba(116,130,153,.25))",
				'info_gradient': 'linear-gradient(91.2deg,#686868 2.58%,rgba(86,86,86,.3) 103.63%)',
				'card_gradient': 'linear-gradient(rgba(9,27,54,.8),rgba(9,27,54,.2))',
				'pools_header': 'linear-gradient(180deg,#3a3a3a,#626262)',
				'elipseBg': 'url("./assets/images/ellipse1.png")',
			},
			fontFamily: {
				comfortaa: '"Comfortaa", cursive',
				roboto: '"Roboto", sans-serif',
			},
			dropShadow: {
				search: 'inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(217,217,217,.35)'
			},
			gridTemplateColumns: {
				analytics: '0px 2fr repeat(5, 1fr)'
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		}),
	],
};
