import RouteLink from "@components/elements/route-link"
import Codepen from "@components/icons/codepen"
import Github from "@components/icons/github"
import Linkedin from "@components/icons/linkedin"
import Twitter from "@components/icons/twitter"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import useOnClickOutside from "@hooks/click-outside"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {borderRadius, colors, elevations, fonts} from "@styles/styled-record"
import {length, pluralize} from "@utils/helpers"
import {getActiveLink} from "@utils/helpers"
import {motion} from "framer-motion"
import {useRouter} from "next/router"
import {Fragment, useReducer, useRef} from "react"
import ReactDOM from "react-dom"

import appData from "../../data/app-data.json"
import routes from "../../data/routes.json"
import socialMedia from "../../data/social-data.json"

interface AppDataItem {
  name: string
}

const cmdKeys = [
  {
    name: "Show/Hide menu",
    keys: ["ctr", "k"],
  },

  {
    name: "Toggle theme",
    keys: ["ctr", "t"],
  },
]

const Overlay = styled(motion.div)`
  position: fixed;
  background-color: ${colors.colorBgOverlay};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  outline: none;
`

const Body = styled(motion.section)`
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid ${colors.colorHighlight};
  background-color: ${colors.colorBgBackground};
  color: ${colors.colorBgBackground};
  @media ${above.tablet} {
    width: ${pxToRem(650)};
    transform: translateX(-50%);
  }
  border-radius: ${borderRadius.borderRadiusM};
  box-shadow: ${elevations.shadowXl};
`

const bodyVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    x: "-50%",
  },

  animate: {
    scale: 1,
    opacity: 1,
  },

  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {duration: 0.15, delay: 0.1},
  },
}
interface Props {
  closeMenu: () => void
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 0 auto 3rem auto;
`
const Label = styled.label`
  width: 100%;
  position: relative;
  span {
    color: ${colors.colorGray500};
    position: absolute;
    right: 12px;
    top: 12px;
  }
`

const Input = styled.input`
  width: 100%;
  background: transparent;
  height: ${pxToRem(45)};
  border: 2px solid ${colors.colorBgBlack};
  border: none;
  border-radius: ${borderRadius.borderRadiusS};
  padding: 0 ${pxToRem(15)};
  outline: none;
  font-size: 1.2rem;
  color: ${colors.colorTextText};
  caret-color: ${colors.colorTextText};
  font-family: ${fonts.operatorMonoDefault};
  position: absolute;
  top: 0;

  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: 0.7;
    font-size: 1.1rem;
  }
  :-ms-input-placeholder {
    opacity: 0.7;
    font-size: 1.1rem;
  }

  -webkit-appearance: textfield;
  ::-webkit-search-cancel-button,
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
`

const RoutesWrapper = styled.ul`
  padding: 1rem 0.2rem;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

const SocialWrapper = styled.ul`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  margin: 0 auto;

  li {
    display: flex;
    align-items: center;
    padding: ${pxToRem(10)};
    &:hover {
      background-color: ${colors.colorGray200};
      a {
        color: ${colors.colorTextPrimary};
      }
    }
    a {
      display: flex;
      align-items: center;

      svg {
        margin-right: 0.5rem;
      }
    }
  }
`

type Action =
  | {type: "SET_FIELD_VALUE"; value: string}
  | {type: "RESET"}
  | {type: "CLEAR_FILTER"}

interface State {
  filterValue: string
  applicationData: Array<AppDataItem>
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        filterValue: action.value,
        // TODO: Improve filter
        applicationData: state.applicationData.filter(({name}) => {
          return name.toLowerCase().indexOf(action.value.toLowerCase()) !== -1
        }),
      }
    case "RESET":
      return {
        ...state,
        filterValue: "",
        applicationData: appData,
      }

    default:
      throw new Error(`Unknown action type `)
  }
}

const ApplicationDataList = styled.ul`
  padding: 1rem 0.2rem;
  border: 2px solid red;
  li {
    color: ${colors.colorTextText};
  }
`

