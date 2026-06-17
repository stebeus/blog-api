import { Link, useOutletContext } from 'react-router';

import { Card } from '#root/components/ui/card.jsx';
import { List } from '#root/components/ui/list.jsx';
import { Loader } from '#root/components/ui/loader.jsx';
import { UserMeta } from '#root/components/ui/user-meta.jsx';
import { pluralize } from '#root/utils/formatters.js';

const createArticle = ({ id, author, createdAt, title, comments }) => {
	const commentCount = comments.length > 0 && (
		<p>
			{comments.length} {pluralize('comment', comments.length)}
		</p>
	);

	return (
		<li key={id}>
			<Link to={`article/${id}`}>
				<Card className="interactive cursor-pointer">
					<UserMeta username={author.name} dateTime={createdAt} />
					<h2>{title}</h2>
					{commentCount}
				</Card>
			</Link>
		</li>
	);
};

export const Home = () => {
	const [articles, isLoading] = useOutletContext();
	if (isLoading) return <Loader />;
	return <List className="m-auto w-full max-w-[720px]">{articles.map(createArticle)}</List>;
};
