export const getEmojiFlag = ( countryCode ) => {
	return String.fromCodePoint(
		...countryCode
			.toUpperCase()
			.split( '' )
			.map( ( char ) => 127397 + char.charCodeAt() )
	);
};

export const strippedRenderedExcerpt = ( renderedExcerpt ) => {
	if ( ! renderedExcerpt ) return '';
	const document = new window.DOMParser().parseFromString(
		renderedExcerpt,
		'text/html'
	);
	return document.body.textContent || document.body.innerText || '';
};
