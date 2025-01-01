import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const StampDutyCalculator = () => {
  const [price, setPrice] = useState("");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateStampDuty = async () => {
    if (!price) return;

    setIsCalculating(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-conveyancing', {
        body: {
          action: 'calculate_stamp_duty',
          data: {
            price: Number(price),
            firstTimeBuyer
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Stamp Duty Calculation",
        description: `Stamp Duty: £${data.stampDuty.toLocaleString()}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Stamp Duty Calculator</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Property Price</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter property price"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="first-time"
            checked={firstTimeBuyer}
            onCheckedChange={setFirstTimeBuyer}
          />
          <Label htmlFor="first-time">First Time Buyer</Label>
        </div>

        <Button
          onClick={calculateStampDuty}
          disabled={!price || isCalculating}
          className="w-full"
        >
          {isCalculating ? "Calculating..." : "Calculate Stamp Duty"}
        </Button>
      </div>
    </Card>
  );
};

export default StampDutyCalculator;