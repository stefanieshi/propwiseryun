import PropertyGrid from "@/components/properties/PropertyGrid";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Properties</h1>
      <PropertyGrid loading={false} properties={[]} />
    </div>
  );
}