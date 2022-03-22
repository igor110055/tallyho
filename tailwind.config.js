module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					brand: '#89c438',
					background: '#f9fafd',
					sidebar: '#303030',
					dark: '#212529',
				}
			},
			backgroundImage: {
				'intro_bg': 'linear-gradient(117.71deg,#242424 18.76%,#4a4848 43.13%,#7c8393 96.83%)'
			}
		},
	},
	plugins: [
	],
};
