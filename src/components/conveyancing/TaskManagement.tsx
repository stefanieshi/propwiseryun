import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TaskManagement = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: "Submit Contract Draft",
      assignedTo: "Sarah Johnson",
      status: "pending",
      priority: "high",
      dueDate: "2024-03-20",
    },
    {
      id: 2,
      title: "Review Property Information Form",
      assignedTo: "Michael Chen",
      status: "completed",
      priority: "medium",
      dueDate: "2024-03-18",
    },
    {
      id: 3,
      title: "Land Registry Search",
      assignedTo: "Emma Wilson",
      status: "overdue",
      priority: "high",
      dueDate: "2024-03-15",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Tasks</h2>
        <Button>Create New Task</Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{task.title}</h3>
                  {getStatusBadge(task.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Assigned to: {task.assignedTo}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {task.status !== "completed" && (
                  <Button size="sm">Mark Complete</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Task Overview</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm font-medium">Completed</div>
              <div className="text-2xl font-bold">4</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="text-sm font-medium">Pending</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div>
              <div className="text-sm font-medium">Overdue</div>
              <div className="text-2xl font-bold">1</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskManagement;