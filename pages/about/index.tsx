import Hobbies from "@components/about/hobbies"
import {PageArticle, Strong} from "@components/about/styles"
import Highlighter from "@components/common/highlighter"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import useHasMounted from "@hooks/has-mounted"
import usePersonDateInfo from "@hooks/person-date-info"
import {colors} from "@styles/styled-record"
import {NextPage} from "next"
import {Fragment} from "react"

const techs = ["JavaScript", "React", "Java", "Node"]

const AboutPage: NextPage = () => {
  const hasMounted = useHasMounted()
  const {timeSinceStarting} = usePersonDateInfo({
    updated: 2500,
  })

  return (
    <Fragment>
      <Seo
        title="About Page"
        description="About Marcell Ciszek Druzynski and who I am"
      />
      <PageArticle>
        <Title
          incomingStyles={css`
            padding: 0;
          `}
        >
          <h1>
            Just{" "}
            <Highlighter
              incomingStyles={css`
                border-bottom: 2px solid ${colors.colorTextPrimary};
              `}
            >
              short about
            </Highlighter>{" "}
            me
          </h1>
        </Title>
        <p>
          Hi and welcome, I am Marcell, and I am a software developer from
          Gothenburg Sweden.
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          ></Highlighter>
        </p>
        <p>
          I felt in love with programming <Highlighter>2018</Highlighter> after
          deciding to start a new chapter in my life.
        </p>
        <p>
          I have been working professionally as a software developer since{" "}
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            {hasMounted && timeSinceStarting}
          </Highlighter>
          , ms ago.
        </p>
        <p>
          And since then it has been a amazing journey for me and I am excited
          for every new day that is coming up.
        </p>
        <p>Tools that I work daily with are:</p>
        <ul>
          {techs.map((tech) => (
            <li key={tech}>
              <Highlighter>{tech}</Highlighter>
            </li>
          ))}
        </ul>
        <p>
          <Strong>I live</Strong> and work in Gothenburg Sweden where I live and
          work in a daily basis. Where I am close to my family and friends.
        </p>
        <p>
          When I am not sitting in front of my machine, I like to go for long
          runs, take some beautiful pictures, be with my friends and watch
          football games.
        </p>
        <Hobbies />
      </PageArticle>
    </Fragment>
  )
}

export default AboutPage
