import { ExternalLink } from './ui/external-link.jsx';
import { SvgIcon } from './ui/svg-icon.jsx';

export const Footer = () => (
	<footer className="flex place-content-center place-items-center border border-border-default border-t p-3">
		<p className="separator-pipe">
			© Stebeus 2026.{' '}
			<ExternalLink to="https://opensource.org/license/mit">MIT License</ExternalLink>
		</p>
		<ExternalLink to="https://github.com/stebeus">
			<SvgIcon title="GitHub" className="transition-spin" />
		</ExternalLink>
	</footer>
);
