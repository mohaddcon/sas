
import ShipmentsList from "@/components/sas/ShipmentsList";

export default function MyShipmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold px-12">شحناتي</h1>
      <p className="mt-2 text-sm text-muted-foreground px-12">قائمة الشحنات الخاصة بك</p>
      <div className="mt-6 px-12">
        {/* Shipments list (client wrapper) */}
        {/* ShipmentsListClient is a client component that performs a dynamic import internally */}
        {/* Server component imports this client wrappser directly */}
        <ShipmentsList />
      </div>
    </div>
  );
}
