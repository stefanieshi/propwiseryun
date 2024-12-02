import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  income: z.string().min(1, "Income is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  creditScore: z.string().min(1, "Credit score is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
});

const MortgagePage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      employmentStatus: "",
      creditScore: "",
      loanAmount: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      toast({
        title: "Application submitted",
        description: "We'll process your information and get back to you shortly.",
      });
      
      setCurrentStep(currentStep + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        AI Mortgage Pre-Approval
      </h1>

      <div className="mb-8">
        <Progress value={(currentStep / 4) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Profile</span>
          <span>Documents</span>
          <span>Pre-approval</span>
          <span>Broker Match</span>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="approval">Pre-approval</TabsTrigger>
          <TabsTrigger value="broker">Broker Match</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
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
        </TabsContent>

        <TabsContent value="documents">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Required Documents</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Proof of Income</h3>
                <p className="text-sm text-gray-500">Last 3 months of payslips or SA302 for self-employed</p>
                <Button variant="outline" className="mt-2">Upload</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Bank Statements</h3>
                <p className="text-sm text-gray-500">Last 3 months of statements</p>
                <Button variant="outline" className="mt-2">Upload</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">ID Verification</h3>
                <p className="text-sm text-gray-500">Passport or driving license</p>
                <Button variant="outline" className="mt-2">Upload</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="approval">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pre-approval Status</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-700">Estimated Pre-approval Amount</h3>
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
        </TabsContent>

        <TabsContent value="broker">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Matched Brokers</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((broker) => (
                <div key={broker} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Premier Mortgage Solutions</h3>
                    <p className="text-sm text-gray-500">Specializes in first-time buyers</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-sm text-gray-500 ml-2">4.9/5 (120 reviews)</span>
                    </div>
                  </div>
                  <Button>Contact</Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MortgagePage;