import { useEffect, useState } from 'react';

import { VITE_API_URL } from '#root/config.js';

export const useFetch = (resource, options) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const url = `${VITE_API_URL}/${resource}`;

			try {
				const res = await fetch(url, options);

				if (!res.ok) throw new Error(`Response status: ${res.status}`);

				const { data } = await res.json();

				setData(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [resource, options]);

	return [data, isLoading, error];
};
