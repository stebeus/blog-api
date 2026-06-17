import { formatDate } from '#root/utils/formatters.js';

export const UserMeta = ({ username, dateTime }) => (
	<p>
		<span className="separator-disc font-medium text-content">{username}</span>
		<time dateTime={dateTime}>{formatDate(dateTime)}</time>
	</p>
);
