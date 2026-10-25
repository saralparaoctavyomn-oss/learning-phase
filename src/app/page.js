import AboutUs from '@/component/landingUi/AboutUs'
import Alumni from '@/component/landingUi/Alumni'
import Events from '@/component/landingUi/Events'
import Footer from '@/component/landingUi/fixed/Footer'
import Header from '@/component/landingUi/fixed/Header'
import TopNotify from '@/component/landingUi/fixed/TopNotify'
import Landing from '@/component/landingUi/Landing'
import ManageMent from '@/component/landingUi/ManageMent'
import TabSection from '@/component/landingUi/TabSection'
import TopScrroer from '@/component/landingUi/TopScrroer'
import React from 'react'

export default function page() {
  return (
    <div >
      <TopNotify />
      <Header />
      <Landing />
      <div className='p-4 md:p-0'>
        <AboutUs />
        <TabSection />
        <TopScrroer />
        <Events />
        <Alumni />
        <ManageMent />
      </div>

      <Footer />
    </div>
  )
}
