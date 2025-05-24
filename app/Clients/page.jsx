// page.jsx
import React from "react";
import object from "@/app/Texts/content.json";
import Table from "@/app/component/Table/page";
import AddModal from "@/app/component/Add/page";

const data = object.Clients;
const Page = () => {
  const object = [
    {
      id: 2,
      CodeBar: "987654321098",
      FullName: "Bob Smith",
      Num: "C002",
      Address: "456 Oak Ave, Townsville",
      date: "1990-09-23",
      DateNaissance: "1990-09-23",
      Plan: "Mois",
      Balance: 0,
    },
    {
      id: 3,
      CodeBar: "555666777888",
      FullName: "Charlie Brown",
      Num: "C003",
      Address: "789 Pine Rd, Villagetown",
      date: "1988-12-01",
      DateNaissance: "1988-12-01",
      Plan: "Seance",
      Balance: 75,
    },
  ];
  return (
    <div>
      <h1>{data.title}</h1>
      <Table data={data} object={object} AddModel={AddModal} />
    </div>
  );
};

export default Page;
