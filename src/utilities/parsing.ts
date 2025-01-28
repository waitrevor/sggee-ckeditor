// data.ts

/* Remove Null and Empty Arrays from Object
	1. Use Object.entries to get an array of key-value pairs
	2. Use Array.prototype.filter to exclude entries with null values or empty arrays
	3. Use Object.fromEntries to convert the filtered array back to an object
*/
export const removeNullAndEmptyArrays = (obj: Object) => {
	const entries = Object.entries(obj);
	const filteredEntries = entries.filter(([key, value]) => value !== null && !(Array.isArray(value) && value.length === 0));
	const result = Object.fromEntries(filteredEntries);
	return result;
}

/* Truncates texts and adds a suffix when the length is past nChars. */
export const truncateText = (text: string, nChars: number = 25, suffix: string = '...'): string => {
	if (!text) {
	  text = '';
	}
	const result = text.slice(0, nChars);
	return result.length < nChars ? result : result + suffix;
};

export function parseUrl(urlString: string) {
	const searchIndex = urlString.indexOf('?');
	if (searchIndex !== -1) {
		const queryString = urlString.substring(searchIndex + 1);
		const params = new URLSearchParams(queryString);
		return Object.fromEntries(params.entries());
	}
	return {};
}

export function extractIdsWithClass(htmlContent: string, includedClass: string) {
	// Filter elements based on the presence of the specific class
	const div = document.createElement('div');
	div.innerHTML = htmlContent;
	const elementsWithId = div.querySelectorAll('[id]');
	const filteredElements = Array.from(elementsWithId).filter((element) => {
	  const classList = element.getAttribute('class');
	  return classList && classList.includes(includedClass);
	});
	return filteredElements.map((element) => element.id);
}

export const checkUrlForLabel = (modifier: string = ''): string => {
	const url = window.location.href;
	if (url.includes('birth')) {
	  return `Birth${modifier}`;
	} else if (url.includes('death')) {
	  return `Death${modifier}`;
	} else if (url.includes('marriage')) {
	  return `Marriage${modifier}`;
	}
	return modifier.trim();
};
