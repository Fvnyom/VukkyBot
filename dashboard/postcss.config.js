module.exports = { //why havent we ported to ES6?
	plugins: {
		"postcss-import": {},
		tailwindcss: { config: "./dashboard/tailwind.config.js" },
		autoprefixer: {},
	}
};