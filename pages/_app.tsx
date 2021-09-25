import {GlobalStyles} from "@components/app/global-styles"
import {Layout} from "@components/app/layout"
import DefaultSeo from "@components/seo/default-seo"
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

export default MyApp
