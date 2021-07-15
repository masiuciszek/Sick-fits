import Codepen from "@components/icons/codepen"
import Github from "@components/icons/github"
import Linkedin from "@components/icons/linkedin"
import Twitter from "@components/icons/twitter"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {colors, fonts, sizes} from "@styles/styled-record"
import Link from "next/link"

import socialMedia from "../../data/social-data.json"

const FooterGroup = styled.section`
  border-top: 1px solid ${colors.colorTextText};
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  height: 100%;
  .say-hi {
    flex: 1 0 20%;
    text-align: center;
    padding: 0.5rem 0;
    small {
      border-bottom: 1px solid ${colors.colorTextText};
      font-size: 1rem;
      font-family: ${fonts.operaorMono};
    }
    span {
      color: ${colors.colorTextPrimary};
    }
  }

  width: ${pxToRem(725)};
  @media ${above.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`

const FooterList = styled.ul`
  display: flex;
  margin: 0 auto;
  width: 100%;
  justify-content: space-evenly;
  padding: 0.5rem 0;
  margin-top: auto;

  li {
    a {
      font-size: ${pxToRem(16)};
      text-transform: capitalize;
      font-weight: 500;
      font-family: ${fonts.operatorMonoDefault};
      display: inline-block;
      position: relative;
      svg {
        transition: 200ms ease-out opacity;
      }
      &:hover {
        svg {
          opacity: 0.6;
        }
      }
    }
  }
`

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer
      css={css`
        min-height: ${sizes.footerHeight};
        display: flex;
        align-items: center;
        background-color: ${colors.colorGray100};
      `}
    >
      <FooterGroup>
        <div className="say-hi">
          <small>
            <Link href="/">
              <a>
                <span>Ma</span>rcell.<span>Ciszek</span>.Dru<span>zy</span>nski
              </a>
            </Link>
          </small>
        </div>
        <FooterList>
          {socialMedia.map(({name, url}) => (
            <li key={name}>
              <a href={url}>{getIcon(name)}</a>
            </li>
          ))}
        </FooterList>
        <div
          css={css`
            text-align: center;
            display: inline-block;

            padding: 0.5rem 0;
            small {
              font-size: ${pxToRem(10)};
              span {
                color: ${colors.colorTextPrimary};
              }
            }
            @media ${above.tablet} {
              grid-column: span 2;
            }
          `}
        >
          <small>
            &#169; {currentYear} Copyright <span>Marcell Ciszek Druzysnki</span>
            . All rights reserved. Built using{" "}
            <a href="https://nextjs.org/">Next JS</a>
          </small>
        </div>
      </FooterGroup>
    </footer>
  )
}

export default Footer

function getIcon(name: string) {
  switch (name) {
    case "linkedin":
      return <Linkedin />
    case "github":
      return <Github />
    case "codepen":
      return <Codepen />
    case "twitter":
      return <Twitter />

    default:
      throw new Error(`could not find icon name of ${name}`)
  }
}
