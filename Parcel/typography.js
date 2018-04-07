import Typography from "typography";

const typography = new Typography({
	baseFontSize: "18",
	baseLineHeight: 1.666,
	googleFonts: [
		{
			name: "Droid Sans Mono",
			styles: ["700"]
		},
		{
			name: "Consolas",
			styles: ["400"]
		}
	],
	headerFontFamily: ["Droid Sans Mono", "Consolas"],
	bodyFontFamily: ["Monserrat", "Consolas"]
});

typography.injectStyles()

export default typography;