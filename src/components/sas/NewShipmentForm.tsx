"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Package, MapPin, DollarSign } from "lucide-react";

type ProductOpt = { id: string; name: string; categoryId?: string | null };
type CategoryOpt = { id: string; name: string };


import { useSession } from "next-auth/react";

type NewShipmentFormProps = {
  shipmentId?: string;
};

export default function NewShipmentForm({ shipmentId }: NewShipmentFormProps = {}) {
  // Load shipment for edit mode
  useEffect(() => {
    if (!shipmentId) return;
    fetch(`/api/sas/shipments?id=${shipmentId}`)
      .then((r) => r.json())
      .then((data) => {
        const s = data.shipment || data;
        if (!s) return;
        setHipno(s.shipno || "");
        setPickupLocation(s.pickupLocation || "");
        setDeliveryLocation(s.deliveryLocation || "");
        setProductId(s.productId || "");
        setCategoryId(s.categoryId || "");
        setUnitId(s.unitid || "");
        setTypeshiperId(s.typeshiperid || "");
        setLoadDate(s.loadDate ? new Date(s.loadDate).toISOString().slice(0,16) : "");
        setDeliveryDate(s.deliveryDate ? new Date(s.deliveryDate).toISOString().slice(0,16) : "");
        setGoodsCost(s.goodsCost?.toString() || "");
        setPrice(s.price?.toString() || "");
        setCustomer(s.CUSTOMER_id || "");
        setShipper(s.userId || "");
        setStatus(s.STATE?.[0] || "");
        setCreatedAt(s.createdAt || null);
        setUpdatedAt(s.updatedAt || null);
        setUserId(s.userId || null);
      });
  }, [shipmentId]);
  const [hipno, setHipno] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [loadDate, setLoadDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [goodsCost, setGoodsCost] = useState("");
  const [customer, setCustomer] = useState("");
  const [shipper, setShipper] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [price, setPrice] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const { data: session } = useSession();

  const [products, setProducts] = useState<ProductOpt[]>([]);
  const [categories, setCategories] = useState<CategoryOpt[]>([]);
  const [units, setUnits] = useState<{ id: string; nameunit: string }[]>([]);
  const [typeshipers, setTypeshipers] = useState<{ id: string; name: string }[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string; email?: string }[]>([]);
  const [accounts, setAccounts] = useState<{ id: string; userId: string }[]>([]);
  const [typeshiperId, setTypeshiperId] = useState("");

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const deliveryRef = useRef<HTMLInputElement | null>(null);

  // Load products and categories from new API endpoints
  useEffect(() => {
    // Set userId from session if available
    if (session?.user?.id) setUserId(session.user.id);
    fetch("/api/sas/products")
      .then((r) => r.json())
      .then((data) => setProducts(data || []))
      .catch((e) => console.error("Failed to load products", e));

    fetch("/api/sas/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data || []))
      .catch((e) => console.error("Failed to load categories", e));

    fetch("/api/sas/units")
      .then((r) => r.json())
      .then((data) => setUnits(data || []))
      .catch((e) => console.error("Failed to load units", e));

    fetch("/api/sas/typeshipers")
      .then((r) => r.json())
      .then((data) => setTypeshipers(data || []))
      .catch((e) => console.error("Failed to load typeshipers", e));

    fetch("/api/sas/customers")
      .then((r) => r.json())
      .then((data) => setCustomers(data || []))
      .catch((e) => console.error("Failed to load customers", e));

    fetch("/api/sas/accounts")
      .then((r) => r.json())
      .then((data) => setAccounts(data || []))
      .catch((e) => console.error("Failed to load accounts", e));
  }, [session]);

  // Initialize Google Places Autocomplete if API key present
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key) return;

    const existing = document.getElementById("gmaps-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "gmaps-script";
      s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=ar`;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
      s.onload = () => initAutocompletes();
    } else {
      initAutocompletes();
    }

    function initAutocompletes() {
  // @ts-expect-error - window.google may not be typed in this environment
  if (!window.google || !window.google.maps || !window.google.maps.places) return;
      try {
    // @ts-expect-error - window.google types are not available in this runtime typefile
    if (pickupRef.current) new window.google.maps.places.Autocomplete(pickupRef.current as HTMLInputElement);
    // @ts-expect-error - window.google types are not available in this runtime typefile
    if (deliveryRef.current) new window.google.maps.places.Autocomplete(deliveryRef.current as HTMLInputElement);
      } catch (e) {
        console.error('Places init failed', e);
      }
    }
  }, []);

  function openMaps(query: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: React.FormEvent) {
    const payload = {
      id: shipmentId,
      hipno,
      pickupLocation,
      deliveryLocation,
      productId: productId || undefined,
      categoryId: categoryId || undefined,
      unitId: unitId || undefined,
      typeshiperId: typeshiperId || undefined,
      loadDate: loadDate || undefined,
      deliveryDate: deliveryDate || undefined,
      goodsCost: goodsCost ? parseFloat(goodsCost) : undefined,
      price: price ? parseFloat(price) : undefined,
      customerId: customer || undefined,
      shipperId: shipper || undefined,
      status: status || undefined,
      userId: userId || undefined,
    } as const;

    try {
      const res = await fetch("/api/sas/orders", {
        method: shipmentId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(shipmentId ? "تم تحديث الشحنة بنجاح" : "تم إضافة الشحنة بنجاح");
        if (!shipmentId) {
          // Reset form only if creating
          setHipno("");
          setPickupLocation("");
          setDeliveryLocation("");
          setProductId("");
          setCategoryId("");
          setUnitId("");
          setLoadDate("");
          setDeliveryDate("");
          setGoodsCost("");
          setCustomer("");
          setShipper("");
          setStatus("");
          setPrice("");
          setCreatedAt(null);
          setUpdatedAt(null);
        }
      } else {
        toast.error(data?.error || (shipmentId ? "فشل تحديث الشحنة" : "فشل إنشاء الشحنة"));
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الإرسال");
    }
  }

  // When product changes, auto-select its category (if present)
  useEffect(() => {
    if (!productId) return;
    const sel = products.find((p) => p.id === productId);
    if (sel && sel.categoryId) setCategoryId(sel.categoryId);
  }, [productId, products]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-24 px-14 max-w-3xl font-semibold">
      <div>
        <label className="block text-sm font-medium">رقم الشحنة</label>
        <input
          value={hipno}
          onChange={(e) => setHipno(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          placeholder="مثال: HPN-12345"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">موقع التحميل</label>
          <div className="mt-1 flex">
            <input
              ref={pickupRef}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="flex-1 rounded-l-md border px-3 py-2"
              placeholder="أدخل عنوان التحميل"
              required
            />
            <button
              type="button"
              onClick={() => openMaps(pickupLocation || "")}
              className="rounded-r-md border px-3 flex items-center gap-2 bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              خرائط
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">موقع التسليم</label>
          <div className="mt-1 flex">
            <input
              ref={deliveryRef}
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="flex-1 rounded-l-md border px-3 py-2"
              placeholder="أدخل عنوان التسليم"
              required
            />
            <button
              type="button"
              onClick={() => openMaps(deliveryLocation || "")}
              className="rounded-r-md border px-3 flex items-center gap-2 bg-slate-50"
            >
              <MapPin className="h-4 w-4" />
              خرائط
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">المنتج</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 block w-full rounded-md border px-3 py-2"
          required
        >
          <option value="">-- اختر المنتج --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">نوع الشاحنة</label>
          <select
            value={typeshiperId}
            onChange={(e) => setTypeshiperId(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">-- اختر نوع الشاحنة --</option>
            {typeshipers.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">نوع المنتج (فئة)</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">-- اختر نوع المنتج --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium">الوحدة</label>
          <select
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">-- اختر الوحدة --</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>{u.nameunit}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">تكلفة البضاعة</label>
          <div className="mt-1 flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            <input
              value={goodsCost}
              onChange={(e) => setGoodsCost(e.target.value)}
              type="number"
              step="0.01"
              className="flex-1 rounded-md border px-3 py-2"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">السعر</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border px-3 py-2"
            placeholder="أدخل السعر"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">تاريخ التحميل</label>
          <input
            value={loadDate}
            onChange={(e) => setLoadDate(e.target.value)}
            type="datetime-local"
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">تاريخ التوصيل</label>
          <input
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            type="datetime-local"
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">العميل</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">-- اختر العميل --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.email ? ` (${c.email})` : ""}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">الشاحن</label>
          <select
            value={shipper}
            onChange={(e) => setShipper(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-100"
            disabled
            required
          >
            {session?.user?.id && (
              <option value={session.user.id}>{session.user.name || session.user.email || session.user.id}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">الحالة</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            >
             
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">تاريخ الإضافة</label>
          <input value={createdAt ? new Date(createdAt).toLocaleString() : ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium">تاريخ التعديل</label>
          <input value={updatedAt ? new Date(updatedAt).toLocaleString() : ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
        </div>
      </div>
      {/* userId hidden field */}
      <input type="hidden" value={userId || ""} name="userId" />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white"
        >
          <Package className="h-4 w-4" />
          {submitting ? "جاري الحفظ..." : "حفظ الشحنة"}
        </button>
        <button
          type="button"
          onClick={() => {
            // reset
            setHipno("");
            setPickupLocation("");
            setDeliveryLocation("");
            setProductId("");
            setCategoryId("");
            setUnitId("");
            setLoadDate("");
            setDeliveryDate("");
            setGoodsCost("");
            setCustomer("");
            setShipper("");
            setStatus("");
          }}
          className="rounded-md border px-4 py-2"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
