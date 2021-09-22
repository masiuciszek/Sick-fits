import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {pxToRem} from "@styles/css-helpers"
import {above} from "@styles/media-query"
import {
  borderRadius,
  colors,
  elevations,
  fonts,
  sizes,
} from "@styles/styled-record"

export const tagsStyles = css`
  display: flex;
  background-color: ${colors.colorTextPrimary};
  color: ${colors.colorTextWhite};
  padding: ${pxToRem(2)};
  font-size: ${pxToRem(12)};
  min-width: ${pxToRem(55)};
  align-items: center;
  justify-content: space-between;
  margin-left: ${pxToRem(5)};
  box-shadow: ${elevations.shadowMd};
  border-radius: ${borderRadius.borderRadiusM};
`

export const PostNavigation = styled.section`
  display: flex;
  justify-content: space-between;
  padding: ${pxToRem(20)} ${pxToRem(6)};

  a,
  p {
    display: block;
    border: 1px solid ${colors.colorTextPrimary};
    padding: 0.2rem;
    font-size: 17px;
    font-family: ${fonts.operaorMono};
    border-radius: ${borderRadius.borderRadiusS};
    background-color: ${colors.colorGray300};
    min-width: ${pxToRem(90)};
    text-align: center;
    outline: none;
  }
  a {
    color: ${colors.colorHighlight};
    transition: 200ms ease-out background-color, 1200ms ease-out color;
    &:hover {
      background-color: ${colors.colorGray900};
      color: ${colors.colorBgBackground};
    }
  }
  p {
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: line-through;
    font-family: ${fonts.operaorMonoHco};
    color: ${colors.colorTextText};
  }
`

export const StyledItem = styled.li`
  width: 100%;
  transition: 300ms ease-in-out background-color, box-shadow 300ms ease-in-out;
  padding: ${pxToRem(10)};
  margin-bottom: ${pxToRem(10)};
  border-radius: ${borderRadius.borderRadiusM};
  &:hover {
    background-color: ${colors.colorGray200};
    box-shadow: ${elevations.shadowMd};
  }
  @media ${above.tablet} {
    width: ${pxToRem(600)};
  }
  .title-and-date {
    font-size: ${sizes.h4};
    color: ${colors.colorTextPrimary};
  }
  .spoiler {
    margin-bottom: ${pxToRem(10)};
  }
`

export const TagsList = styled.ul`
  margin-bottom: ${pxToRem(10)};
  display: flex;
  align-items: center;
  li:not(:last-child) {
    ${tagsStyles};
  }
  .list-item-link {
    margin-left: ${pxToRem(25)};
    a {
      font-family: ${fonts.operaorMonoHco};
      display: inline-block;
      position: relative;
      transition: 200ms ease-in-out opacity;
      &:after {
        content: "";
        background-color: ${colors.colorTextPrimary};
        position: absolute;
        transition: 200ms linear width;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
      }
      &:hover {
        opacity: 0.75;
        :after {
          width: 90%;
        }
      }
    }
  }
`

export const PostWrapper = styled.article`
  padding: 0.25rem;
  max-width: 950px;
  margin: ${pxToRem(40)} auto ${pxToRem(10)};
  position: relative;
`

export const List = styled.ul`
  display: flex;
  margin-bottom: 0.75rem;
  li {
    ${tagsStyles};
  }
`

export const EditPostLink = styled.a`
  position: absolute;
  top: -1.65rem;
  right: 0rem;
  @media ${above.betweenTabletMobileL} {
    top: 1rem;
    right: 2rem;
  }
  display: flex;
  align-items: center;
  font-size: ${pxToRem(10)};
  padding: ${pxToRem(4)};
  svg {
    margin-right: ${pxToRem(5)};
  }
  &:after {
    position: absolute;
    content: "";
    background-color: ${colors.colorTextPrimary};
    width: 40%;
    height: 2px;
    bottom: 0;
    left: ${pxToRem(7)};
    transition: 200ms ease-in-out width;
  }
  &:hover {
    opacity: 0.6;
    &:after {
      width: 80%;
    }
  }
`
