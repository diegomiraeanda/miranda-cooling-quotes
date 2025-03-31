
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quotes } from "@/data/mockData";
import { Check, FileText, Send, X } from "lucide-react";
import QuoteTable from "@/components/QuoteTable";

const Dashboard = () => {
  // Count quotes by status
  const draftCount = quotes.filter((q) => q.status === "draft").length;
  const sentCount = quotes.filter((q) => q.status === "sent").length;
  const approvedCount = quotes.filter((q) => q.status === "approved").length;
  const rejectedCount = quotes.filter((q) => q.status === "rejected").length;

  // Calculate total revenue from approved quotes
  const totalRevenue = quotes
    .filter((q) => q.status === "approved")
    .reduce((sum, q) => sum + q.total, 0);

  // Get latest quotes (limit to 5)
  const latestQuotes = [...quotes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Visão geral dos orçamentos da Refrigeração Miranda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rascunhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold">{draftCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{sentCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Aprovados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{approvedCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rejeitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <X className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold">{rejectedCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Faturamento de Orçamentos Aprovados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-cooling-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalRevenue)}
          </div>
        </CardContent>
      </Card>

      {/* Latest Quotes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Orçamentos Recentes
        </h2>
        <QuoteTable quotes={latestQuotes} />
      </div>
    </div>
  );
};

export default Dashboard;
