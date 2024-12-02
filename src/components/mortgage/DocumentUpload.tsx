import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface DocumentStatus {
  id: string;
  document_type: string;
  validation_status: string;
  extracted_data: any;
}

export const DocumentUpload = () => {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const { data: documents, refetch } = useQuery({
    queryKey: ["mortgage-documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mortgage_documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DocumentStatus[];
    },
  });

  const uploadFile = async (file: File, documentType: string) => {
    try {
      setUploading(prev => ({ ...prev, [documentType]: true }));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${documentType}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("mortgage_docs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("mortgage_documents").insert({
        document_type: documentType,
        file_path: filePath,
        original_name: file.name,
        content_type: file.type,
        size: file.size,
      });

      if (dbError) throw dbError;

      toast({
        title: "Document uploaded successfully",
        description: "We're now processing your document...",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error uploading document",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [documentType]: false }));
    }
  };

  const getDocumentStatus = (type: string) => {
    return documents?.find(doc => doc.document_type === type);
  };

  const renderUploadStatus = (type: string) => {
    const status = getDocumentStatus(type);
    
    if (!status) return null;
    
    if (status.validation_status === "pending") {
      return (
        <div className="flex items-center text-yellow-500">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </div>
      );
    }
    
    if (status.validation_status === "completed") {
      return (
        <div className="flex items-center text-green-500">
          <CheckCircle className="w-4 h-4 mr-2" />
          Verified
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-red-500">
        <AlertCircle className="w-4 h-4 mr-2" />
        Failed
      </div>
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, type);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Required Documents</h2>
      <div className="space-y-4">
        {[
          {
            type: "income_proof",
            title: "Proof of Income",
            description: "Last 3 months of payslips or SA302 for self-employed",
          },
          {
            type: "bank_statements",
            title: "Bank Statements",
            description: "Last 3 months of statements",
          },
          {
            type: "id_verification",
            title: "ID Verification",
            description: "Passport or driving license",
          },
        ].map(({ type, title, description }) => (
          <div key={type} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              {renderUploadStatus(type)}
            </div>
            
            <div className="mt-4">
              <input
                type="file"
                id={`file-${type}`}
                className="hidden"
                onChange={(e) => handleFileChange(e, type)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor={`file-${type}`}>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={uploading[type]}
                  asChild
                >
                  <span>
                    {uploading[type] ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>

            {getDocumentStatus(type) && (
              <div className="mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  {getDocumentStatus(type)?.original_name}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};