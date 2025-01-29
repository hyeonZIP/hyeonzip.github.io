import React from "react";
import { Link } from "gatsby";

const PostList = ({ posts, tag, series, search }) => {
  return (
    <div>
      {/* 존재하는 모든 포스트 반복 생성 */}
      {posts.map(({ node }) => {
        return (
          <div key={node.id}>
            <Link className="i-title" to={node.fields.slug}>{node.frontmatter.title}</Link>
            <div className="i-date">{node.frontmatter.date}</div>
            <p className="i-excerpt">{node.excerpt}</p>
            {(node.frontmatter.tag != null) ? node.frontmatter.tag.split(",").map((tag) => (
              <span className="tag" key={tag}>
                <Link to={`/tags?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
              </span>
            )) : ""}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
