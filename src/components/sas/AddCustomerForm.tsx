"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

type Customer = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  phone?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export default function AddCustomerForm() {
  const search = useSearchParams();
  const id = search?.get("id") || undefined;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(!id); // if no id, editable to create

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/sas/customers?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((data) => {
        setCustomer(data);
        setName(data?.name || "");
        setEmail(data?.email || "");
        setImage(data?.image || "");
        setPhone(data?.phone || "");
        setStreetAddress(data?.streetAddress || "");
        setCity(data?.city || "");
        setCountry(data?.country || "");
        setPostalCode(data?.postalCode || "");
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave() {
    setLoading(true);
    try {
      const payload = {
        id: customer?.id,
        name,
        email,
        image: image || null,
        phone: phone || null,
        streetAddress: streetAddress || null,
        postalCode: postalCode || null,
        city: city || null,
        country: country || null,
      } as const;

      const method = customer ? "PUT" : "POST";
      const res = await fetch("/api/sas/customers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(customer ? "تم تحديث العميل" : "تم إنشاء العميل");
        setCustomer(data);
        setEditable(false);
      } else {
        const resp = data as { error?: string } | null;
        toast.error(resp?.error || "حدث خطأ");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطأ في الشبكة");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (!customer) {
      // clear form
      setName("");
      setEmail("");
      setImage("");
      setPhone("");
      setStreetAddress("");
      setCity("");
      setCountry("");
      setPostalCode("");
    } else {
      // revert to customer values
      setName(customer.name || "");
      setEmail(customer.email || "");
      setImage(customer.image || "");
      setPhone(customer.phone || "");
      setStreetAddress(customer.streetAddress || "");
      setCity(customer.city || "");
      setCountry(customer.country || "");
      setPostalCode(customer.postalCode || "");
      setEditable(false);
    }
  }

  return (
    <div className="max-w-3xl px-14">
      <h2 className="text-xl font-semibold mb-4">نموذج العميل</h2>

      {loading && <p>جاري التحميل...</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-sm  font-semibold font-medium">رقم العميل</label>
          <input value={customer?.id || ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
        </div>

        <div>
          <label className="block text-sm font-semibold font-medium">اسم العميل</label>
          <input value={name} onChange={(e) => setName(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-semibold font-medium">ايميل</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">صورة (URL)</label>
          <input value={image || ""} onChange={(e) => setImage(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm  font-semibold font-medium">رقم التلفون</label>
          <input value={phone || ""} onChange={(e) => setPhone(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-semibold font-medium">العنوان (شارع)</label>
          <input value={streetAddress || ""} onChange={(e) => setStreetAddress(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold font-medium">المدينة</label>
            <input value={city || ""} onChange={(e) => setCity(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold font-medium">الدولة</label>
            <input value={country || ""} onChange={(e) => setCountry(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold font-medium">الرمز البريدي</label>
            <input value={postalCode || ""} onChange={(e) => setPostalCode(e.target.value)} disabled={!editable} className="mt-1 block w-full rounded-md border px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold font-medium">تاريخ الإضافة</label>
            <input value={customer?.createdAt ? new Date(customer.createdAt).toLocaleString() : ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold font-medium">تاريخ التعديل</label>
            <input value={customer?.updatedAt ? new Date(customer.updatedAt).toLocaleString() : ""} readOnly className="mt-1 block w-full rounded-md border px-3 py-2 bg-gray-50" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setEditable(true)} className="rounded-md border px-4 py-2">تعديل</button>
          <button type="button" onClick={handleSave} disabled={loading || !editable} className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white">حفظ</button>
          <button type="button" onClick={handleCancel} className="rounded-md border px-4 py-2">إلغاء</button>
        </div>
      </div>
    </div>
  );
}
