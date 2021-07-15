import styled from "@emotion/styled"
import {sizes} from "@styles/styled-record"
import {FC, Fragment} from "react"

import Footer from "./footer"
import Header from "./header"

const Main = styled.main`
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  min-height: calc(100vh - 210px); /**header and footer */
  margin-bottom: 2rem;
`

export const Layout: FC = ({children}) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Fragment>
  )
}