const MenuDialog = ({closeMenu}: Props) => {
  const [{filterValue, applicationData}, dispatch] = useReducer(reducer, {
    filterValue: "",
    applicationData: appData as Array<AppDataItem>,
  })
  const ref = useRef(null)
  useOnClickOutside(ref, closeMenu)

  const router = useRouter()
  const activeLink = getActiveLink(router.pathname)

  return ReactDOM.createPortal(
    <Overlay
      data-testid="components-app-MenuDialog"
      role="dialog"
      tabIndex={-1}
      aria-label="search"
      initial={{backgroundColor: colors.colorBgBackground}}
      animate={{backgroundColor: colors.colorBgOverlay}}
      exit={{backgroundColor: colors.colorBgBackground}}
    >
      <Body
        ref={ref}
        initial={bodyVariants["initial"]}
        animate={bodyVariants["animate"]}
        exit={bodyVariants["exit"]}
        variants={bodyVariants}
        transition={{
          ease: "easeOut",
          duration: 0.2,
        }}
      >
        <Form>
          <Label htmlFor="blog-post-search">
            <Input
              autoFocus
              autoComplete="off"
              type="search"
              placeholder="search for a blog post"
              id="blog-post-search"
              name="search"
              value={filterValue}
              aria-label="Search for a blog post"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  dispatch({
                    type: "SET_FIELD_VALUE",
                    value: e.target.value,
                  })
                } else {
                  dispatch({type: "RESET"})
                }
              }}
            />
            <span>
              {filterValue.length > 0 && (
                <small>
                  {applicationData.length} {pluralize(applicationData, "item")}{" "}
                  found{" "}
                </small>
              )}
            </span>
          </Label>
        </Form>

        <Container>
          {length(filterValue) > 0 ? (
            <ApplicationDataList>
              {applicationData.map(({name}) => (
                <li key={name}>{name}</li>
              ))}
            </ApplicationDataList>
          ) : (
            <Fragment>
              <Banner text="Command shortcuts" />
              <CmdKeys>
                {cmdKeys.map(({name, keys}) => (
                  <li key={name}>
                    {name}
                    <div className="keys">
                      {keys.map((key) => (
                        <span key={key}>{key}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </CmdKeys>

              <Banner text="Social links" />
              <SocialWrapper>
                {socialMedia.map(({name, url}) => (
                  <li key={name}>
                    <a href={url}>
                      {renderIcon(name)}
                      {name}
                    </a>
                  </li>
                ))}
              </SocialWrapper>

              <Banner text="Navigation" />
              <RoutesWrapper>
                <RouteLink name="home" path="/" active={activeLink("/")} />
                {routes.map(({name, path}) => (
                  <RouteLink
                    key={name}
                    name={name}
                    path={path}
                    active={activeLink(path)}
                  />
                ))}
              </RoutesWrapper>
            </Fragment>
          )}
        </Container>
      </Body>
    </Overlay>,
    document.body,
  )
}

function renderIcon(name: string) {
  switch (name) {
    case "github":
      return <Github width={20} height={20} />
    case "twitter":
      return <Twitter width={20} height={20} />
    case "linkedin":
      return <Linkedin width={20} height={20} />
    case "codepen":
      return <Codepen width={20} height={20} />

    default:
      throw new Error(`Unknown name ${name} `)
  }
}

const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
  max-height: 25rem;
`

const CmdKeys = styled.ul`
  li {
    color: ${colors.colorTextText};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(10)};
    .keys {
      span {
        display: inline-block;
        margin-right: ${pxToRem(8)};
        background-color: ${colors.colorGray300};
        padding: ${pxToRem(5)};
        min-width: ${pxToRem(30)};
        text-align: center;
        border-radius: ${borderRadius.borderRadiusS};
        color: ${colors.colorTextPrimary};
        box-shadow: ${elevations.shadowMd};
      }
    }
  }
`

const Banner = ({text}: {text: string}) => {
  return (
    <aside
      role="banner"
      css={css`
        color: ${colors.colorTextText};
        background-color: ${colors.colorGray100};
        padding: 0.75rem;
        border-radius: ${borderRadius.borderRadiusM};
        box-shadow: ${elevations.shadowMd};
        p {
          font-family: ${fonts.operaorMono};
        }
      `}
    >
      <p>{text}</p>
    </aside>
  )
}

export default MenuDialog
