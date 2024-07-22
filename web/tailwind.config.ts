import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		colors: {
			//"primary": "#0b1eac",
			//"secondary": "#f2f4f7",
			//"tertiary": "#d9e0e7",
			"pink-pulse": "#ff19a3",
			"vibrant-blossom": "#ff78c1",
			sandstorm: "#fabf42",
			"off-white": "#f4f5f0",
			"glow-tech": "#97dfd6",
			"electric-blue": "#00a6ea",
			midnight: "#000816",
		},
	},
	plugins: [],
};
export default config;
