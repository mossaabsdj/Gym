"use client";
import React, { useState } from "react";
import content from "@/app/Texts/content.json";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Make sure this import matches your modal/dialog component

const TEXTS = content.Paiments.AddModel;
const LABELS = content.Labels;

const trainers = [
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10001",
    FullName: "Ahmed Benali",
    Num: "0612345678",
    Address: "123 Rue de Paris",
    DateNaissance: "1990-01-15",
    Balance: 150,
    CurrentOffer: "Offre Basic",
    EndOffer: "2024-07-01", // <-- Ajouté
  },
  {
    CodeBar: "10002",
    FullName: "Sara El Amrani",
    Num: "0623456789",
    Address: "45 Avenue Hassan II",
    DateNaissance: "1988-03-22",
    EndOffer: "2024-06-15", // <-- Ajouté
  },
  {
    CodeBar: "10003",
    FullName: "Youssef Karim",
    Num: "0634567890",
    Address: "78 Boulevard Zerktouni",
    DateNaissance: "1992-07-10",
  },
  {
    CodeBar: "10004",
    FullName: "Fatima Zahra",
    Num: "0645678901",
    Address: "12 Rue Moulay Ismail",
    DateNaissance: "1995-11-05",
  },
  {
    CodeBar: "10005",
    FullName: "Omar Lahlou",
    Num: "0656789012",
    Address: "99 Avenue Mohammed V",
    DateNaissance: "1985-09-18",
  },
  {
    CodeBar: "10006",
    FullName: "Imane Chafai",
    Num: "0667890123",
    Address: "34 Rue Ibn Sina",
    DateNaissance: "1993-04-27",
  },
  {
    CodeBar: "10007",
    FullName: "Rachid El Idrissi",
    Num: "0678901234",
    Address: "56 Rue Oued Fes",
    DateNaissance: "1989-12-30",
  },
  {
    CodeBar: "10008",
    FullName: "Nadia Bennis",
    Num: "0689012345",
    Address: "21 Avenue Atlas",
    DateNaissance: "1991-06-14",
  },
  {
    CodeBar: "10009",
    FullName: "Mohamed Amine",
    Num: "0690123456",
    Address: "88 Rue Marrakech",
    DateNaissance: "1987-08-09",
  },
  {
    CodeBar: "10010",
    FullName: "Khadija El Fassi",
    Num: "0611122233",
    Address: "17 Rue Casablanca",
    DateNaissance: "1994-02-19",
  },
  {
    CodeBar: "10011",
    FullName: "Soufiane El Alaoui",
    Num: "0622233344",
    Address: "65 Avenue Rabat",
    DateNaissance: "1990-10-25",
  },
  {
    CodeBar: "10012",
    FullName: "Meryem Bouzid",
    Num: "0633344455",
    Address: "43 Rue Agadir",
    DateNaissance: "1996-05-12",
  },
  {
    CodeBar: "10013",
    FullName: "Hamza El Ghali",
    Num: "0644455566",
    Address: "29 Boulevard Oujda",
    DateNaissance: "1986-07-30",
  },
  {
    CodeBar: "10014",
    FullName: "Salma Idrissi",
    Num: "0655566677",
    Address: "11 Rue Meknes",
    DateNaissance: "1993-03-03",
  },
  {
    CodeBar: "10015",
    FullName: "Yassine El Khatib",
    Num: "0666677788",
    Address: "77 Avenue Fes",
    DateNaissance: "1992-09-21",
  },
  {
    CodeBar: "10016",
    FullName: "Laila Benjelloun",
    Num: "0677788899",
    Address: "31 Rue Safi",
    DateNaissance: "1988-12-12",
  },
  {
    CodeBar: "10017",
    FullName: "Anas El Mansouri",
    Num: "0688899900",
    Address: "54 Rue Taza",
    DateNaissance: "1991-01-07",
  },
  {
    CodeBar: "10018",
    FullName: "Hajar El Houssaine",
    Num: "0699900111",
    Address: "19 Avenue Settat",
    DateNaissance: "1995-06-23",
  },
  {
    CodeBar: "10019",
    FullName: "Othmane El Idrissi",
    Num: "0612345679",
    Address: "22 Rue Kenitra",
    DateNaissance: "1987-11-29",
  },
  {
    CodeBar: "10020",
    FullName: "Samira El Fadili",
    Num: "0623456780",
    Address: "39 Boulevard Tanger",
    DateNaissance: "1994-08-16",
  },
];

