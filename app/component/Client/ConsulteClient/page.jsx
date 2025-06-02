"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import object from "@/app/Texts/content.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import JsBarcode from "jsbarcode";

const Labels = object.Labels;
const defaultdata = object.Clients.ViewModel;
const PlanData = defaultdata.plan;
// Text variables
const DontDisplayasfield = defaultdata.DontDisplayField; // Field to not display
const title = defaultdata.title;
const modifyText = Labels.Edit;
const applyText = Labels.Save;
const closeAria = Labels.Close;
const barcodeAlt = Labels.CodeBar;
const barcodeTitle = Labels.ClickToPrint;

const xAxisLabel = PlanData.xAxisLabel; // X axis: Séances
const yAxisLabel = PlanData.yAxisLabel; // Y axis: Mois

const chartTitle = PlanData.title; // Chart title

const ConsulteClientModal = ({ open, onClose, client }) => {
  const [editValues, setEditValues] = useState(client || {});
  const [editing, setEditing] = useState(false);
  const barcodeRef = useRef(null);

  React.useEffect(() => {
    setEditValues(client || {});
    setEditing(false);
  }, [client, open]);

  // Generate barcode locally when CodeBar changes
  useEffect(() => {
    if (barcodeRef.current && editValues.CodeBar) {
      JsBarcode(barcodeRef.current, editValues.CodeBar, {
        format: "CODE128",
        width: 2,
        height: 42,
        displayValue: false,
        margin: 0,
        background: "#fff",
        lineColor: "#000",
      });
    }
  }, [editValues.CodeBar, open]);

  // Print only the barcode image (from canvas)
  const handlePrintBarcode = () => {
    if (!barcodeRef.current) return;
    const dataUrl = barcodeRef.current.toDataURL();
    const printWindow = window.open("", "_blank", "width=400,height=200");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            img { max-width: 100%; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="${barcodeAlt}" />
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleModify = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // You can add your save logic here (API call, parent callback, etc.)
  };

  // --- Seances per month graph logic ---
  // Group seances by month/year
  const seanceData = useMemo(() => {
    if (!client || !client.seances) return [];
    const monthCounts = {};
    client.seances.forEach((s) => {
      const d = new Date(s.date);
      const key = `${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}/${d.getFullYear()}`;
      monthCounts[key] = (monthCounts[key] || 0) + 1;
    });
    // Sort by date ascending
    return Object.entries(monthCounts)
      .map(([month, seances]) => ({ month, seances }))
      .sort((a, b) => {
        const [ma, ya] = a.month.split("/").map(Number);
        const [mb, yb] = b.month.split("/").map(Number);
        return ya !== yb ? ya - yb : ma - mb;
      });
  }, [client]);

  if (!open || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded shadow-lg border max-w-4xl w-full p-4 relative min-h-[100px] h-auto">
        {/* Top bar with modify/apply left, close right */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {!editing && (
              <button
                type="button"
                onClick={handleModify}
                className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z"
                  />
                </svg>
                {modifyText}
              </button>
            )}
            {editing && (
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded shadow border border-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {applyText}
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-white text-2xl bg-white hover:bg-black rounded-full w-8 h-8 flex items-center justify-center border border-black"
            aria-label={closeAria}
          >
            &times;
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          {title}
        </h1>
        {/* Barcode image only, clickable and smaller */}
        {editValues.CodeBar && (
          <div className="flex flex-col items-center mb-4">
            <canvas
              ref={barcodeRef}
              className="bg-white border rounded shadow cursor-pointer mb-1"
              title={barcodeTitle}
              style={{ maxWidth: 150, height: "42px" }}
              onClick={handlePrintBarcode}
              aria-label={barcodeAlt}
            />
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {/* Fields - Left */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(editValues).map(([key, value]) =>
                key === DontDisplayasfield ? null : (
                  <div key={key} className="mb-4">
                    <div className="text-black font-medium mb-1">{key}</div>
                    {editing ? (
                      <input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-black rounded shadow focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                      />
                    ) : (
                      <div className="px-3 py-2 border border-black rounded shadow bg-white text-black">
                        {value}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          {/* Graph - Right */}
          <div className="flex items-center justify-center">
            {seanceData.length > 0 && (
              <div className="w-full">
                <h2 className="text-lg font-bold mb-1 text-center text-black">
                  {chartTitle}
                </h2>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={seanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                    <XAxis
                      dataKey="month"
                      label={{
                        value: xAxisLabel,
                        position: "insideBottomRight",
                        offset: 0,
                        fill: "#000",
                      }}
                      stroke="#000"
                    />
                    <YAxis
                      allowDecimals={false}
                      dataKey="seances"
                      label={{
                        value: yAxisLabel,
                        angle: -90,
                        position: "insideLeft",
                        fill: "#000",
                      }}
                      stroke="#000"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #000",
                      }}
                    />
                    <Bar dataKey="seances" fill="#000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsulteClientModal;
