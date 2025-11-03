import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Portfolio from '@/components/Portfolio'
import React from 'react'

type Props = {}

const Projects = (props: Props) => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Projects" />
        <Portfolio />
      </div>
    </DefaultLayout>
  )
}

export default Projects