const offres = [
  {
    Id: 1,
    Label: "Offre Basic",
    Description: "Accès salle 1 mois",
    Price: "200 DA",
  },
  {
    Id: 2,
    Label: "Offre Premium",
    Description: "Accès salle + cours 3 mois",
    Price: "500 DA",
  },
  {
    Id: 3,
    Label: "Offre VIP",
    Description: "Accès illimité 1 an",
    Price: "1500 DA",
  },
];

export default function AddPaimentModal({ open, onClose }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setResult(undefined);
      setSelectedOffre(null);
      setCustomAmount("");
      return;
    }
    const filtered = trainers.filter(
      (t) =>
        t.FullName.toLowerCase().includes(value.toLowerCase()) ||
        t.CodeBar.includes(value)
    );
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (trainer) => {
    setSearch(trainer.FullName);
    setSuggestions([]);
    setResult(trainer);
  };

  const handleOffreSelect = (offre) => {
    if (selectedOffre && selectedOffre.Id === offre.Id) {
      setSelectedOffre(null);
    } else {
      setSelectedOffre(offre);
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    if (selectedOffre) {
      setSelectedOffre(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl p-0 flex items-center justify-center"
        hideClose // This prop removes the X button if supported by your DialogContent component
      >
        <div className="mt-2 p-6 bg-white rounded-lg shadow-md">
          {/* Search Section */}
          <section className="mb-10">
            <div className="flex justify-center">
              <div className="flex flex-col w-full max-w-md">
                <label className="mb-2 text-gray-700 font-semibold text-lg text-center">
                  {TEXTS.searchTrainer}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={TEXTS.searchPlaceholder}
                      value={search}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      autoComplete="off"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute left-0 top-full w-full bg-white border rounded shadow mt-1 z-10 max-h-60 overflow-y-auto">
                        {suggestions.map((trainer) => (
                          <div
                            key={trainer.CodeBar}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            onClick={() => handleSuggestionClick(trainer)}
                          >
                            {trainer.FullName} ({trainer.CodeBar})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Trainer details always visible and grayed out */}
            <div className="mt-6 p-4 rounded shadow bg-gray-100 opacity-70 pointer-events-none select-none">
              <h2 className="text-xl font-semibold mb-4">
                {TEXTS.trainerDetails}
              </h2>
              <div className="flex flex-row gap-4 flex-nowrap  justify-start">
                {TEXTS.fields
                  .filter(
                    (field) =>
                      field.accessor !== "Balance" &&
                      field.accessor !== "CurrentOffer"
                  )
                  .map((field) => (
                    <div
                      key={field.accessor}
                      className={`flex flex-col shadow px-4 py-2 rounded bg-white ${
                        field.accessor === "Address"
                          ? "min-w-[200px]"
                          : field.accessor === "FullName"
                          ? "min-w-[180px]"
                          : field.accessor === "birthDate" ||
                            field.accessor === "DateNaissance"
                          ? "min-w-[160px]"
                          : "min-w-[140px]"
                      }`}
                    >
                      <label className="text-gray-500 text-xs mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type === "date" ? "text" : field.type}
                        value={
                          result
                            ? field.type === "date"
                              ? result[field.accessor]
                                ? new Date(
                                    result[field.accessor]
                                  ).toLocaleDateString()
                                : ""
                              : result[field.accessor] !== undefined
                              ? result[field.accessor]
                              : ""
                            : ""
                        }
                        readOnly
                        className="bg-gray-100 rounded px-2 py-1"
                        tabIndex={-1}
                      />
                    </div>
                  ))}
              </div>
              <div className="flex flex-row gap-4 mt-4 justify-center">
                {TEXTS.fields
                  .filter(
                    (field) =>
                      field.accessor === "Balance" ||
                      field.accessor === "CurrentOffer"
                  )
                  .map((field) => (
                    <div
                      key={field.accessor}
                      className={`flex flex-col shadow px-4 py-2 rounded bg-white ${
                        field.accessor === "Balance"
                          ? "min-w-[120px]"
                          : "min-w-[160px]"
                      }`}
                    >
                      <label className="text-gray-500 text-xs mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type === "date" ? "text" : field.type}
                        value={
                          result
                            ? field.accessor === "Balance"
                              ? result[field.accessor] !== undefined
                                ? result[field.accessor] + " " + LABELS.MAD
                                : ""
                              : field.accessor === "CurrentOffer"
                              ? result.CurrentOffer
                                ? result.CurrentOffer +
                                  (result.EndOffer
                                    ? ` (${TEXTS.endOfferLabel}: ${new Date(
                                        result.EndOffer
                                      ).toLocaleDateString()})`
                                    : "")
                                : ""
                              : result[field.accessor] || ""
                            : ""
                        }
                        readOnly
                        className="bg-gray-100 rounded px-2 py-1"
                        tabIndex={-1}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {result === null && search && (
              <p className="mt-4 text-red-600 text-center">{TEXTS.notFound}</p>
            )}
          </section>
          {/* Offre Section */}
          <section
            className={`mt-8 ${
              !result ? "opacity-60 pointer-events-none select-none" : ""
            }`}
          >
            <div className="flex flex-row gap-6 flex-wrap mb-6 justify-between items-start">
              <div className="flex flex-col max-w-xs flex-1">
                <label className="mb-1 text-gray-700  font-medium">
                  {TEXTS.customAmountLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder={TEXTS.customAmountPlaceholder}
                  className="px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>
              <div className="flex flex-row gap-6 flex-wrap ml-auto">
                {offres.map((offre) => (
                  <div
                    key={offre.Id}
                    className={`flex flex-col border rounded shadow px-6 py-4 min-w-[220px] cursor-pointer transition ${
                      selectedOffre && selectedOffre.Id === offre.Id
                        ? "border-blue-600 bg-blue-50"
                        : "bg-white hover:bg-blue-100"
                    }`}
                    onClick={() => handleOffreSelect(offre)}
                  >
                    <span className="font-semibold text-lg mb-2">
                      {offre.Label}
                    </span>
                    <span className="text-gray-600 mb-1">
                      {offre.Description}
                    </span>
                    <span className="text-blue-700 font-bold">
                      {offre.Price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {selectedOffre ? (
              <div className="mt-4 text-green-700 font-semibold">
                {TEXTS.selectedOffer}: {selectedOffre.Label}
              </div>
            ) : (
              customAmount &&
              Number(customAmount) > 0 && (
                <div className="mt-4 text-blue-700 font-semibold">
                  {TEXTS.customAmount}: {customAmount} {LABELS.MAD}
                </div>
              )
            )}
          </section>
          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="order-1 px-6 py-2 bg-black text-white rounded shadow hover:bg-gray-800 transition font-semibold"
              onClick={onClose}
            >
              {LABELS.Cancel}
            </button>
            <button
              className={`order-2 px-6 py-2 rounded shadow font-semibold ml-auto
                ${
                  !selectedOffre && (!customAmount || Number(customAmount) <= 0)
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 transition"
                }
              `}
              onClick={() => alert("Valider action")}
              style={{ marginLeft: "auto" }}
              disabled={
                !selectedOffre && (!customAmount || Number(customAmount) <= 0)
              }
            >
              {LABELS.Valider}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
