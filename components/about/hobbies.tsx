import Highlighter from "@components/common/highlighter"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import {colors} from "@styles/styled-record"
import {motion} from "framer-motion"
import {Fragment} from "react"
import {useInView} from "react-intersection-observer"

import {Strong} from "./styles"

const Section = styled(motion.section)``

const thingsILikeToDo = [
  "Running",
  "Reading",
  "Teach/Learn",
  "Create stuff (Coding)",
  "Take pictures",
]

const Hobbies = () => {
  const {ref, inView} = useInView({
    threshold: 0,
  })
  return (
    <Fragment>
      <h4>So... some of my hobbies are...</h4>
      <ul>
        {thingsILikeToDo.map((todo) => (
          <li key={todo}>
            <Highlighter>{todo}</Highlighter>
          </li>
        ))}
      </ul>

      <aside className="content" ref={ref}>
        <Section
          initial={{x: 10000, opacity: 0.45, scale: 0.2}}
          animate={{
            x: inView ? 0 : -10000,
            opacity: inView ? 1 : 0,
            scale: inView ? 1 : 0.2,
          }}
          exit={{x: -10000, opacity: 0.45, scale: 0.2}}
          transition={{duration: 0.35, ease: "easeOut", delay: 0.2}}
        >
          <p>
            <Strong>I love to run,</Strong> nothing beats a long run after some
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

          <p>
            <Strong>I love to create stuff</Strong> Yes I love to program on my
            spare time as well, improve my skills and learn new stuff, new
            technologies and tools. Working with open-source or solving my own
            daily problems. Where I can build a tool that I need daily.
          </p>
          <p>
            <Strong>Take pictures</Strong> I appreciate beautiful pictures, so I
            have found an interest of taking pictures on beautiful views. Just a
            hobby for me and to share memories on different places I have been
            at around the world. Sometimes I have my camera with on my run to
            stop by to take some beautiful shots on the view.
          </p>
          <h3>My Goal with the site:</h3>
          <p>
            My main goal is to become a better programmer, learn new topics and
            techs, but as well share what I currently learning. I am still in my
            early stage of my programming carrier, is there things that you
            think is wrong what I have written, please make an{" "}
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
        </Section>
      </aside>
    </Fragment>
  )
}

export default Hobbies
