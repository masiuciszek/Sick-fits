import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {NextPage} from "next"
import {Fragment} from "react"

const BitesPage: NextPage = () => (
  <Fragment>
    <Seo
      title="Bites, useful code snippets and blocks"
      description="What I use daily and what possibly help you in your daily coding"
    />
    <Title>
      <h1>Bites</h1>
      <p>Coming soon!</p>
    </Title>
  </Fragment>
)

export default BitesPage
