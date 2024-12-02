import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  income: z.string().min(1, "Income is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  creditScore: z.string().min(1, "Credit score is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
  loanPurpose: z.string().min(1, "Loan purpose is required"),
  propertyType: z.string().min(1, "Property type is required"),
  location: z.string().min(1, "Location is required"),
  estimatedPrice: z.string().min(1, "Estimated price is required"),
});

export const EnhancedOnboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      income: "",
      employmentStatus: "",
      creditScore: "",
      loanAmount: "",
      loanPurpose: "",
      propertyType: "",
      location: "",
      estimatedPrice: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update user profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: values.fullName })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Create pre-approval entry
      const { error: preApprovalError } = await supabase
        .from("pre_approvals")
        .insert({
          user_id: user.id,
          income: parseFloat(values.income),
          employment_status: values.employmentStatus,
          credit_score: parseInt(values.creditScore),
          estimated_amount: parseFloat(values.loanAmount),
          approval_likelihood: calculateApprovalLikelihood(values),
          criteria_matched: generateCriteriaMatched(values),
        });

      if (preApprovalError) throw preApprovalError;

      toast.success("Profile updated successfully");
      onComplete();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateApprovalLikelihood = (values: z.infer<typeof formSchema>) => {
    const creditScore = parseInt(values.creditScore);
    const income = parseFloat(values.income);
    const loanAmount = parseFloat(values.loanAmount);

    let score = 0;
    
    // Credit score impact (40% weight)
    if (creditScore >= 750) score += 40;
    else if (creditScore >= 700) score += 30;
    else if (creditScore >= 650) score += 20;
    else score += 10;

    // Income to loan ratio impact (40% weight)
    const incomeRatio = (loanAmount / income) * 100;
    if (incomeRatio <= 300) score += 40;
    else if (incomeRatio <= 400) score += 30;
    else if (incomeRatio <= 500) score += 20;
    else score += 10;

    // Employment status impact (20% weight)
    if (values.employmentStatus === "Full-time") score += 20;
    else if (values.employmentStatus === "Part-time") score += 15;
    else if (values.employmentStatus === "Self-employed") score += 10;
    else score += 5;

    return score;
  };

  const generateCriteriaMatched = (values: z.infer<typeof formSchema>) => {
    const criteria: string[] = [];
    const creditScore = parseInt(values.creditScore);
    const income = parseFloat(values.income);

    if (creditScore >= 700) criteria.push("Excellent credit score");
    if (income >= 50000) criteria.push("Strong income");
    if (values.employmentStatus === "Full-time") criteria.push("Stable employment");
    
    return criteria;
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+44 123 456 7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input placeholder="£" {...field} />
                  </FormControl>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Self-employed">Self-employed</SelectItem>
                      <SelectItem value="Contractor">Contractor</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FormDescription>
                    Usually between 300 and 850
                  </FormDescription>
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

            <FormField
              control={form.control}
              name="loanPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Purpose</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="buy-to-let">Buy to Let</SelectItem>
                      <SelectItem value="remortgage">Remortgage</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postcode or area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Purchase Price</FormLabel>
                  <FormControl>
                    <Input placeholder="£" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Complete Profile"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};