const BASE_URL = 'https://blog-api-76qe.onrender.com/api/v1';

const httpMethods = ['get', 'post', 'patch', 'put', 'delete'];

const userForm = document.querySelector('#user-form');
const articlesForm = document.querySelector('#articles-form');

const getFormData = (form) => Object.fromEntries(new FormData(form));

const sanitizeInput = (input) => (input?.trim() === '' ? null : input);

const isEmpty = (value) => sanitizeInput(value) == null;

const isHttpMethod = (httpMethod) => httpMethods.includes(httpMethod);

const formatHttpMethod = (httpMethod) => httpMethod.toUpperCase();

const formatHttpMethods = (httpMethods) => httpMethods.map(formatHttpMethod).join(', ');

const requiresBody = (httpMethod) => {
	const httpMethodsWithBody = httpMethods.slice(1, 4);
	return httpMethodsWithBody.includes(httpMethod);
};

const handleUserEndpoints = () => {
	const { name } = getFormData(userForm);
	const endpoint = isEmpty(name) ? 'in' : 'up';
	userForm.action = `${BASE_URL}/users/sign-${endpoint}`;
};

const fetchData = async (endpoint, options) => {
	const response = await fetch(`${BASE_URL}/${endpoint}`, options);
	const { status, statusText } = response;

	if (!response.ok) return { status, statusText };

	const { data } = await response.json();

	return data;
};

const handleArticleEndpoints = async (event) => {
	event.preventDefault();

	const [request, jwt, title, articleText, isPublic, author, commentText] = Object.values(
		getFormData(articlesForm),
	).map(sanitizeInput);

	const [httpMethod, endpoint] = request.trim().toLowerCase().split(' ');

	const response = articlesForm.querySelector('#response-output');

	if (!isHttpMethod(httpMethod)) {
		response.textContent = `${httpMethod} is not a valid HTTP method (${formatHttpMethods(httpMethods)})`;
		return;
	}

	const article = isEmpty(title) ? null : { title, content: articleText, isPublic };
	const comment = isEmpty(author) ? null : { author, content: commentText };

	const body = requiresBody(httpMethod) ? JSON.stringify(article ?? comment) : null;

	const options = jwt != null && {
		headers: {
			authorization: `Bearer ${jwt}`,
			'Content-Type': 'application/json; charset=UTF-8',
		},
		method: formatHttpMethod(httpMethod),
		body,
	};

	const data = await fetchData(endpoint, options);
	response.textContent = JSON.stringify(data, null, 2);
};

userForm.addEventListener('submit', handleUserEndpoints);
articlesForm.addEventListener('submit', handleArticleEndpoints);
