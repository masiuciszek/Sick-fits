import {GlobalStyles} from "@components/app/global-styles"
import {Layout} from "@components/app/layout"
import DefaultSeo from "@components/seo/default-seo"
import {getAllPosts} from "lib/api"
import {GetStaticProps} from "next"
import {AppProps} from "next/app"
import Head from "next/head"
import {Fragment} from "react"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Fragment>
      <GlobalStyles />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts({
    fields: ["title"],
  }).map(({title}) => ({title}))
  return {
    props: {
      f: "",
    },
  }
}

export default MyApp
