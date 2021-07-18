import Highlighter from "@components/common/highlighter"
import Seo from "@components/common/seo"
import Title from "@components/common/title"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import usePersonDateInfo from "@hooks/person-date-info"
import {colors} from "@styles/styled-record"
import {NextPage} from "next"
import {Fragment} from "react"

const Article = styled.article`
  padding: 0.5rem;
`

const AboutPage: NextPage = () => {
  const {timeSinceStarting, timeAsDays} = usePersonDateInfo({})

  return (
    <Fragment>
      <Seo
        title="About Page"
        description="About Marcell Ciszek Druzynski and who I am"
      />

      <Title>
        <h1>About</h1>
      </Title>
      <Article>
        <p>
          Hi I am Marcell, and I am a software developer. I live and work in{" "}
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            Gothenburg Sweden
          </Highlighter>
          .{" "}
        </p>
        <p>
          If I could in a simple way describe who I am and what is my biggest
          passion is programming, and to get e mental break go for some long
          runs.
        </p>
        <p>
          But to make this section more intreating I guess I will write a bit
          more about myself
        </p>
        <p>
          So I have working as a professional programer since{" "}
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            {timeSinceStarting} ms ago
          </Highlighter>{" "}
          basically{" "}
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            {timeAsDays} days
          </Highlighter>{" "}
          from today.
        </p>
      </Article>
    </Fragment>
  )
}

export default AboutPage
