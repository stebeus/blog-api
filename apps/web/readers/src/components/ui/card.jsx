export const Card = ({ className, children }) => (
	<article className={`flex flex-col gap-1 rounded border border-border-default p-6 ${className}`}>
		{children}
	</article>
);
