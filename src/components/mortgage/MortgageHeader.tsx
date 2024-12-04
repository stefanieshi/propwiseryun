import { Progress } from "@/components/ui/progress";

interface MortgageHeaderProps {
  currentStep: number;
  title: string;
}

export const MortgageHeader = ({ currentStep, title }: MortgageHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#40E0D0] to-[#48D1CC] bg-clip-text text-transparent">
        {title}
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
    </>
  );
};