import { kebabCase } from 'change-case';

export const SvgIcon = ({ title }) => {
	const id = kebabCase(title.toLowerCase());

	return (
		<svg width={24} height={24}>
			<title>{title}</title>
			<use href={`/icons.svg#${id}-icon`} />
		</svg>
	);
};
