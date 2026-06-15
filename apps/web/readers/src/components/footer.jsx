import { ExternalLink } from './ui/external-link.jsx';
import { SvgIcon } from './ui/svg-icon.jsx';

export const Footer = () => (
	<footer>
		<p>
			© Stebeus 2026.{' '}
			<ExternalLink to="https://opensource.org/license/mit">MIT License</ExternalLink>
		</p>
		<ExternalLink to="https://github.com/stebeus">
			<SvgIcon title="GitHub" />
		</ExternalLink>
	</footer>
);
