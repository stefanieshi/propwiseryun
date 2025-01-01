import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DocumentAutomation = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDocument = async (templateType: string) => {
    setIsGenerating(true);
    try {
      // This is a placeholder for the actual document generation logic
      toast({
        title: "Document Generation Started",
        description: "Your document is being generated...",
      });
      
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Document Generated",
        description: "Your document has been generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <Button
              variant="outline"
              onClick={() => generateDocument("sale_contract")}
              disabled={isGenerating}
            >
              Generate
            </Button>
          </div>
          <h3 className="font-semibold">Contract of Sale</h3>
          <p className="text-sm text-muted-foreground">
            Generate a standard contract of sale with all necessary clauses and terms
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <Button
              variant="outline"
              onClick={() => generateDocument("property_info")}
              disabled={isGenerating}
            >
              Generate
            </Button>
          </div>
          <h3 className="font-semibold">Property Information Form</h3>
          <p className="text-sm text-muted-foreground">
            Create a comprehensive property information form with all required details
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <Button
              variant="outline"
              onClick={() => generateDocument("title_summary")}
              disabled={isGenerating}
            >
              Generate
            </Button>
          </div>
          <h3 className="font-semibold">Title Deed Summary</h3>
          <p className="text-sm text-muted-foreground">
            Generate a detailed summary of the property's title deed and history
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Document Validation</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Check className="h-5 w-5 text-green-500" />
            <span>All documents are compliant with current regulations</span>
          </div>
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>2 documents require additional information</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentAutomation;