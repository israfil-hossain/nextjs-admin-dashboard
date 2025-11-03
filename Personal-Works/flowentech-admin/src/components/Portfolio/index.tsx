"use client";

import React, { useState } from "react";
import CommonTable from "../Tables/CommonTable";
import {
  BetweenHorizontalEnd,
  Eye,
  Grid2x2,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import ButtonDefault from "../Buttons/ButtonDefault";
import SearchForm from "../Header/SearchForm";

type Props = {};

const Portfolio = (props: Props) => {
  const [isGridView, setIsGridView] = useState(false);
  const data = [
    {
      name: "Free package",
      price: 0.0,
      invoiceDate: `Jan 13,2023`,
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      invoiceDate: `Jan 13,2023`,
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      invoiceDate: `Jan 13,2023`,
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      invoiceDate: `Jan 13,2023`,
      status: "Pending",
    },
  ];

  const columns = [
    { key: "name", label: "Package" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "status", label: "Status" },
    { key: "price", label: "Price", render: (value: number) => `$${value}` },
  ];

  const actions = [
    {
      label: "",
      renderIcon: () => <Eye size={22} className="hover:text-primary" />,
      onClick: (row: any) => alert(`Viewing ${row.name}`),
    },
    {
      label: "",
      renderIcon: () => <Pencil size={20} className="hover:text-blue-500" />,
      onClick: (row: any) => alert(`Editing ${row.name}`),
    },

    {
      label: "",
      renderIcon: () => <Trash size={20} className="hover:text-red-500" />,
      onClick: (row: any) => alert(`Deleting ${row.name}`),
    },
  ];

  const handleGridView = (type: string) => {
    if (type === "grid") {
      setIsGridView(true);
    } else setIsGridView(false);
  };

  return (
    <div>
      <div className="flex w-full justify-between pb-5">
        <div className="flex space-x-1.5 rounded-full bg-slate-200 px-2 py-2">
          <BetweenHorizontalEnd
            className={`${isGridView ? "bg-slate-300 " : "bg-white"} h-8 w-8 cursor-pointer rounded-full p-2 hover:bg-white`}
            onClick={() => handleGridView("list")}
          />
          <Grid2x2
            className={`${isGridView ? "bg-white " : "bg-slate-300"} h-8 w-8 cursor-pointer rounded-full p-2 hover:bg-white`}
            onClick={() => handleGridView("grid")}
          />
        </div>
        <div className="w-[400px]">
          <SearchForm />
        </div>
        <ButtonDefault
          label="Add"
          link="/projects/add"
          customClasses="bg-primary rounded-[5px] text-white py-[8px] px-4"
        >
          <Plus size={20}/>
        </ButtonDefault>
      </div>
      <CommonTable
        data={data}
        columns={columns}
        actions={actions}
        rowsPerPage={10}
      />
    </div>
  );
};

export default Portfolio;
