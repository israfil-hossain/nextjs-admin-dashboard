import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import AddEditProject from '@/components/Portfolio/AddEditProject'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <DefaultLayout>
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Projects" />
      <AddEditProject />
    </div>
  </DefaultLayout>
  )
}

export default page