"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const RichTextUI = () => {
  const [info, setContent] = useState('');
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Rich Text" />

        <RichTextEditor
            value={info}
            onChange={setContent}
            placeholder="Start typing..."
            minHeight={500}
        />
      </DefaultLayout>
    </div>
  );
};

export default RichTextUI;
