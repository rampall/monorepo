import React, { useRef, useState } from 'react'
import { BlogReel } from 'components/domain/blog-overview'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { News } from 'components/domain/news'
import getNews from 'services/news'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import { Hero } from 'components/domain/index/hero'
import css from './index.module.scss'
import TrackList from 'components/domain/index/track-list'
import About from 'components/domain/index/about'
import FeaturedSpeakers from 'components/domain/index/featured-speakers'
import CallsToAction from 'components/domain/index/ctas'
import Image from 'next/legacy/image'
import themes from './themes.module.scss'
import ImageNew from 'next/image'
// import CircleBackground from 'assets/images/background-circles.png'
// import TriangleBackground from 'assets/images/background-triangles.png'
import { GetContentSections, GetTracks } from 'services/page'
// import TestExternalRepo from 'lib/components/lib-import'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { client } from '../../tina/__generated__/client'
import { PagesQuery } from '../../tina/__generated__/types'
import TitleDevcon from 'assets/images/devcon-title.svg'
import LogoFlowers from 'assets/images/dc-7/logo-flowers.png'
import InfiniteScroller from 'lib/components/infinite-scroll'
import StatsAnimation from 'components/domain/index/hero/stats-anim'
import RTDGrants from 'assets/images/dc-7/rtd-grants.png'
import { motion, useInView } from 'framer-motion'

