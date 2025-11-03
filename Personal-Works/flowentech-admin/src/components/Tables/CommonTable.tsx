"use client"
import React, { useState } from "react";
// import { CommonPagination } from "../common/Pagination";

interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode; // Optional custom rendering
}

interface CommonTableProps {
  data: any[];
  columns: ColumnConfig[];
  actions?: {
    label: string;
    onClick: (row: any) => void;
    renderIcon?: () => React.ReactNode;
  }[];
  rowsPerPage?: number;
}

const CommonTable: React.FC<CommonTableProps> = ({
  data,
  columns,
  actions = [],
  rowsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (page : number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
    // Add logic to fetch new data based on the page
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5"
                >
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${
                      rowIndex === paginatedData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${
                      rowIndex === paginatedData.length - 1 ? "border-b-0" : "border-b"
                    }`}
                  >
                    <div className="flex items-center justify-end ">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className="hover:bg-slate-200 rounded-full p-2"
                          onClick={() => action.onClick(row)}
                        >
                          {action.renderIcon ? action.renderIcon() : action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <CommonPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-dark-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-sm text-dark dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-dark-2"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommonTable;
