import styled from "@emotion/styled"
import {fonts} from "@styles/styled-record"

export const PageArticle = styled.article`
  padding: 0.75rem 0.5rem;
  height: 100%;
  max-width: 60em;
  margin: 0 auto;
  p {
    margin-bottom: 1.2rem;
    font-family: ${fonts.operaorMono};
    line-height: 1cm;
    font-size: 1.2rem;
  }
  ul {
    padding: 1rem 0;
    list-style: square inside;
    li {
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
`
export const Strong = styled.strong`
  font-weight: 900;
`
