// page.jsx
import React from "react";
import object from "@/app/Texts/content.json";
import Table from "@/app/component/Table/page";
import AddModal from "@/app/component/Paiment/AddModel/page";
import ConsulteModal from "@/app/component/Paiment/ConsulterModel/page";
import StatsModel from "@/app/component/Paiment/StatsModel/page";
import { Type } from "lucide-react";

const data = object.Paiments;

const Page = () => {
  const object = [
    {
      id: 1,
      FullName: "John Doe",
      Amount: 250.0,
      Date: "2025-05-26",
      Employee: "Jane Smith",
      Type: "Credit",
    },
    {
      id: 2,
      FullName: "Alice Johnson",
      Amount: 150.0,
      Date: "2024-05-27",
      Employee: "John Doe",
    },
    {
      id: 3,
      FullName: "Bob Brown",
      Amount: 300.0,
      Date: "2024-05-28",
      Employee: "Alice Johnson",
    },
  ];
  return (
    <div>
      <h1>{data.title}</h1>
      <Table
        data={data}
        object={object}
        AddModel={AddModal}
        StatsModel={StatsModel}
        ViewModel={ConsulteModal}
      />
    </div>
  );
};

export default Page;
