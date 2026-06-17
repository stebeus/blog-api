import { Link } from 'react-router';

export const Navbar = () => (
	<header className="sticky top-0 border-border-default border-b bg-base/90 px-4 py-2 backdrop-blur-md">
		<h1 className="text-xl" title="Homepage">
			<Link to="/">Blog</Link>
		</h1>
	</header>
);
