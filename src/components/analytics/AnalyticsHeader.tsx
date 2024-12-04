import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AnalyticsHeaderProps {
  propertyTitle: string;
  propertyId: string;
  onGenerateReport: () => void;
}

const AnalyticsHeader = ({ propertyTitle, propertyId, onGenerateReport }: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <BackButton />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Properties
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{propertyTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button 
        onClick={onGenerateReport}
        className="bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/20"
      >
        <FileText className="w-4 h-4 mr-2" />
        Generate Full AI Report (£10)
      </Button>
    </div>
  );
};

export default AnalyticsHeader;