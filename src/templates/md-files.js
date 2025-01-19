/**
 * 읽은 md 파일이 보여질 형태를 정하는 템플릿
 */
import React from "react"
import { graphql } from "gatsby"
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
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <GatsbyImage image={thumbnailImg} alt="Thumbnail" />
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
        thumbnail {
            childImageSharp {
                gatsbyImageData
            }
        }
      }
    }
  }
`