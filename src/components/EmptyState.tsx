
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  actionLabel?: string;
  actionLink?: string;
}

const EmptyState = ({
  title,
  description,
  icon: Icon = FileText,
  actionLabel,
  actionLink,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg border-gray-300 bg-white">
      <div className="w-16 h-16 rounded-full bg-cooling-50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-cooling-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button className="bg-cooling-600 hover:bg-cooling-700">
            <Plus className="mr-2 h-4 w-4" /> {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
