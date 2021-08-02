import AnimateWrapper from "@components/common/animate-wrapper"
import Tooltip from "@components/common/tooltip"
import Button from "@components/elements/button"
import Cmd from "@components/icons/cmd"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import useHasMounted from "@hooks/has-mounted"
import useMediaQuery from "@hooks/media-query"
import useTheme, {ThemeValue} from "@hooks/theme"
import useToggle from "@hooks/toggle"
import {above, below} from "@styles/media-query"
import {colors, fonts, sizes} from "@styles/styled-record"
import dynamic from "next/dynamic"
import Link from "next/link"
import {Fragment} from "react"
import {useHotkeys} from "react-hotkeys-hook"

import Navigation from "./nav"

const Sun = dynamic(() => import("../icons/sun"))
const Moon = dynamic(() => import("../icons/moon"))
const MenuDialog = dynamic(() => import("../menu/menu-dialog"))

const StyledHeader = styled.header`
  max-height: ${sizes.headerHeight};
  background-color: ${colors.colorGray100};
`
const HeaderContentContainer = styled.aside`
  display: grid;
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  grid-template-columns: 1fr;
  @media ${above.tablet} {
    grid-template-columns: 1fr 2fr 1fr;
  }
`

const LogoWrapper = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  position: relative;
  a {
    display: block;
    font-family: ${fonts.operaorMono};
    font-weight: 700;
    font-size: 2rem;
    color: ${colors.colorTextText};
    @media ${above.tablet} {
      padding-left: 0.5rem;
    }
  }
  span {
    color: ${colors.colorHighlight};
  }
  @media ${below.tablet} {
    justify-content: center;
  }
`

const Header = () => {
  const {storedTheme, handleTheme} = useTheme()
  const isAboveTablet = useMediaQuery(above.tablet)
  const [showMenu, openMenu, closeMenu, toggleMenu] = useToggle()

  useHotkeys("ctrl+k", toggleMenu)
  useHotkeys("ctrl+t", handleTheme, {keyup: true}, [storedTheme])

  return (
    <Fragment>
      <StyledHeader>
        <HeaderContentContainer>
          <LogoWrapper>
            <Tooltip
              title="home"
              ariaLabel="home-page"
              incomingStyles={css`
                bottom: -50%;
              `}
            >
              <Link href="/">
                <a>
                  <span>M</span>ar<span>c</span>ell.<span>C</span>.D
                </a>
              </Link>
            </Tooltip>
          </LogoWrapper>
          {isAboveTablet && <Navigation />}
          <ButtonWrapper
            isMenuOpen={showMenu}
            openMenu={openMenu}
            handleTheme={handleTheme}
            storedTheme={storedTheme}
          />
        </HeaderContentContainer>
      </StyledHeader>

      <AnimateWrapper isOn={showMenu}>
        <MenuDialog closeMenu={closeMenu} />
      </AnimateWrapper>
    </Fragment>
  )
}

const ButtonWrapperStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media ${above.tablet} {
    button {
      margin-top: 0.8rem;
    }
  }
`
interface ButtonWrapperProps {
  openMenu: () => void
  storedTheme: ThemeValue
  handleTheme: () => void
  isMenuOpen: boolean
}

function ButtonWrapper({
  openMenu,
  storedTheme,
  handleTheme,
  isMenuOpen,
}: ButtonWrapperProps) {
  const hasMounted = useHasMounted()
  const themeTooltipLabel = hasMounted
    ? storedTheme === "dark"
      ? "Light"
      : "Dark"
    : ""

  return (
    <ButtonWrapperStyles>
      <Tooltip
        title="ctr+k"
        ariaLabel="cmd-menu"
        incomingStyles={css`
          left: -45%;
        `}
      >
        <Button onClick={openMenu}>
          <Cmd isActive={isMenuOpen} />
        </Button>
      </Tooltip>
      <Tooltip title={themeTooltipLabel} ariaLabel="control-theme">
        {hasMounted && storedTheme === "dark" ? (
          <Button onClick={handleTheme}>
            <Sun />
          </Button>
        ) : (
          <Button onClick={handleTheme}>
            <Moon />
          </Button>
        )}
      </Tooltip>
    </ButtonWrapperStyles>
  )
}

export default Header
