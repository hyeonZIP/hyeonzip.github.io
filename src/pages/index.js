import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import PostList from "../components/postList"

export default ({ data }) => {

  const profileImg = getImage(data.allFile.nodes[0].childImageSharp.gatsbyImageData)
  const [filteredPosts, setFilteredPosts] = useState(data.allMarkdownRemark.edges)
  const [selectedTag, setSelectedTag] = useState(null)

  const handleTagClick = (tag) => {
    if(!tag) return;
    if(selectedTag === tag){
      setSelectedTag(null)
      setFilteredPosts(data.allMarkdownRemark.edges)
    } else{
      const filtered = data.allMarkdownRemark.edges.filter(({node})=>{
        if(!node.frontmatter.tag) return false;
        const tags = node.frontmatter.tag.split(",").map(t => t.trim());
        return tags.includes(tag); 
      })
      setSelectedTag(tag)
      setFilteredPosts(filtered)
    }
  }

  return (
    <Layout>
      <div>
        <div class="p-area">
          <div><GatsbyImage image={profileImg} alt="profileImage"/></div>
          <div>
            <div class="p-name">@hyeonZIP</div>
            <div class="p-intro">개발 깎는 노인</div>
            <div> [아이콘 구역]</div>
          </div>
        </div>
        {/* 포스트 수 */}
        <h4>{filteredPosts.length} Posts</h4>
        {/* 존재하는 모든 포스트 반복 생성 */}
        <PostList posts={filteredPosts}/>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: {name: {eq: "avatar"}}){
      nodes{
        childImageSharp{
          gatsbyImageData(width: 150, height: 150)
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tag
            series
          }
          fields{
            slug
          }
          excerpt(truncate: true, pruneLength: 223)          
        }
      }
    }
  }
`