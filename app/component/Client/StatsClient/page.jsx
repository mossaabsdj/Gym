"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import object from "@/app/Texts/content.json";
const labels = object.Labels;
const defaultData = object.Clients.StatsModel;
// Use month numbers instead of names
const newClientsPerMonth = [
  { month: 1, clients: 10 }, // Jan
  { month: 2, clients: 15 }, // Feb
  { month: 3, clients: 8 }, // Mar
  { month: 4, clients: 20 }, // Apr
  { month: 5, clients: 12 }, // May
  { month: 6, clients: 18 }, // Jun
  { month: 7, clients: 14 }, // Jul
  { month: 8, clients: 11 }, // Aug
  { month: 9, clients: 16 }, // Sep
  { month: 10, clients: 9 }, // Oct
  { month: 11, clients: 13 }, // Nov
  { month: 12, clients: 17 }, // Dec
];
const totalClients = 120;

// Text variables
const months = labels.mounts;
const dialogTitleText = defaultData.title;
const totalClientsTitle = defaultData.totalClientsTitle;
const newClientsPerMonthTitle = defaultData.plan.title;

export default function StatsClientPage({ open, setOpen }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle>{dialogTitleText}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{totalClientsTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{totalClients}</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{newClientsPerMonthTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={newClientsPerMonth}>
                      <XAxis
                        dataKey="month"
                        tickFormatter={(month) => months[month - 1]}
                        angle={-90} // Rotate labels vertically
                        textAnchor="end" // Align text to the end for vertical orientation
                        interval={0} // Show all month labels
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="clients" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
