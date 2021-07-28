import {TWITTER_CARD_TYPE} from "@utils/constants"
import {ArticleJsonLd, NextSeo} from "next-seo"
import {Fragment} from "react"

import siteConfig from "../../site-config.json"
interface Props {
  image?: string
  description?: string
  path?: string
  title?: string
  date?: string
  updated?: string
}

const formatDate = (date: string | undefined): string =>
  date ? new Date(date).toISOString() : ""

const Seo = ({
  title,
  description,
  image,
  path,
  date,
  updated,
}: Props): JSX.Element => {
  const {
    twitter,
    author,
    url,
    image: configImage,
    description: configDescription,
    title: configTitle,
  } = siteConfig

  const seoConfig = {
    description: description || configDescription,
    title: title || configTitle,
    image: image || configImage,
    url: `${url}${path || ""}`,
    date,
    updated: updated || date,
  }

  const formattedDate = formatDate(seoConfig.date)
  const formattedUpdatedDate = formatDate(seoConfig.updated)
  const featuredImage = {
    url: seoConfig.image,
    alt: seoConfig.title,
  }

  return (
    <Fragment>
      <NextSeo
        title={seoConfig.title}
        description={seoConfig.description}
        canonical={seoConfig.url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: formattedDate,
            modifiedTime: formattedUpdatedDate,
          },
          url: seoConfig.url,
          title: seoConfig.title,
          description: seoConfig.description,
          images: [featuredImage],
        }}
        twitter={{
          handle: twitter,
          site: twitter,
          cardType: TWITTER_CARD_TYPE,
        }}
      />
      <ArticleJsonLd
        authorName={author}
        dateModified={formattedDate}
        datePublished={formattedDate}
        description={seoConfig.description}
        images={[seoConfig.image]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName={author}
        title={seoConfig.title}
        url={seoConfig.url}
      />
    </Fragment>
  )
}
export default Seo
