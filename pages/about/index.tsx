import Highlighter from "@components/common/highlighter"
import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import usePersonDateInfo from "@hooks/person-date-info"
import {colors, fonts} from "@styles/styled-record"
import {NextPage} from "next"
import {Fragment} from "react"

const Article = styled.article`
  padding: 0.75rem 0.5rem;
  height: 100%;
  max-width: 60em;
  margin: 0 auto;
  p {
    margin-bottom: 1.2rem;
    line-height: 0.8cm;
    font-family: ${fonts.operaorMono};
  }
  ul {
    padding: 1rem 0;
    list-style: square inside;
    li {
      margin-bottom: 1rem;
    }
  }
`
const Strong = styled.strong`
  font-weight: 900;
`

const thingsILikeToDo = [
  "Running",
  "Reading",
  "teach/learn",
  "create stuff (Coding)",
  "Take pictures",
]
const techs = ["JavaScript", "React", "Java", "Node"]

const AboutPage: NextPage = () => {
  const {timeSinceStarting, age} = usePersonDateInfo({
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
          Hi, I am Marcell, and I am a software developer.
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          ></Highlighter>
          I am {age} years old and been working as a software developer since{" "}
          <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            {timeSinceStarting}
          </Highlighter>
          , ms ago.
          {/* <Highlighter
            incomingStyles={css`
              border-bottom: 1px solid ${colors.colorTextPrimary};
            `}
          >
            {timeAsDays} days
          </Highlighter>{" "} */}
        </p>
        <p>Working daily with tools like</p>
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
          If I could in a simple way describe about me and what is my biggest
          passion is then it would be programming and go out for long runs and
          some good books on that. But to make this section more interesting, I
          guess I will write a bit more about myself.
        </p>

        {/* <p>
          Before I started programming, I have always been into sports since I
          was a kid. Football and martial arts has been what I have been active
          in, but since I turned 16 I had to choose one of the sports, I kept
          with the martial arts and when I turned 18 I moved to Thailand to
          become a professional Boxer.
        </p>
        <p>
          I found the passion for programming When I lived in Asia, I met a
          friend who was a developer. He inspired me and I knew that this is
          defensively, something that I want to work with.
        </p>
        <p>
          2018 I moved back to Europe, to start the school and to fulfill my
          dream to become a professional software developer.
        </p>
        <p>
          June 2021 was the year I graduated, and I got a full-time Job at the
          place I had my internship. And here I am, trying to learn and grow as,
          a developer for every day.
        </p> */}
        <p>
          What I like to do is...
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
            love to read all from{" "}
            <Highlighter>computer science/programming</Highlighter> books, some
            great novels and all different kind of books.
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
          spare time as well, improve some skills and learn new stuff, new
          technologies and tools,. Working with open-source or solving my own
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
          to make som changes. It will help me and all the other that read the
          blog posts.
        </p>
      </Article>
    </Fragment>
  )
}

export default AboutPage
