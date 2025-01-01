import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDocument = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-conveyancing', {
        body: { action: 'generate_document', data: { documentType } }
      });

      if (error) throw error;

      await supabase.from('conveyancing_documents').insert({
        document_type: documentType,
        content: data.content,
        status: 'draft'
      });

      toast({
        title: "Success",
        description: "Document generated successfully",
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
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Document Generator</h3>
      <div className="space-y-4">
        <Select value={documentType} onValueChange={setDocumentType}>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="transfer">Transfer Deed</SelectItem>
            <SelectItem value="mortgage">Mortgage Deed</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={generateDocument} 
          disabled={!documentType || isGenerating}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Document"}
        </Button>
      </div>
    </Card>
  );
};

export default DocumentGenerator;