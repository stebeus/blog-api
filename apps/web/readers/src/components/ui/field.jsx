export const Field = ({ label, helpText, children }) => (
	<label className="flex flex-col gap-1">
		<span className="font-medium">{label}</span>
		{children}
		<span className="text-sm opacity-90">{helpText}</span>
	</label>
);
