"use client";

import React, { useState, useEffect } from "react";

export default function AddTruckForm() {
  const [truckNumber, setTruckNumber] = useState("");
  const [shipperName, setShipperName] = useState("");
  const [owner, setOwner] = useState("");
  const [typeshiperId, setTypeshiperId] = useState("");
  const [typeshipers, setTypeshipers] = useState<{ id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/sas/typeshipers")
      .then((r) => r.json())
      .then((data) => setTypeshipers(data || []))
      .catch((e) => console.error("Failed to load typeshipers", e));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      truckNumber,
      shipperName,
      owner,
      typeshiperId: typeshiperId || undefined,
    };
    try {
      const res = await fetch("/api/sas/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setTruckNumber("");
        setShipperName("");
        setOwner("");
        setTypeshiperId("");
        alert("تمت إضافة الشاحنة بنجاح");
      } else {
        alert("فشل إضافة الشاحنة");
      }
    } catch (err) {
      alert("حدث خطأ أثناء الإرسال");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" font-semibold space-y-4 max-w-3xl mx-14 py-24">
      <div>
        <label className="block text-sm font-medium">رقم الشاحنة</label>
        <input
          value={truckNumber}
          onChange={(e) => setTruckNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          placeholder="أدخل رقم الشاحنة"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">اسم الشاحن</label>
        <input
          value={shipperName}
          onChange={(e) => setShipperName(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          placeholder="اسم الشاحن"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">النوع</label>
        <select
          value={typeshiperId}
          onChange={(e) => setTypeshiperId(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">-- اختر النوع --</option>
          {typeshipers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">المالك</label>
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          placeholder="اسم المالك"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-sky-600 px-4 py-2 text-white"
      >
        {submitting ? "جاري الحفظ..." : "حفظ الشاحنة"}
      </button>
    </form>
  );
}
