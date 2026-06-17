import { useOutletContext, useParams } from 'react-router';

import { Card } from '#root/components/ui/card.jsx';
import { Field } from '#root/components/ui/field.jsx';
import { List } from '#root/components/ui/list.jsx';
import { Loader } from '#root/components/ui/loader.jsx';
import { UserMeta } from '#root/components/ui/user-meta.jsx';
import { VITE_API_URL } from '#root/config.js';
import { pluralize } from '#root/utils/formatters.js';

const isArticle = (id) => (article) => String(article.id) === id;

const createComment = ({ id, author, createdAt, content }) => (
	<li key={id}>
		<Card>
			<UserMeta username={author} dateTime={createdAt} />
			<p>{content}</p>
		</Card>
	</li>
);

export const Article = () => {
	const { id } = useParams();
	const [articles, isLoading] = useOutletContext();

	if (isLoading) return <Loader />;

	const [{ author, createdAt, title, content, comments }] = articles.filter(isArticle(id));

	return (
		<Card className="m-auto w-full max-w-[80ch] gap-6 p-8">
			<section className="flex flex-col gap-4">
				<UserMeta username={author.name} dateTime={createdAt} />
				<h2 className="text-3xl">{title}</h2>
				{content}
			</section>

			<hr className="border-border-default" />

			<section className="flex flex-col gap-4">
				<h2>
					{comments.length} {pluralize('Comment', comments.length)}
				</h2>

				<fieldset className="flex flex-col gap-4 rounded border border-border-default p-6">
					<legend className="contents font-medium">Add to the discussion</legend>
					<form
						className="flex flex-col gap-4"
						action={`${VITE_API_URL}/articles/${id}/comments`}
						method="post"
					>
						<Field label="Your name" helpText="Max characters: 100">
							<input
								className="rounded border border-border-default p-2"
								type="text"
								name="author"
								placeholder="John Doe"
								autoComplete="name"
								maxLength={100}
								required
							/>
						</Field>
						<Field label="Content" helpText="Max characters: 500">
							<textarea
								className="rounded border border-border-default p-2"
								name="content"
								maxLength={500}
								required
							></textarea>
						</Field>
						<button
							className="interactive cursor-pointer rounded border border-border-default px-4 py-2 font-medium"
							type="submit"
						>
							Post
						</button>
					</form>
				</fieldset>
				<hr className="my-3 border-border-default" />
				<List>{comments.map(createComment)}</List>
			</section>
		</Card>
	);
};
