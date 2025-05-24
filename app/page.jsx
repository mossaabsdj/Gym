"use client";
import { useState } from "react";
import { AppSidebar } from "@/app/component/sidebar/page";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CaissePage from "@/app/Caisse/page";
import ClientsPage from "@/app/Clients/page";
import SalesPage from "@/app/Sales/page";
import EmployeesPage from "@/app/Employees/page";
import PaimentsPage from "@/app/Paiments/page";
import SessionsPage from "@/app/Sessions/page";

export default function Home({}) {
  const [pagesVisibility, setPagesVisibility] = useState({
    Caisse: false,
    Clients: false,
    Sales: false,
    Employees: false,
    Paiments: false,
    Sessions: false,
  });
  return (
    <>
      <SidebarProvider>
        <AppSidebar setpagesVisibility={setPagesVisibility} />
        <main>
          <SidebarTrigger />
        </main>
        {pagesVisibility.Caisse && <CaissePage />}
        {pagesVisibility.Clients && <ClientsPage />}
        {pagesVisibility.Sales && <SalesPage />}
        {pagesVisibility.Employees && <EmployeesPage />}
        {pagesVisibility.Paiments && <PaimentsPage />}
        {pagesVisibility.Sessions && <SessionsPage />}{" "}
      </SidebarProvider>
    </>
  );
}
