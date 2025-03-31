
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import QuoteTable from "@/components/QuoteTable";
import { quotes } from "@/data/mockData";
import { useState } from "react";
import { Quote } from "@/types";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";

const QuotesList = () => {
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterQuotes(term, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    filterQuotes(searchTerm, value);
  };

  const filterQuotes = (term: string, status: string) => {
    let filtered = [...quotes];

    // Filter by search term
    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(
        (quote) =>
          quote.number.toLowerCase().includes(lowerTerm) ||
          quote.customer.name.toLowerCase().includes(lowerTerm)
      );
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((quote) => quote.status === status);
    }

    setFilteredQuotes(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os orçamentos da Refrigeração Miranda
          </p>
        </div>
        <Link to="/quotes/new">
          <Button className="bg-cooling-600 hover:bg-cooling-700">
            <Plus className="mr-2 h-4 w-4" /> Novo Orçamento
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por número ou cliente..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-9"
            />
          </div>
          <Select defaultValue="all" onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="sent">Enviado</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <QuoteTable quotes={filteredQuotes} />
    </div>
  );
};

export default QuotesList;
