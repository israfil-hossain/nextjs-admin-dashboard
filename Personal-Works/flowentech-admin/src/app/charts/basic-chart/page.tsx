"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

const BasicChart = dynamic(() => import("@/components/Charts/BasicChart"), {
  ssr: false,
});

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Basic Chart" />

      <BasicChart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
