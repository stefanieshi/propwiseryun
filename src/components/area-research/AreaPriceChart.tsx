import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatPrice } from "@/components/analytics/utils/priceCalculations";

interface AreaPriceChartProps {
  data: any[];
  selectedAreas: string[];
}

const AreaPriceChart = ({ data, selectedAreas }: AreaPriceChartProps) => {
  const colors = [
    "hsl(262, 80%, 50%)", // Purple
    "hsl(316, 70%, 50%)", // Pink
    "hsl(31, 90%, 50%)",  // Orange
    "hsl(200, 95%, 45%)", // Blue
    "hsl(142, 70%, 45%)"  // Green
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}:</span>
              <span className="font-medium">
                {formatPrice(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Price History Comparison</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#8B5CF6"
              tick={{ fill: '#8B5CF6' }}
            />
            <YAxis 
              tickFormatter={formatPrice}
              stroke="#8B5CF6"
              tick={{ fill: '#8B5CF6' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                color: '#8B5CF6'
              }}
            />
            {selectedAreas.map((postcode, index) => (
              <Line
                key={postcode}
                type="monotone"
                dataKey={postcode}
                name={`${postcode} Area`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                className="filter drop-shadow-md"
                animationDuration={2000}
                animationBegin={index * 300}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AreaPriceChart;