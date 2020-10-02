import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { rhythm } from '../utils/typography';

const Header = () => {
	const data = useStaticQuery(graphql`
		query HeaderQuery {
			site {
				siteMetadata {
					title
					subtitle

					social {
						twitter
					}
				}
			}
		}
	`);

	const { title, subtitle, social } = data.site.siteMetadata;
	return (
		<div
			style={{
				display: `flex`,
				marginBottom: rhythm(2.5),
				backgroundColor: 'white',
			}}
		>
			<h1
				style={{
					marginLeft: `auto`,
					marginRight: `auto`,
				}}
			>
				<strong>{title}</strong> {subtitle}
			</h1>
		</div>
	);
};

export default Header;
