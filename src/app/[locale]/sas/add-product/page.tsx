import AddProductForm from "@/components/sas/AddProductForm";
export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-2xl px-20 font-bold">إضافة منتج</h1>
      <p className="mt-2 text-sm  px-20text-muted-foreground">صفحة إضافة منتج (قابلة للتطوير)</p>
      <div className="mt-6">
            <AddProductForm />
          </div>
    </div>
    
  );
}
