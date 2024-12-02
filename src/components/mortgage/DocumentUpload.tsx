import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

export const DocumentUpload = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Required Documents</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Proof of Income</h3>
          <p className="text-sm text-gray-500">
            Last 3 months of payslips or SA302 for self-employed
          </p>
          <Button variant="outline" className="mt-2">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Bank Statements</h3>
          <p className="text-sm text-gray-500">Last 3 months of statements</p>
          <Button variant="outline" className="mt-2">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">ID Verification</h3>
          <p className="text-sm text-gray-500">Passport or driving license</p>
          <Button variant="outline" className="mt-2">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </Card>
  );
};