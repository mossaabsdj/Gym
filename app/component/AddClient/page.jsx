"use client";
import React, { useState, useRef, useEffect } from "react";
import object from "@/app/Texts/content.json";
import JsBarcode from "jsbarcode"; // Add this import

const AddModal = ({ open, onClose, onSubmit, data }) => {
  const FirstFields = data.AddClient.FirstFields;
  const Title = data.AddClient.Title;
  const AddButtonText = data.AddClient.AddButton;
  const GenerateButtonText = object.Labels.Generate;
  const labels = object.Labels;
  const initialValues = FirstFields.reduce((acc, field) => {
    acc[field.accessor] =
      field.type === "select" ? field.options?.[0] || "" : "";
    return acc;
  }, {});
  const [values, setValues] = useState(initialValues);

  const barcodeRef = useRef(null);

  // Generate barcode locally when CodeBar changes
  useEffect(() => {
    if (barcodeRef.current && values.CodeBar) {
      JsBarcode(barcodeRef.current, values.CodeBar, {
        format: "CODE128",
        width: 2,
        height: 42,
        displayValue: false,
        margin: 0,
        background: "#fff",
        lineColor: "#000",
      });
    }
  }, [values.CodeBar, open]);

  const generateCodeBar = () => {
    const code = Math.random().toString().slice(2, 14);
    setValues((prev) => ({ ...prev, CodeBar: code }));
  };

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
          <img src="${dataUrl}" alt="Barcode" />
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Find the CodeBar field object from FirstFields
  const codeBarField = FirstFields.find(
    (field) => field.accessor === "CodeBar"
  );

  // Filter out CodeBar from the rest of the fields
  const filteredFields = FirstFields.filter(
    (field) => field.accessor !== "CodeBar"
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded shadow-lg border border-white max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">{Title}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(values);
            onClose();
          }}
        >
          {/* CodeBar field with generate and print */}
          <div className="mb-4">
            <label
              htmlFor="CodeBar"
              className="block text-gray-700 font-medium mb-2"
            >
              {labels.CodeBar}
            </label>
            <div className="flex gap-2">
              <input
                id="CodeBar"
                name="CodeBar"
                type="text"
                value={values.CodeBar}
                onChange={handleChange}
                placeholder={codeBarField?.placeholder || "Enter code bar"}
                className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={generateCodeBar}
                className="px-3 py-2 bg-black text-white rounded shadow border border-black hover:bg-white hover:text-black transition"
              >
                {GenerateButtonText}
              </button>
            </div>
            {values.CodeBar && (
              <div className="mt-4 flex justify-center">
                <canvas
                  ref={barcodeRef}
                  className="bg-white border border-gray-200 rounded shadow cursor-pointer"
                  title="Click to print"
                  style={{ maxWidth: 150, height: "42px" }}
                  onClick={handlePrintBarcode}
                  aria-label="Barcode"
                />
              </div>
            )}
          </div>
          {/* Dynamic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFields.map((field) =>
              field.type === "select" ? (
                <div key={field.accessor} className="mb-4">
                  <label
                    htmlFor={field.accessor}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  <select
                    id={field.accessor}
                    name={field.accessor}
                    value={values[field.accessor]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div key={field.accessor} className="mb-4">
                  <label
                    htmlFor={field.accessor}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.accessor}
                    name={field.accessor}
                    type={field.type}
                    value={values[field.accessor]}
                    onChange={handleChange}
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    required={field.required}
                    className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              )
            )}
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-2 px-4 rounded shadow hover:bg-white hover:text-black border border-black transition"
          >
            {labels.Next}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
