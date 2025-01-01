import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Home, CheckCircle } from "lucide-react";
import { UserProgress } from "@/types";

interface ProgressTrackerProps {
  userProgress: UserProgress | null;
}

const progressSteps = [
  { title: "Research", icon: Home },
  { title: "Analysis", icon: FileText },
  { title: "Legal Check", icon: FileText },
  { title: "Final Steps", icon: CheckCircle },
];

const calculateProgress = (userProgress: UserProgress | null) => {
  if (!userProgress) return 0;
  const totalSteps = progressSteps.length;
  const currentStepIndex = progressSteps.findIndex(
    (step) => step.title.toLowerCase() === userProgress.stage.toLowerCase()
  );
  return ((currentStepIndex + 1) / totalSteps) * 100;
};

export const ProgressTracker = ({ userProgress }: ProgressTrackerProps) => {
  return (
    <Card className="p-4 mb-6 sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Home Buying Progress</h2>
        <span className="text-sm text-muted-foreground">
          {Math.round(calculateProgress(userProgress))}% Complete
        </span>
      </div>
      <Progress value={calculateProgress(userProgress)} className="h-2 mb-3" />
      <div className="grid grid-cols-4 gap-2">
        {progressSteps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive =
            userProgress?.stage.toLowerCase() === step.title.toLowerCase();
          const isCompleted =
            calculateProgress(userProgress) >
            ((index + 1) / progressSteps.length) * 100;

          return (
            <div
              key={step.title}
              className={`flex items-center p-2 rounded-lg ${
                isActive ? "bg-primary/10" : ""
              }`}
            >
              <StepIcon
                className={`h-4 w-4 mr-1.5 ${
                  isCompleted ? "text-primary" : "text-gray-400"
                }`}
              />
              <span className="text-xs font-medium">{step.title}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};