import React from 'react';
import { Link } from 'gatsby';
import Header from './header';

import { rhythm, scale } from '../utils/typography';

const Layout: React.FC<{ location: { pathname: string }; title: string; children: React.ReactNode }> = ({ location, title, children }) => {
	return (
		<div style={{ backgroundColor: '#f3f3f3' }}>
			<header>
				<Header />
			</header>
			<main
				style={{
					marginLeft: `auto`,
					marginRight: `auto`,
					maxWidth: rhythm(24),
					padding: `0 ${rhythm(3 / 4)}`,
				}}
			>
				{children}
			</main>
			<footer>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>
			</footer>
		</div>
	);
};

export default Layout;
