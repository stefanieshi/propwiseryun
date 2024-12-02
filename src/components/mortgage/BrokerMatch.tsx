import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const BrokerMatch = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Matched Brokers</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((broker) => (
          <div
            key={broker}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">Premier Mortgage Solutions</h3>
              <p className="text-sm text-gray-500">
                Specializes in first-time buyers
              </p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm text-gray-500 ml-2">
                  4.9/5 (120 reviews)
                </span>
              </div>
            </div>
            <Button>Contact</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};