import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface WorkflowManagerProps {
  workflows: Array<{
    id: string;
    current_stage: string;
    completion_status: Record<string, any>;
    created_at: string;
  }>;
}

const WorkflowManager = ({ workflows }: WorkflowManagerProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Workflow Manager</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow key={workflow.id}>
              <TableCell>
                {new Date(workflow.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{workflow.current_stage}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(workflow.completion_status)}>
                  {getStatusLabel(workflow.completion_status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

const getStatusVariant = (status: Record<string, any>) => {
  const completion = Object.values(status).filter(Boolean).length / Object.keys(status).length;
  if (completion === 1) return "success";
  if (completion > 0.5) return "warning";
  return "secondary";
};

const getStatusLabel = (status: Record<string, any>) => {
  const completion = Object.values(status).filter(Boolean).length / Object.keys(status).length;
  if (completion === 1) return "Completed";
  if (completion > 0.5) return "In Progress";
  return "Pending";
};

export default WorkflowManager;