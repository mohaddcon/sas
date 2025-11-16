"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";


type Customer = { id: string; name: string; email?: string };
type Category = { id: string; name: string };
type Unit = { id: string; nameunit: string };

export default function AddProductForm({ productId }: { productId?: string }) {
  const [id, setId] = useState<string | undefined>(productId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const deliveryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/sas/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d || []))
      .catch((e) => console.error(e));
    fetch("/api/sas/units")
      .then((r) => r.json())
      .then((d) => setUnits(d || []))
      .catch((e) => console.error(e));
    fetch("/api/sas/customers")
      .then((r) => r.json())
      .then((d) => setCustomers(d || []))
      .catch((e) => console.error(e));
  }, []);

  // Google Maps Places Autocomplete for pickup/delivery
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
      // @ts-expect-error
      if (!window.google || !window.google.maps || !window.google.maps.places) return;
      try {
        // @ts-expect-error
        if (pickupRef.current) new window.google.maps.places.Autocomplete(pickupRef.current as HTMLInputElement);
        // @ts-expect-error
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

  async function handleFileUpload(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("pathName", "products");
    setLoading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
        setPreview(data.url);
        toast.success("تم رفع الصورة");
      } else {
        toast.error(data?.error || "فشل رفع الصورة");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطأ في رفع الصورة");
    } finally {
      setLoading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    handleFileUpload(f);
  }

  async function handleSave() {
    setLoading(true);
    try {
      const payload = {
        id,
        name,
        description,
        categoryId,
        unitId,
        basePrice: basePrice ? parseFloat(basePrice) : 0,
        image: imageUrl,
        pickupLocation,
        deliveryLocation,
        customerId,
      } as const;

      const method = id ? "PUT" : "POST";
      const res = await fetch("/api/sas/products", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data: { id?: string; error?: string } = await res.json();
      if (res.ok) {
        toast.success(id ? "تم تعديل المنتج" : "تم إنشاء المنتج");
        setId(data.id || data.id);
      } else {
        toast.error(data?.error || "فشل الحفظ");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطأ في الشبكة");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl px-20">
      <h2 className="text-xl font-semibold mb-4">نموذج المنتج</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">رقم المنتج</label>
          <input value={id || ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium">اسم المنتج</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">نوع المنتج (فئة)</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2">
            <option value="">-- اختر الفئة --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">الوحدة</label>
          <select value={unitId} onChange={(e) => setUnitId(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2">
            <option value="">-- اختر الوحدة --</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>{u.nameunit}</option>
            ))}
          </select>
        </div>
       
       
        <div>
          <label className="block text-sm font-medium">صورة المنتج</label>
          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} />
            {preview && <img src={preview} alt="preview" className="h-16 w-16 object-cover rounded" />}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">الوصف</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium">السعر الأساسي</label>
          <input value={basePrice} onChange={(e) => setBasePrice(e.target.value)} type="number" step="0.01" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleSave} disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white">حفظ</button>
        </div>
      </div>
    </div>
  );
}
