export const ExternalLink = ({ to, children }) => (
	<a href={to} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);
