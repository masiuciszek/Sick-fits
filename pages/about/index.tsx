import Highlighter from "@components/common/highlighter"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import usePersonDateInfo from "@hooks/person-date-info"
import {colors} from "@styles/styled-record"
import {NextPage} from "next"
import {Fragment} from "react"

const Article = styled.article`
  padding: 0.75rem 0.5rem;
  height: 100%;
  p {
    margin-bottom: 1.2rem;
    line-height: 0.8cm;
  }
  ul {
    padding: 1rem 0;
    list-style: square inside;
    li {
      margin-bottom: 1rem;
    }
  }
`

const thingsILikeToDo = [
  "Running",
  "Reading",
  "Litten to music",
  "create stuff",
]

const AboutPage: NextPage = () => {
  const {timeSinceStarting, timeAsDays} = usePersonDateInfo({updated: 1500})
  return (
    <Fragment>
      <Seo
        title="About Page"
        description="About Marcell Ciszek Druzynski and who I am"
      />

      <Title>
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
          passion then it would be programming and sometimes to get e mental
          break go for some long runs.
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
        <p>
          I love to learn new things and I am always open minded to new
          technical stuff. Nothing is bad it just a mather of question what is
          right tool for the right situation.
        </p>
        <p>
          Before I started programing I have always been into sports since I was
          a kid. Football and martial arts has been what I have been active in,
          but since I turned 16 I had to choose one of the sports, I kept with
          the martial arts and when I turned 18 I moved to Thailand to become a
          professional Boxer.
        </p>
        <p>
          I found the passion for programing When i lived in Asia, I met a
          friend who was a developer. He inspired me and I knew that this is
          defensively something that I want to work with.
        </p>
        <p>
          2018 I moved back to Europe, to start the school and to fulfill my
          dream to become a professional software developer.
        </p>
        <p>
          June 2021 was the year I graduated and I got a fulltime Job at the
          place I had my internship. And here I am, trying to learn and grow as
          a developer for every day.
        </p>
        <p>
          Things I like to do on my spare time:
          <ul>
            {thingsILikeToDo.map((todo) => (
              <li key={todo}>
                <Highlighter>{todo}</Highlighter>
              </li>
            ))}
          </ul>
        </p>
        <h3>My Goal with My Site:</h3>
      </Article>
    </Fragment>
  )
}

export default AboutPage
