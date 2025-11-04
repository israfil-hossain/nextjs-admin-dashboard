"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import dynamic from "next/dynamic";

const ECommerce = dynamic(() => import("@/components/Dashboard/E-commerce"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
