import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

type DataProps = {
	site: {
		siteMetadata: { title: string };
	};
	markdownRemark: {
		frontmatter: {
			title: string;
			description: string;
			date: string;
		};
		html: string;
		excerpt: string;
	};
};

type Page = { fields: { slug: string }; frontmatter: { title: string } };

type PageContext = { next: Page; previous: Page };

const BlogPostTemplate: React.FC<PageProps<DataProps, PageContext, string>> = ({ data, pageContext, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<Layout location={location} title={siteTitle}>
			<SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
			<article>
				<header>
					<h1
						style={{
							marginTop: rhythm(1),
							marginBottom: 0,
						}}
					>
						{post.frontmatter.title}
					</h1>
					<p
						style={{
							...scale(-1 / 5),
							display: `block`,
							marginBottom: rhythm(1),
						}}
					>
						{post.frontmatter.date}
					</p>
				</header>
				<section dangerouslySetInnerHTML={{ __html: post.html }} />
				<hr
					style={{
						marginBottom: rhythm(1),
					}}
				/>
			</article>

			<nav>
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`;
