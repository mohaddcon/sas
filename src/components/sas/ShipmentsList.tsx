"use client";

import React, { useEffect, useState } from "react";


export default function ShipmentsList() {
  type Shipment = {
    id: string;
    shipno: string;
    pickupLocation: string;
    deliveryLocation: string;
    product?: { name: string } | null;
    category?: { name: string } | null;
    unit?: { nameunit: string } | null;
    typeshiper?: { name: string } | null;
    CUSTOMER?: { name: string } | null;
    CUSTOMERship?: { name: string } | null;
    price?: number | null;
    STATE?: string[];
    loadDate?: string | null;
    deliveryDate?: string | null;
    goodsCost?: number | null;
    createdAt: string;
    updatedAt: string;
  };

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Shipment | null>(null);

  async function fetchList(query?: string) {
    setLoading(true);
    try {
      const url = "/api/sas/shipments" + (query ? `?q=${encodeURIComponent(query)}` : "");
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setShipments(data.shipments || []);
      } else {
        setShipments([]);
      }
    } catch (err) {
      console.error(err);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div >
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث برقم الشحنة"
          className="rounded-md border px-3 py-2"
        />
        <button
          onClick={() => fetchList(q)}
          className="rounded-md bg-sky-600 px-4 py-2 text-white"
        >
          بحث
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : shipments.length === 0 ? (
        <div>لا توجد شحنات</div>
      ) : (
        <div className="overflow-x-auto px-14">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-2 border">رقم الشحنة</th>
                <th className="p-2 border">موقع التحميل</th>
                <th className="p-2 border">موقع التسليم</th>
                <th className="p-2 border">المنتج</th>
                <th className="p-2 border">الفئة</th>
                <th className="p-2 border">الوحدة</th>
                <th className="p-2 border">نوع الشاحن</th>
                <th className="p-2 border">العميل</th>
                <th className="p-2 border">المستخدم</th>
                <th className="p-2 border">السعر</th>
                <th className="p-2 border">الحالة</th>
                <th className="p-2 border">تاريخ التحميل</th>
                <th className="p-2 border">تاريخ التوصيل</th>
                <th className="p-2 border">قيمة البضاعة</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="cursor-pointer hover:bg-blue-100" onClick={() => setSelected(s)}>
                  <td className="p-2 border">{s.shipno}</td>
                  <td className="p-2 border">{s.pickupLocation}</td>
                  <td className="p-2 border">{s.deliveryLocation}</td>
                  <td className="p-2 border">{s.product?.name || "-"}</td>
                  <td className="p-2 border">{s.category?.name || "-"}</td>
                  <td className="p-2 border">{s.unit?.nameunit || "-"}</td>
                  <td className="p-2 border">{s.typeshiper?.name || "-"}</td>
                  <td className="p-2 border">{s.CUSTOMER?.name || "-"}</td>
                  <td className="p-2 border">{s.CUSTOMERship?.name || "-"}</td>
                  <td className="p-2 border">{s.price != null ? s.price : "-"}</td>
                  <td className="p-2 border">{Array.isArray(s.STATE) ? s.STATE.join(", ") : "-"}</td>
                  <td className="p-2 border">{s.loadDate ? new Date(s.loadDate).toLocaleString() : "-"}</td>
                  <td className="p-2 border">{s.deliveryDate ? new Date(s.deliveryDate).toLocaleString() : "-"}</td>
                  <td className="p-2 border">{s.goodsCost != null ? s.goodsCost : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for shipment details */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 left-2 text-xl font-bold text-gray-500 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">تفاصيل الشحنة</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">رقم الشحنة:</div>
              <div>{selected.hipno || "-"}</div>
              <div className="font-semibold">مكان التحميل:</div>
              <div>{selected.pickupLocation || "-"}</div>
              <div className="font-semibold">مكان التسليم:</div>
              <div>{selected.deliveryLocation || "-"}</div>
              <div className="font-semibold">المنتج:</div>
              <div>{selected.product?.name || "-"}</div>
              <div className="font-semibold">الفئة:</div>
              <div>{selected.category?.name || "-"}</div>
              <div className="font-semibold">الوحدة:</div>
              <div>{selected.unit?.nameunit || "-"}</div>
              <div className="font-semibold">نوع الشاحن:</div>
              <div>{selected.typeshiper?.name || "-"}</div>
              <div className="font-semibold">العميل:</div>
              <div>{selected.CUSTOMER?.name || "-"}</div>
              <div className="font-semibold">المستخدم:</div>
              <div>{selected.CUSTOMERship?.name || "-"}</div>
              <div className="font-semibold">السعر:</div>
              <div>{selected.price != null ? selected.price : "-"}</div>
              <div className="font-semibold">الحالة:</div>
              <div>{Array.isArray(selected.STATE) ? selected.STATE.join(", ") : "-"}</div>
              <div className="font-semibold">تاريخ التحميل:</div>
              <div>{selected.loadDate ? new Date(selected.loadDate).toLocaleString() : "-"}</div>
              <div className="font-semibold">تاريخ التوصيل:</div>
              <div>{selected.deliveryDate ? new Date(selected.deliveryDate).toLocaleString() : "-"}</div>
              <div className="font-semibold">قيمة البضاعة:</div>
              <div>{selected.goodsCost != null ? selected.goodsCost : "-"}</div>
              <div className="font-semibold">تاريخ الإضافة:</div>
              <div>{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "-"}</div>
              <div className="font-semibold">تاريخ التعديل:</div>
              <div>{selected.updatedAt ? new Date(selected.updatedAt).toLocaleString() : "-"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
