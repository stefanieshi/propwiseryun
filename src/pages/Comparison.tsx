import { ComparisonTable } from "@/components/comparison/ComparisonTable"
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader"

export default function Comparison() {
  return (
    <div className="space-y-8">
      <ComparisonHeader />
      <ComparisonTable />
    </div>
  )
}