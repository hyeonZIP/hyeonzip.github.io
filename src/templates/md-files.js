import React from "react"
import {Link, graphql } from "gatsby"
import Layout from "../components/layout"
import {GatsbyImage, getImage} from "gatsby-plugin-image"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const thumbnailImg = getImage(frontmatter.thumbnail?.childImageSharp?.gatsbyImageData)


  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div className="i-title">{frontmatter.title}</div>
          <GatsbyImage className="thumnail" image={thumbnailImg} alt="Thumbnail" />
          <h2>{frontmatter.date}</h2>
          {console.log("test : " + frontmatter.tag)}
          {(frontmatter.tag != null) ? frontmatter.tag.split(",").map((tag) => (
              <span className="tag"><Link to={`/tags?t=${encodeURIComponent(tag)}`}>{tag}</Link></span>
            )):""}
          <hr/>
          <div className="blog-html" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) { 
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")        
        title
        tag
        thumbnail {
            childImageSharp {
                gatsbyImageData
            }
        }
      }
    }
  }
`