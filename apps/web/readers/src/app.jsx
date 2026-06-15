import { Outlet } from 'react-router';

import { Footer } from './components/footer.jsx';
import { Navbar } from './components/navbar.jsx';

export const App = () => (
	<>
		<Navbar />
		<main>
			<Outlet />
		</main>
		<Footer />
	</>
);
