
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quotes } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Quote } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const QuoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find quote in our mock data
    const foundQuote = quotes.find((q) => q.id === id);
    
    if (foundQuote) {
      setQuote(foundQuote);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Orçamento-${quote?.number || ""}`,
    onAfterPrint: () => {
      toast.success("Orçamento enviado para impressão");
    },
  });

  if (!quote) {
    return (
      <div className="text-center py-10">
        <p>Orçamento não encontrado</p>
        <Link to="/quotes" className="text-cooling-600 hover:underline mt-4 block">
          Voltar para lista de orçamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/quotes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Orçamento {quote.number}
            </h1>
            <div className="text-gray-600 text-sm mt-1 flex items-center">
              <span className="mr-3">
                {format(new Date(quote.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
              <StatusBadge status={quote.status} />
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => toast.info("Funcionalidade em desenvolvimento")}
          >
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      {/* Printable Quote */}
      <div ref={printRef} className={cn("bg-white p-8 rounded-md border shadow")}>
        {/* Quote Header for print */}
        <div className="flex justify-between items-start mb-8 print:mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cooling-700 rounded-md flex items-center justify-center print:bg-gray-800">
              <span className="text-white font-bold text-xl">RM</span>
            </div>
            <div>
              <h1 className="font-bold text-cooling-800 text-xl print:text-black">
                Refrigeração Miranda
              </h1>
              <p className="text-sm text-cooling-600 print:text-gray-600">
                Soluções em Refrigeração
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-900">ORÇAMENTO</h2>
            <p className="text-gray-600"># {quote.number}</p>
          </div>
        </div>

        {/* Quote Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              INFORMAÇÕES DO CLIENTE
            </h3>
            <p className="font-medium text-gray-900">{quote.customer.name}</p>
            <p className="text-gray-600">{quote.customer.address}</p>
            <p className="text-gray-600">{quote.customer.phone}</p>
            <p className="text-gray-600">{quote.customer.email}</p>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              DETALHES DO ORÇAMENTO
            </h3>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Data: </span>
              {format(new Date(quote.date), "dd/MM/yyyy", { locale: ptBR })}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Status: </span>
              {quote.status === "approved"
                ? "Aprovado"
                : quote.status === "sent"
                ? "Enviado"
                : quote.status === "rejected"
                ? "Rejeitado"
                : "Rascunho"}
            </p>
          </div>
        </div>

        {/* Quote Items */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Descrição
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                  Quant.
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                  Valor Unit.
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-800">{item.description}</td>
                  <td className="py-4 px-4 text-right text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-800">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.unitPrice)}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-800">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(quote.subtotal)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Impostos (10%):</span>
              <span className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(quote.tax)}
              </span>
            </div>
            <div className="flex justify-between py-3 border-t border-gray-300 text-lg font-semibold">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(quote.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {quote.notes && (
          <div className="mt-8 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              OBSERVAÇÕES
            </h3>
            <p className="text-gray-700">{quote.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 print:mt-16">
          <p>Refrigeração Miranda - CNPJ: 12.345.678/0001-99</p>
          <p>Av. Principal, 1000 - Centro - CEP: 00000-000</p>
          <p>Tel: (00) 9999-8888 - Email: contato@refrigeracaomiranda.com.br</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;
