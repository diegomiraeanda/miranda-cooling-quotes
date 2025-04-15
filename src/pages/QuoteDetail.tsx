import { Button } from "@/components/ui/button";
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
import { quotes } from "@/data/mockData";

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
    documentTitle: `Orçamento-${quote?.number || ""}`,
    onAfterPrint: () => {
      toast.success("Orçamento enviado para impressão");
    },
    onPrintError: () => {
      toast.error("Erro ao imprimir");
    }
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
            onClick={() => printRef.current && handlePrint()}
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
      <div ref={printRef} className="bg-white p-8 rounded-md border shadow print:shadow-none print:w-[210mm] print:max-h-[148mm] print:overflow-hidden print:p-4 print:border-0 print:rounded-none">
        {/* Quote Header for print */}
        <div className="mb-8 print:mb-3 border-b-2 border-blue-800 pb-4 print:pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4 w-2/3">
              <div className="w-16 h-16 print:w-12 print:h-12 bg-blue-700 rounded-md flex items-center justify-center print:bg-blue-800">
                <span className="text-white font-bold text-xl print:text-base">
                  {quote.companyInfo?.shortName || "RM"}
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-blue-800 text-xl print:text-sm uppercase tracking-wider print:text-black text-center">
                  {quote.companyInfo?.name || "COMÉRCIO DE REFRIGERAÇÃO MIRANDA LTDA"}
                </h1>
                <p className="text-sm print:text-xs text-blue-600 text-center">
                  {quote.companyInfo?.address || "Av. Principal, 1000 - Centro - CEP: 00000-000"}
                </p>
                <p className="text-sm print:text-xs text-blue-600 text-center">
                  Telefone: {quote.companyInfo?.phone || "(00) 9999-8888"} | CNPJ: {quote.companyInfo?.taxId || "12.345.678/0001-99"}
                </p>
              </div>
            </div>
            <div className="border-2 border-red-500 p-3 print:p-2 text-right min-w-[150px] print:min-w-[120px]">
              <h2 className="text-xl print:text-base font-semibold text-gray-900 uppercase">ORÇAMENTO</h2>
              <p className="text-red-600 font-bold text-lg print:text-base">#{quote.number}</p>
              <p className="text-sm print:text-xs text-gray-600">
                {format(new Date(quote.date), "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
        </div>

        {/* Customer information */}
        <div className="grid grid-cols-1 gap-4 mb-6 print:mb-3 border border-gray-300 p-4 print:p-2 rounded">
          <h3 className="text-sm print:text-xs font-semibold text-blue-800 uppercase border-b border-blue-200 pb-1 mb-2 print:mb-1">
            Dados do Cliente
          </h3>
          
          <div className="grid grid-cols-2 gap-4 print:gap-2">
            <div>
              <p className="text-gray-600 flex items-baseline print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Razão Social: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">
                  {quote.customerName || (quote.customer && quote.customer.name)}
                </span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Endereço: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">
                  {quote.customerAddress || (quote.customer && quote.customer.address) || ""}
                </span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Cidade: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.customerCity || ""}</span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Telefone: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">
                  {quote.customerPhone || (quote.customer && quote.customer.phone) || ""}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-baseline print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Email: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">
                  {quote.customerEmail || (quote.customer && quote.customer.email) || ""}
                </span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Estado: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.customerState || ""}</span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Data: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">
                  {format(new Date(quote.date), "dd/MM/yyyy", { locale: ptBR })}
                </span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Status: </span>
                <span className="ml-2">
                  {quote.status === "approved"
                    ? "Aprovado"
                    : quote.status === "sent"
                    ? "Enviado"
                    : quote.status === "rejected"
                    ? "Rejeitado"
                    : "Rascunho"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Equipment Information */}
        <div className="mb-6 print:mb-3 border border-gray-300 p-4 print:p-2 rounded">
          <h3 className="text-sm print:text-xs font-semibold text-blue-800 uppercase border-b border-blue-200 pb-1 mb-2 print:mb-1">
            Informações do Aparelho
          </h3>
          <div className="grid grid-cols-2 gap-4 print:gap-2">
            <div>
              <p className="text-gray-600 flex items-baseline print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Aparelho: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.deviceType || ""}</span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Marca: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.deviceBrand || ""}</span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Modelo: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.deviceModel || ""}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-baseline print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Nº de Série: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.deviceSerialNumber || ""}</span>
              </p>
              <p className="text-gray-600 flex items-baseline mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700 min-w-[100px] print:min-w-[80px]">Data Compra: </span>
                <span className="border-b border-gray-300 flex-1 ml-2">{quote.purchaseDate || ""}</span>
              </p>
              <p className="text-gray-600 mt-2 print:mt-1 print:text-xs">
                <span className="font-medium text-gray-700">Voltagem: </span>
                <span className="flex items-center mt-1">
                  <span className={`w-4 h-4 print:w-3 print:h-3 border border-gray-400 rounded-sm mr-1 ${quote.voltage === "110v" ? "bg-black" : "bg-white"}`}></span>
                  110V
                </span>
                <span className="inline-flex items-center">
                  <span className={`w-4 h-4 print:w-3 print:h-3 border border-gray-400 rounded-sm mr-1 ${quote.voltage === "220v" ? "bg-black" : "bg-white"}`}></span>
                  220V
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quote Items Table */}
        <div className="mb-4 print:mb-2">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-2 px-3 print:py-1 print:px-2 text-left text-sm print:text-xs font-semibold text-blue-800 border border-gray-300 uppercase">
                  Código
                </th>
                <th className="py-2 px-3 print:py-1 print:px-2 text-center text-sm print:text-xs font-semibold text-blue-800 border border-gray-300 uppercase">
                  Quant.
                </th>
                <th className="py-2 px-3 print:py-1 print:px-2 text-left text-sm print:text-xs font-semibold text-blue-800 border border-gray-300 uppercase">
                  Descrição
                </th>
                <th className="py-2 px-3 print:py-1 print:px-2 text-right text-sm print:text-xs font-semibold text-blue-800 border border-gray-300 uppercase">
                  Valor Unit. R$
                </th>
                <th className="py-2 px-3 print:py-1 print:px-2 text-right text-sm print:text-xs font-semibold text-blue-800 border border-gray-300 uppercase">
                  Valor Total R$
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-2 px-3 print:py-1 print:px-2 text-gray-800 print:text-xs border border-gray-300">
                    {item.code || "-"}
                  </td>
                  <td className="py-2 px-3 print:py-1 print:px-2 text-center text-gray-800 print:text-xs border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 print:py-1 print:px-2 text-gray-800 print:text-xs border border-gray-300">
                    {item.description}
                  </td>
                  <td className="py-2 px-3 print:py-1 print:px-2 text-right text-gray-800 print:text-xs border border-gray-300">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.unitPrice)}
                  </td>
                  <td className="py-2 px-3 print:py-1 print:px-2 text-right text-gray-800 print:text-xs border border-gray-300">
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

        {/* Cost Summary and Notes */}
        <div className="grid grid-cols-2 gap-8 print:gap-4 mb-4 print:mb-2">
          {/* Notes */}
          <div className="border border-gray-300 p-4 print:p-2 rounded">
            <h3 className="text-sm print:text-xs font-semibold text-blue-800 uppercase border-b border-blue-200 pb-1 mb-2 print:mb-1">
              Observações
            </h3>
            <p className="text-gray-700 print:text-xs min-h-[50px] print:min-h-[30px]">{quote.notes || ""}</p>
          </div>
          
          {/* Cost Summary */}
          <div className="border border-gray-300 p-4 print:p-2 rounded">
            <h3 className="text-sm print:text-xs font-semibold text-blue-800 uppercase border-b border-blue-200 pb-1 mb-2 print:mb-1">
              Resumo de Custos
            </h3>
            <div className="space-y-2 print:space-y-1">
              <div className="flex justify-between py-1 print:py-0.5 border-b border-gray-200">
                <span className="text-gray-600 print:text-xs">Total de Peças:</span>
                <span className="font-medium print:text-xs">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.partsCost || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1 print:py-0.5 border-b border-gray-200">
                <span className="text-gray-600 print:text-xs">Total de Mão-de-obra:</span>
                <span className="font-medium print:text-xs">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.laborCost || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1 print:py-0.5 border-b border-gray-200">
                <span className="text-gray-600 print:text-xs">Impermeabilização:</span>
                <span className="font-medium print:text-xs">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.waterproofingCost || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1 print:py-0.5 border-b border-gray-200">
                <span className="text-gray-600 print:text-xs">Taxa de Transporte:</span>
                <span className="font-medium print:text-xs">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.transportCost || 0)}
                </span>
              </div>
              <div className="flex justify-between py-1 print:py-0.5 border-b border-gray-200">
                <span className="text-gray-600 print:text-xs">Subtotal:</span>
                <span className="font-medium print:text-xs">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.subtotal)}
                </span>
              </div>
              <div className="flex justify-between py-2 print:py-1 text-lg print:text-sm font-semibold bg-blue-50 px-2 mt-2 print:mt-1">
                <span>TOTAL:</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quote.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment and Warranty Terms */}
        <div className="border border-gray-300 p-4 print:p-2 rounded mb-4 print:mb-2">
          <h3 className="text-sm print:text-xs font-semibold text-blue-800 uppercase border-b border-blue-200 pb-1 mb-2 print:mb-1">
            Para Uso Exclusivo do Cliente
          </h3>
          <p className="text-gray-700 print:text-xs mb-2 print:mb-1">
            O pagamento do conserto deve ser feito no ato. Este é o seu comprovante. Por gentileza, queira conferir a importância com a marca no original e pagar no caixa ou ao nosso Técnico.
          </p>
          <p className="text-gray-900 print:text-xs font-bold">
            Prazo de retirada da mercadoria em 90 (noventa) dias.
          </p>
        </div>

        {/* Customer Receipt Confirmation */}
        <div className="border border-gray-300 p-4 print:p-2 rounded mb-4 print:mb-2">
          <p className="text-gray-700 print:text-xs">
            Declaro ter recebido o aparelho em perfeito estado e funcionando, com garantia de 90 dias a partir da data abaixo.
          </p>
          <div className="mt-6 print:mt-3 flex justify-between items-end">
            <div className="w-2/3 border-t border-gray-400">
              <p className="text-center text-sm print:text-xs text-gray-600 mt-1">Assinatura do Cliente</p>
            </div>
            <div>
              <p className="text-sm print:text-xs text-gray-600">{format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
              <p className="text-center text-sm print:text-xs text-gray-600 mt-1">Data</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm print:text-xs text-gray-500 print:pt-1 border-t border-gray-200">
          <p className="text-blue-700 print:text-blue-800">{quote.companyInfo?.name || "COMÉRCIO DE REFRIGERAÇÃO MIRANDA LTDA"} - {quote.companyInfo?.taxId || "CNPJ: 12.345.678/0001-99"}</p>
          <p className="text-blue-700 print:text-blue-800">{quote.companyInfo?.address || "Av. Principal, 1000 - Centro - CEP: 00000-000"}</p>
          <p className="text-blue-700 print:text-blue-800">Tel: {quote.companyInfo?.phone || "(00) 9999-8888"} - Email: {quote.companyInfo?.email || "contato@refrigeracaomiranda.com.br"}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;
