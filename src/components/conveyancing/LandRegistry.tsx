import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LandRegistry = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = async () => {
    setIsSubmitting(true);
    try {
      // Placeholder for actual submission logic
      toast({
        title: "Submission Started",
        description: "Your documents are being processed...",
      });
      
      // Simulate submission process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Submission Complete",
        description: "Your documents have been submitted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Land Registry Submission</h3>
            <p className="text-sm text-muted-foreground">
              Submit and track your Land Registry applications
            </p>
          </div>
          <Button onClick={handleSubmission} disabled={isSubmitting}>
            <Upload className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Search className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-medium">Title Search</h4>
                  <p className="text-sm text-muted-foreground">
                    Search and verify property titles
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Upload className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-medium">Document Upload</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload and validate documents
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-medium">Status Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor application progress
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Submissions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
            <div>
              <div className="font-medium">AP123456789</div>
              <div className="text-sm text-muted-foreground">
                Submitted on March 15, 2024
              </div>
            </div>
            <Badge variant="secondary">Processing</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
            <div>
              <div className="font-medium">AP987654321</div>
              <div className="text-sm text-muted-foreground">
                Submitted on March 10, 2024
              </div>
            </div>
            <Badge className="bg-green-500">Completed</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LandRegistry;