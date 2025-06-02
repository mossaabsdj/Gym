// page.jsx
import React from "react";
import object from "@/app/Texts/content.json";
import Table from "@/app/component/Table/page";
import AddModal from "@/app/component/Client/AddClient/page";
import ConsulteClientModal from "@/app/component/Client/ConsulteClient/page";
import StatsClientModel from "@/app/component/Client/StatsClient/page";

const data = object.Clients;
const Page = () => {
  const object = [
    {
      id: 2,
      CodeBar: "987654321098",
      FullName: "Bob Smith",
      Num: "C002",
      Address: "456 Oak Ave, Townsville",
      Date: "1990-09-23",
      DateNaissance: "1990-09-23",
      Plan: "Mois",
      Balance: 0,
      seances: [
        { date: "2025-06-01" },
        { date: "2025-05-03" },
        { date: "2025-06-03" },
      ],
    },
    {
      id: 3,
      CodeBar: "555666777888",
      FullName: "Charlie Brown",
      Num: "C003",
      Address: "789 Pine Rd, Villagetown",
      Date: "2025-05-26",
      DateNaissance: "1988-12-01",
      Plan: "Seance",
      Balance: 75,
      seances: [
        { date: "2025-05-02" },
        { date: "2025-05-02" },
        { date: "2025-05-05" },
        { date: "2025-05-05" },
        { date: "2025-05-05" },
      ],
    },
  ];
  return (
    <div>
      <h1>{data.title}</h1>
      <Table
        data={data}
        object={object}
        AddModel={AddModal}
        ViewModel={ConsulteClientModal}
        StatsModel={StatsClientModel}
      />
    </div>
  );
};

export default Page;
