"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import RichTextEditor from "@/components/RichTextEditor";
import React, { useState } from "react";

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
