// page.jsx
import React from "react";
import object from "@/app/Texts/content.json";
const data = object.Paiments;
const Page = () => {
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};

export default Page;
