import * as React from "react"
import { Link } from "gatsby"
import {useLocation} from "@reach/router";
import Layout from "../components/layout"
import Seo from "../components/seo"

const TagsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedTag = queryParams.get("tag");

    return(
        <Layout>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <h1>{selectedTag}</h1>
      </Layout>
    );
};

export const Head = () => <Seo title="Page two" />

export default TagsPage
