"use client";

import { useEffect, useState } from "react";

type Shipment = {
  id: number | string;
  hipno?: string | null;
  pickupLocation?: string | null;
  deliveryLocation?: string | null;
  product?: string | null;
  productType?: string | null;
  unit?: string | null;
  loadDate?: string | null;
  deliveryDate?: string | null;
  goodsCost?: number | null;
  status?: string | null;
  price?: number | null;
  customer?: string | null;
  shipper?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};



export default function ShipmentsListClient() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selected, setSelected] = useState<Shipment | null>(null);

  const fetchShipments = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/sas/shipments${query ? `?q=${encodeURIComponent(query)}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      if (data && Array.isArray(data.shipments)) {
        setShipments(data.shipments);
      } else if (Array.isArray(data)) {
        setShipments(data);
      } else {
        setShipments([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث برقم الشحنة أو رقم الحجز"
          className="input input-bordered flex-1"
        />
        <button
          onClick={() => fetchShipments(q)}
          className="btn btn-primary"
          disabled={loading}
        >
          بحث
        </button>
      </div>

      <div className="mt-4">
        {loading && <p>جاري التحميل...</p>}
        {error && <p className="text-red-600">خطأ: {error}</p>}

        {!loading && !error && shipments.length === 0 && (
          <p className="text-sm text-muted-foreground">لا توجد شحنات لعرضها.</p>
        )}

        {shipments.length > 0 && (
          <div className="overflow-x-auto mt-2">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>رقم الشحنة</th>
                  <th>مكان التحميل</th>
                  <th>مكان التسليم</th>
                  <th>البضاعة</th>
                  <th>الوحدة</th>
                  <th>تاريخ التحميل</th>
                  <th>تاريخ التسليم</th>
                  <th>قيمة البضاعة</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={String(s.id)} className="cursor-pointer hover:bg-blue-100" onClick={() => setSelected(s)}>
                    <td>{s.hipno || "-"}</td>
                    <td>{s.pickupLocation || "-"}</td>
                    <td>{s.deliveryLocation || "-"}</td>
                    <td>{s.product || "-"}</td>
                    <td>{s.unit || "-"}</td>
                    <td>{s.loadDate ? new Date(s.loadDate).toLocaleDateString() : "-"}</td>
                    <td>{s.deliveryDate ? new Date(s.deliveryDate).toLocaleDateString() : "-"}</td>
                    <td>{s.goodsCost != null ? s.goodsCost : "-"}</td>
                    <td>{s.status || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
              <div className="font-semibold">البضاعة:</div>
              <div>{selected.product || "-"}</div>
              <div className="font-semibold">نوع المنتج:</div>
              <div>{selected.productType || "-"}</div>
              <div className="font-semibold">الوحدة:</div>
              <div>{selected.unit || "-"}</div>
              <div className="font-semibold">تاريخ التحميل:</div>
              <div>{selected.loadDate ? new Date(selected.loadDate).toLocaleString() : "-"}</div>
              <div className="font-semibold">تاريخ التسليم:</div>
              <div>{selected.deliveryDate ? new Date(selected.deliveryDate).toLocaleString() : "-"}</div>
              <div className="font-semibold">قيمة البضاعة:</div>
              <div>{selected.goodsCost != null ? selected.goodsCost : "-"}</div>
              <div className="font-semibold">الحالة:</div>
              <div>{selected.status || "-"}</div>
              <div className="font-semibold">السعر:</div>
              <div>{selected.price != null ? selected.price : "-"}</div>
              <div className="font-semibold">العميل:</div>
              <div>{selected.customer || "-"}</div>
              <div className="font-semibold">الشاحن:</div>
              <div>{selected.shipper || "-"}</div>
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

