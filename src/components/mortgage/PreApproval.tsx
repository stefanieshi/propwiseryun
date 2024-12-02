import { Card } from "@/components/ui/card";

export const PreApproval = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pre-approval Status</h2>
      <div className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-700">
            Estimated Pre-approval Amount
          </h3>
          <p className="text-3xl font-bold text-green-600">£350,000</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Interest Rate Range</h3>
            <p className="text-2xl font-semibold">4.2% - 4.8%</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Monthly Payment</h3>
            <p className="text-2xl font-semibold">£1,670 - £1,890</p>
          </div>
        </div>
      </div>
    </Card>
  );
};