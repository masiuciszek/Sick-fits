import Title from "@components/common/title"
import Seo from "@components/seo/seo"
import {NextPage} from "next"
import {Fragment} from "react"

const ContactPage: NextPage = () => (
  <Fragment>
    <Seo title="Contact me" description="Say hi ore ask me any questions." />
    <Title>
      <h1>Contact me</h1>
      <p>Coming soon!</p>
    </Title>
  </Fragment>
)

export default ContactPage
