import React, {useState,useEffect,useCallback} from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  // 초기 상태를 'light'로 설정
  const [theme, setTheme] = useState('light');

  // 클라이언트에서만 실행되는 로직
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 로컬 스토리지에서 사용자 테마 가져오기
      const localStorageTheme = localStorage.getItem('color-theme');
      // OS 기본 테마 확인
      const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      // 최종 테마 결정
      const currentTheme = localStorageTheme || osTheme;

      // 상태와 DOM에 테마 적용
      setTheme(currentTheme);
      document.documentElement.setAttribute('color-theme', currentTheme);
      localStorage.setItem('color-theme', currentTheme);
    }
  }, []);

  // 테마 전환 함수
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('color-theme', newTheme);
        localStorage.setItem('color-theme', newTheme);
      }
      return newTheme;
    });
  }, []);

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

export default Layout;
