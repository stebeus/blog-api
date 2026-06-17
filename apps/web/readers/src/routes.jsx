import { App } from './app.jsx';
import { Article } from './routes/article.jsx';
import { Home } from './routes/home.jsx';

export const routes = [
	{
		element: <App />,
		path: '/',
		children: [
			{ index: true, element: <Home /> },
			{ path: 'article/:id', element: <Article /> },
		],
	},
];
