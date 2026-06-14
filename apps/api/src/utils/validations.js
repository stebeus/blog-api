export const useMin = (min = 1, field = 'Field') => [
	min,
	min === 1 ? `${field} is required` : `${field} must be at least ${min} characters long`,
];

export const useMax = (max = 1, field = 'Field') => {
	const withPlural = max === 1 ? '' : 's';
	return [max, `${field} cannot be longer than ${max} character${withPlural}`];
};