export default pageHOC(function Index(props: any) {
  const { data }: { data: PagesQuery } = useTina(props.cms)
  const scrollRef = useRef<any>(null)
  const isInView = useInView(scrollRef, { once: true, margin: '40% 0px -20% 0px' })

  return (
    <div className={`${css['layout-default']} ${themes['index']}`}>
      <Header withStrip withHero />
      <Hero />

      <div className="bg-white z-10 overflow-hidden w-full">
        <div className="section">
          <div className="flex-col lg:flex-row flex mt-8 mb-8 pb-8 gap-8 border-bottom items-center">
            <div className="lg:basis-[1000px] lg:shrink">
              <TitleDevcon style={{ marginBottom: '24px' }} />
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section1?.body}></TinaMarkdown>
              </div>
            </div>
            <div className="flex flex-col grow shrink-0 items-center justify-center">
              <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
                <ImageNew
                  src={LogoFlowers}
                  alt="Devcon 7 Logo"
                  className="w-[85%] max-w-[350px] lg:w-auto lg:max-w-[400px]"
                />

                <div className="mt-4 lg:mt-4 flex flex-col justify-start items-start">
                  <TitleDevcon className="hidden lg:block max-w-[124px] lg:max-w-auto lg:w-[124px]" />
                  <p className={`${css['rainbow-text']} text-3xl`}>เอเชียตะวันออกเฉียงใต้</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-start pb-20 border-bottom gap-8">
            <div className={`${css['scrolling-text-background']}`}>
              <InfiniteScroller nDuplications={2} speed="120s">
                <p className="bold">SOUTHEAST ASIA&nbsp;</p>
              </InfiniteScroller>
            </div>

            <div>
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.top}></TinaMarkdown>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.left}></TinaMarkdown>
              </div>

              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.right}></TinaMarkdown>
              </div>
            </div>
            <button className="button bold justify-self-start rounded-dark-purple">
              {data.pages.section2?.button}
            </button>
          </div>
          <div className="flex relative pt-12 mb-8 pb-8 gap-8 border-bottom items-center">
            <div className={`${css['scrolling-text-background']} ${css['alternate']}`}>
              <InfiniteScroller nDuplications={2} reverse speed="150s">
                <p className="bold rotate-x-180">ROAD TO DEVCON&nbsp;</p>
              </InfiniteScroller>
            </div>

            <div className="basis-[800px] shrink">
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section3?.body}></TinaMarkdown>
              </div>
              <button className="button mt-8 bold justify-self-start rounded-dark-purple">
                {data.pages.section3?.button}
              </button>
            </div>
            <div className="flex grow shrink-0 items-center justify-center">
              <div className={css['tilt-hover-image']}>
                <ImageNew src={RTDGrants} alt="Devcon RTD Grants" className="max-w-[300px]" />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start border-bottom gap-8 pointer-events-none">
            <div className="rich-text z-10">
              <TinaMarkdown content={data.pages.section4?.body}></TinaMarkdown>
            </div>

            <button className="button bold justify-self-start rounded-dark-purple z-10 pointer-events-auto">
              {data.pages.section4?.button}
            </button>

            <div className="sm:h-[300px] h-[350px] relative w-full z-0 pointer-events-auto" ref={scrollRef}>
              {isInView && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                  <StatsAnimation />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {/* <About content={props.sections['devcon-about']} /> */}

        {/* <div className={`${css['background-container']} section`}>
          <div className={`${css['circle-background']} expand`}>
            <Image src={CircleBackground} alt="Circles" />
          </div>
        </div> */}

        {/* <About recap content={props.sections['devcon-recap']} /> */}

        {/* <FeaturedSpeakers /> */}

        {/* <CallsToAction
        scholarApplications={props.sections['cta-scholar-applications']}
        // speakerApplications={props.sections['cta-speaker-applications']}
        // ticketPresale={props.sections['cta-ticket-presale']}
        ticketsOnSale={props.sections['tickets-on-sale-now']}
      /> */}

        {/* <News data={props.news} /> */}

        {/* <div className="clear-bottom border-bottom"></div> */}

        <div className="section">
          <div className="relative border-bottom pb-8 pt-8">
            <div className={`${css['scrolling-text-background']} ${css['alternate']}`}>
              {/* <InfiniteScroller nDuplications={2} speed="150s">
                <p className="bold rotate-x-180">ROAD TO DEVCON&nbsp;</p>
              </InfiniteScroller> */}
            </div>

            <div className="rich-text">
              <TinaMarkdown content={data.pages.section5?.title}></TinaMarkdown>
            </div>

            <div className="max-w-[50vw] mt-4 mb-4">
              <div className="aspect">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/lgTMm7J0t7c"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="rich-text">
              <TinaMarkdown content={data.pages.section5?.body}></TinaMarkdown>
            </div>
          </div>

          <div className="relative border-bottom pb-8">
            <TrackList tracks={props.tracks} />

            <button className="button bold mt-12 justify-self-start rounded-dark-purple">
              {data.pages.section6?.button}
            </button>

            <div className={`${css['scrolling-text-background']}`}>
              <InfiniteScroller nDuplications={2} speed="70s">
                <p className="bold">DEVCON ARCHIVE&nbsp;</p>
              </InfiniteScroller>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className={`${css['scrolling-text-background']} ${css['alternate']}`}>
            <InfiniteScroller nDuplications={2} reverse speed="100s">
              <p className="bold">BLOG POSTS&nbsp;</p>
            </InfiniteScroller>
          </div>
          <BlogReel blogs={props.blogs} />
        </div>

        <div className="mb-8"></div>

        <Footer />
      </div>
    </div>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const sections = await GetContentSections(
    [
      'devcon-about',
      'road-to-devcon-grants',
      'devcon-recap',
      'cta-speaker-applications',
      'cta-ticket-presale',
      'cta-scholar-applications',
      'tickets-on-sale-now',
    ],
    context.locale
  )
  const tracks = GetTracks(context.locale)

  const content = await client.queries.pages({ relativePath: 'Index.md' })

  return {
    props: {
      ...globalData,
      page: DEFAULT_APP_PAGE,
      news: await getNews(context.locale),
      blogs: await GetBlogs(),
      sections,
      tracks,
      cms: {
        variables: content.variables,
        data: content.data,
        query: content.query,
      },
    },
    revalidate: 1 * 60 * 30,
  }
}
