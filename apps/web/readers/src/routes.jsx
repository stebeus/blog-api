import { App } from './app.jsx';
import { Article } from './routes/article.jsx';
import { ErrorPage } from './routes/error.jsx';
import { Home } from './routes/home.jsx';

export const routes = [
	{
		element: <App />,
		errorElement: <ErrorPage />,
		path: '/',
		children: [
			{ index: true, element: <Home /> },
			{ path: 'article', element: <Article /> },
		],
	},
];
