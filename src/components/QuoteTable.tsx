
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Quote } from "@/types";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import EmptyState from "./EmptyState";

interface QuoteTableProps {
  quotes: Quote[];
}

const QuoteTable = ({ quotes }: QuoteTableProps) => {
  if (quotes.length === 0) {
    return (
      <EmptyState
        title="Nenhum orçamento encontrado"
        description="Você ainda não tem orçamentos cadastrados."
        actionLabel="Criar Orçamento"
        actionLink="/quotes/new"
      />
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Número</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell className="font-medium">{quote.number}</TableCell>
              <TableCell>
                {format(new Date(quote.date), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>
                {/* Use customerName field directly or fall back to customer.name if available */}
                {quote.customerName || (quote.customer && quote.customer.name) || "N/A"}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(quote.total)}
              </TableCell>
              <TableCell>
                <StatusBadge status={quote.status} />
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/quotes/${quote.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> Visualizar
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuoteTable;
