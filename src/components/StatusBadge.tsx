
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type QuoteStatus = "draft" | "sent" | "approved" | "rejected";

interface StatusBadgeProps {
  status: QuoteStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<
    QuoteStatus,
    { label: string; className: string }
  > = {
    draft: {
      label: "Rascunho",
      className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    },
    sent: {
      label: "Enviado",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    approved: {
      label: "Aprovado",
      className: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    rejected: {
      label: "Rejeitado",
      className: "bg-red-100 text-red-800 hover:bg-red-200",
    },
  };

  const config = statusConfig[status];

  return <Badge className={cn(config.className)}>{config.label}</Badge>;
};

export default StatusBadge;
