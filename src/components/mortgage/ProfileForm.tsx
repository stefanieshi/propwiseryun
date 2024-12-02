import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  income: z.string().min(1, "Income is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  creditScore: z.string().min(1, "Credit score is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
});

interface ProfileFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      employmentStatus: "",
      creditScore: "",
      loanAmount: "",
    },
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input placeholder="£" {...field} />
                </FormControl>
                <FormDescription>
                  Your total annual income before tax
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Employed, Self-employed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Score</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your credit score" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Loan Amount</FormLabel>
                <FormControl>
                  <Input placeholder="£" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Continue to Document Upload
          </Button>
        </form>
      </Form>
    </Card>
  );
};