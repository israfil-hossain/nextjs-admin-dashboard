'use client'
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";

const AddEditProject = ({projectData}: {projectData?:any}) => {
  const apiUrl = ""
  
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    url: Yup.string().url("Invalid URL").required("URL is required"),
    cover_img: Yup.string().required("Cover image is required"),
    category: Yup.string()
      .oneOf(["web", "mobile", "nocode"], "Invalid category")
      .required("Category is required"),
  });

  const [description, setDescription] = useState(
    projectData?.description || ""
  );

  const handleSubmit = async (values:any)=>{
    try {
      const payload = {
        ...values,
        description, // Include the Quill editor description
      };

      if (projectData) {
        // Update project
        const response = await axios.put(`${apiUrl}/${projectData.id}`, payload);
        console.log("Project updated:", response.data);
      } else {
        // Add new project
        const response = await axios.post(apiUrl, payload);
        console.log("Project added:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      short_description: "",
      description: "",
      url: "",
      cover_img: "",
      category: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Portfolio Information
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              {/* Title */}
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  placeholder="Enter project title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-sm">{formik.errors.title}</div>
                )}
              </div>

              {/* URL */}
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white" htmlFor="url">
                  URL Link
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  placeholder="Enter project URL"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.url && formik.errors.url && (
                  <div className="text-red-500 text-sm">{formik.errors.url}</div>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white" htmlFor="short_description">
                Short Description
              </label>
              <textarea
                id="short_description"
                name="short_description"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                placeholder="Enter project description"
                value={formik.values.short_description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              
            </div>

            {/* Description with Quill */}
            <div className="mb-5.5">
              <label
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Enter project details"
              />
            </div>

            {/* Cover Image */}
            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white" htmlFor="cover_img">
                Cover Image URL
              </label>
              <input
                id="cover_img"
                name="cover_img"
                type="text"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                placeholder="Enter cover image URL"
                value={formik.values.cover_img}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cover_img && formik.errors.cover_img && (
                <div className="text-red-500 text-sm">{formik.errors.cover_img}</div>
              )}
            </div>

            {/* Category */}
            <div className="mb-5.5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select category" />
                <option value="web" label="Web" />
                <option value="mobile" label="Mobile" />
                <option value="nocode" label="No-code" />
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-sm">{formik.errors.category}</div>
              )}
            </div>

            <button
              type="submit"
              className="rounded-[7px] bg-primary px-6 py-2.5 text-white hover:bg-primary-dark focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditProject;
