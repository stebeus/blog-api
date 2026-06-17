export const pluralize = (word, count, plural) =>
	count !== 1 && plural != null ? plural : `${word}${count === 1 ? '' : 's'}`;

export const formatDate = (date) => {
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	};

	return new Date(date).toLocaleString('en-US', options);
};
