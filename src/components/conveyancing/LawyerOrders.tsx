import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Fees {
  hourly_rate?: number;
  [key: string]: any;
}

const LawyerOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["lawyerOrders"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // First get the orders
      const { data: userOrders, error: ordersError } = await supabase
        .from("lawyer_orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      
      if (!userOrders?.length) return [];

      // Then fetch the lawyer details for each order
      const { data: lawyers, error: lawyersError } = await supabase
        .from("brokers")
        .select("id, name, fees")
        .in("id", userOrders.map(order => order.lawyer_id));

      if (lawyersError) throw lawyersError;

      // Combine the data
      return userOrders.map(order => ({
        ...order,
        lawyer: lawyers?.find(l => l.id === order.lawyer_id) || null
      }));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
        <p className="text-muted-foreground">
          When you place an order with a lawyer, it will appear here
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Lawyer</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
            <TableCell>
              {order.lawyer?.name}
              <br />
              <span className="text-sm text-muted-foreground">
                £{(order.lawyer?.fees as Fees)?.hourly_rate || 'N/A'}/hr
              </span>
            </TableCell>
            <TableCell>{order.service_type}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {order.status}
              </span>
            </TableCell>
            <TableCell>£{order.price}</TableCell>
            <TableCell>
              {new Date(order.created_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LawyerOrders;