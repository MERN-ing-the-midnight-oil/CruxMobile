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
		"#FF6347", // tomato
		"#4682B4", // steelblue
		"#FF4500", // orangered
		"#DA70D6", // orchid
		"#6495ED", // cornflowerblue
		"#FFD700", // gold
		"#6A5ACD", // slateblue
		"#FF69B4", // hotpink
		"#1E90FF", // dodgerblue
		"#D2691E", // chocolate
	];
	return colors[hash % colors.length];
}
