function simpleHash(str) {
	if (!str || typeof str !== "string") {
		return 0;
	}

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

export function getClueColor(clue) {
	const hash = simpleHash(clue);
	const colors = [
		"#00BFFF", // deepskyblue
		"#5F9EA0", // cadetblue
		"#4682B4", // steelblue
		"#7B68EE", // mediumslateblue
		"#6A5ACD", // slateblue
		"#48D1CC", // mediumturquoise
		"#00CED1", // darkturquoise
		"#20B2AA", // lightseagreen
		"#40E0D0", // turquoise
		"#8B4513", // saddlebrown
		"#A0522D", // sienna
		"#D2691E", // chocolate
		"#CD853F", // peru
		"#BC8F8F", // rosybrown
		"#F4A460", // sandybrown
		"#D2B48C", // tan
		"#8FBC8F", // darkseagreen
		"#556B2F", // darkolivegreen
		"#FF6347", // tomato
		"#4682B4", // steelblue (used for good contrast)
	];
	return colors[hash % colors.length];
}
