import Highlighter from "@components/common/highlighter"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import usePersonDateInfo from "@hooks/person-date-info"
import {colors, fonts} from "@styles/styled-record"
import {NextPage} from "next"
import {Fragment} from "react"
import {useInView} from "react-intersection-observer"

const Article = styled.article`
  padding: 0.75rem 0.5rem;
  height: 100%;
  max-width: 60em;
  margin: 0 auto;
  p {
    margin-bottom: 1.2rem;
    font-family: ${fonts.operaorMono};
    line-height: 1.8cm;
    font-size: 1.5rem;
  }
  ul {
    padding: 1rem 0;
    list-style: square inside;
    li {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
  }
`
const Strong = styled.strong`
  font-weight: 900;
`

const thingsILikeToDo = [
  "Running",
  "Reading",
  "Teach/Learn",
  "Create stuff (Coding)",
  "Take pictures",
]
const techs = ["JavaScript", "React", "Java", "Node"]

const AboutPage: NextPage = () => {
  const {timeSinceStarting} = usePersonDateInfo({
    updated: 1500,
  })
  return (
    <Fragment>
      <Seo
        title="About Page"
        description="About Marcell Ciszek Druzynski and who I am"
      />

      <Article>
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
            {timeSinceStarting}
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
        <p>
          So... some of my hobbies are...
          <ul>
            {thingsILikeToDo.map((todo) => (
              <li key={todo}>
                <Highlighter>{todo}</Highlighter>
              </li>
            ))}
          </ul>
          <p>
            <Strong>I love to run</Strong> nothing beats a long run after some
            hours in front of the machine. To get a mental brake and to recover,
            feel fresh until the next session is an important piece of my daily
            life puzzle to be productive, efficient and continue my work.
          </p>
          <p>
            <Strong>I love to read</Strong>, when I really have some time over
            or has the whole weekend free, reading is my highest priority. I
            love to read all kind of books.
          </p>
          <p>
            <Strong>I love to teach and learn</Strong>, learning new stuff and
            to really understand the meaning of what I learned really give me a
            boost. Apply it into my daily work is an awesome feeling. Teach
            others where I read write blog posts here and as well help others as
            much I can.
          </p>
        </p>
        <p>
          <Strong>I love to create stuff</Strong> Yes I love to program on my
          spare time as well, improve my skills and learn new stuff, new
          technologies and tools. Working with open-source or solving my own
          daily problems. Where I can build a tool that I need daily.
        </p>
        <p>
          <Strong>Take pictures</Strong> I appreciate beautiful pictures, so I
          have found an interest of taking pictures on beautiful views. Just a
          hobby for me and to share memories on different places I have been at
          around the world. Sometimes I have my camera with on my run to stop by
          to take some beautiful shots on the view.
        </p>
        <h3>My Goal with My Site:</h3>
        <p>
          My main goal is to become a better programmer, learn new topics and
          techs, but as well share what I currently learning. I am still in my
          early stage of my programming carrier, is there things that you think
          is wrong what I have written, please make an{" "}
          <Highlighter
            incomingStyles={css`
              a {
                color: ${colors.colorHighlight};
                font-weight: bold;
              }
            `}
          >
            <a
              href="https://github.com/masiucd/my-blog/pulls"
              rel="noreferrer"
              target="_blank"
            >
              pull request
            </a>
          </Highlighter>{" "}
          to make som changes. It will help me a lot, thank you.
        </p>
      </Article>
    </Fragment>
  )
}

export default AboutPage
