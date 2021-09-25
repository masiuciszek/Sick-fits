import RouteLink from "@components/elements/route-link"
import styled from "@emotion/styled"
import {getActiveLink} from "@utils/helpers"
import {useRouter} from "next/router"

import routes from "../../data/routes.json"

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  flex: 1;
  height: 100%;
  align-items: center;
`

const Navigation = (): JSX.Element => {
  const router = useRouter()
  const activeLink = getActiveLink(router.pathname)
  return (
    <Nav data-testid="components-app-navigation">
      <NavList>
        {routes.map(({name, path}) => (
          <RouteLink
            key={name}
            name={name}
            path={path}
            active={activeLink(path)}
          />
        ))}
      </NavList>
    </Nav>
  )
}
export default Navigation
