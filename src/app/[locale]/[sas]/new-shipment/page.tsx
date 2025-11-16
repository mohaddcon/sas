import NewShipmentForm from "@/components/sas/NewShipmentForm";

export default function NewShipmentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold  px-14">شحنة جديدة</h1>
     
      <div className="mt-6">
        <NewShipmentForm />
      </div>
    </div>
  );
}
