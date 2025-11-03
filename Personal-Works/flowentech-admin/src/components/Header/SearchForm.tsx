import React from "react";
import { useFormik } from "formik";
import debounce from "lodash/debounce";
import * as Yup from "yup";

const SearchForm = () => {
  // Debounced API search function
  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        console.log("Searching for:", query);
        // Replace this with your actual API call logic
      }, 300),
    []
  );

  // Formik setup
  const formik = useFormik({
    initialValues: {
      searchQuery: "",
    },
    validationSchema: Yup.object({
      searchQuery: Yup.string().required("Search query is required"),
    }),
    onSubmit: (values) => {
      debouncedSearch(values.searchQuery);
    },
  });

  return (
    <div className="max-w-sm mx-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center border border-gray-300 bg-white rounded-full overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary"
      >
        {/* Search Icon */}
        <div className="p-3" aria-hidden="true">
          <svg
            className="text-gray-500"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          name="searchQuery"
          placeholder="Search"
          aria-label="Search"
          className="flex-1 py-3 px-2 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
          value={formik.values.searchQuery}
          onChange={(e) => {
            formik.handleChange(e);
            debouncedSearch(e.target.value);
          }}
          onBlur={formik.handleBlur}
        />
      </form>
    </div>
  );
};

export default SearchForm;
