import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(()=> {
    if(typeof window !== 'undefined') {
      const isUserColorTheme = localStorage.getItem('color-theme');
      const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const getUserTheme = isUserColorTheme ? isUserColorTheme : isOsColorTheme;
      //로컬에 저장된 선호 테마가 없으면 현재 os에 적용된 테마를 사용 

      setTheme(getUserTheme);
      document.documentElement.setAttribute('color-theme', getUserTheme);
      localStorage.setItem('color-theme', getUserTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('color-theme', newTheme);
    localStorage.setItem('color-theme', newTheme);
  };

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} theme={theme} toggleTheme={toggleTheme} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
