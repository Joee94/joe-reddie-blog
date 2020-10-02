import React from 'react';
import { Link } from 'gatsby';
import Header from './header';

import { rhythm, scale } from '../utils/typography';

const Layout: React.FC<{ location: { pathname: string }; title: string; children: React.ReactNode }> = ({ location, title, children }) => {
	//@ts-ignore
	const rootPath = `${__PATH_PREFIX__}/`;

	return (
		<div
			style={{
				marginLeft: `auto`,
				marginRight: `auto`,
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
		>
			<header>
				<Header />
			</header>
			<main>{children}</main>
			<footer>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>
			</footer>
		</div>
	);
};

export default Layout;
