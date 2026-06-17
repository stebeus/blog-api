import { Outlet } from 'react-router';

import { Footer } from './components/footer.jsx';
import { Navbar } from './components/navbar.jsx';
import { useFetch } from './hooks/fetch.js';

export const App = () => {
	const [articles, isLoading, error] = useFetch('articles?isPublic=true');

	return (
		<div className="min-block-screen grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] gap-4">
			<Navbar />
			<main>
				<Outlet context={[articles, isLoading, error]} />
			</main>
			<Footer />
		</div>
	);
};
