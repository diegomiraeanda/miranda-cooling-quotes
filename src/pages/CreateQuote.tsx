import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Printer, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  customerName: z.string().min(1, { message: "Nome do cliente é obrigatório" }),
  customerAddress: z.string().optional(),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email({ message: "E-mail inválido" }).optional().or(z.literal('')),
  customerCity: z.string().optional(),
  customerState: z.string().optional(),
  date: z.date({ required_error: "Data é obrigatória" }),
  
  deviceType: z.string().optional(),
  deviceBrand: z.string().optional(),
  deviceModel: z.string().optional(),
  deviceSerialNumber: z.string().optional(),
  purchaseDate: z.string().optional(),
  voltage: z.enum(["110v", "220v", ""]).optional(),
  
  notes: z.string().optional(),
  items: z.array(
    z.object({
      description: z.string().min(1, { message: "Descrição do serviço/produto é obrigatória" }),
      quantity: z.number().min(1, { message: "Quantidade deve ser maior que 0" }),
      unitPrice: z.number().min(0, { message: "Preço deve ser maior ou igual a 0" }),
    })
  ).min(1, { message: "Adicione pelo menos um item" }),
});

type FormValues = z.infer<typeof formSchema>;

const COMPANY_INFO = {
  name: "Refrigeração Miranda",
  shortName: "RM",
  address: "Av. Principal, 1000 - Centro - CEP: 00000-000",
  phone: "(00) 9999-8888",
  email: "contato@refrigeracaomiranda.com.br",
  taxId: "CNPJ: 12.345.678/0001-99"
};

const quotes: any[] = [];

const CreateQuote = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<{ 
    id: string; 
    description: string; 
    quantity: number; 
    unitPrice: number 
  }[]>([{ id: "1", description: "", quantity: 1, unitPrice: 0 }]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",
      customerCity: "",
      customerState: "",
      deviceType: "",
      deviceBrand: "",
      deviceModel: "",
      deviceSerialNumber: "",
      purchaseDate: "",
      voltage: "",
      date: new Date(),
      notes: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const onSubmit = (data: FormValues) => {
    const itemsWithTotals = data.items.map(item => ({
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      total: item.quantity * item.unitPrice
    }));
    
    const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal;
    
    const newQuoteId = `quote-${Date.now()}`;
    
    const quote = {
      id: newQuoteId,
      number: `ORC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: format(data.date, "yyyy-MM-dd"),
      customerName: data.customerName,
      customerAddress: data.customerAddress || "",
      customerPhone: data.customerPhone || "",
      customerEmail: data.customerEmail || "",
      customerCity: data.customerCity || "",
      customerState: data.customerState || "",
      
      deviceType: data.deviceType || "",
      deviceBrand: data.deviceBrand || "",
      deviceModel: data.deviceModel || "",
      deviceSerialNumber: data.deviceSerialNumber || "",
      purchaseDate: data.purchaseDate || "",
      voltage: data.voltage || "",
      
      items: itemsWithTotals,
      
      partsCost: subtotal,
      laborCost: 0,
      subtotal,
      total,
      notes: data.notes || "",
      status: "draft" as const,
      companyInfo: COMPANY_INFO
    };
    
    console.log("Orçamento criado:", quote);
    
    quotes.push(quote);
    
    toast.success("Orçamento criado com sucesso!");
    
    navigate(`/quotes/${newQuoteId}`);
  };

  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      description: "",
      quantity: 1,
      unitPrice: 0
    };
    setItems([...items, newItem]);
    form.setValue('items', [...form.getValues('items'), { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) {
      return;
    }
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    
    const formItems = [...form.getValues('items')];
    formItems.splice(index, 1);
    form.setValue('items', formItems);
  };

  const calculateItemTotal = (index: number) => {
    const quantity = form.watch(`items.${index}.quantity`) || 0;
    const unitPrice = form.watch(`items.${index}.unitPrice`) || 0;
    return quantity * unitPrice;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center bg-white p-4 mb-6 shadow-sm rounded-lg">
        <div className="w-12 h-12 bg-cooling-700 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-xl">{COMPANY_INFO.shortName}</span>
        </div>
        <div className="ml-4">
          <h1 className="font-bold text-cooling-800 text-xl">{COMPANY_INFO.name}</h1>
          <p className="text-sm text-cooling-600">Soluções em Refrigeração</p>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Orçamento</h1>
        <p className="text-gray-600 mt-1">
          Crie um novo orçamento para a Refrigeração Miranda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Informações do Aparelho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Aparelho</FormLabel>
                      <FormControl>
                        <Input placeholder="Ar Condicionado, Geladeira, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deviceBrand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Samsung, LG, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deviceModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <FormControl>
                        <Input placeholder="Número do modelo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deviceSerialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Série</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de série do aparelho" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Compra</FormLabel>
                      <FormControl>
                        <Input placeholder="DD/MM/AAAA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="voltage"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Voltagem</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="110v" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">110V</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="220v" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">220V</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informações adicionais sobre o orçamento..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Itens do Orçamento</CardTitle>
                  <Button
                    type="button"
                    onClick={addItem}
                    variant="outline"
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {items.map((item, index) => (
                    <div key={item.id} className="mb-4 border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Item {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-3 space-y-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Input placeholder="Descrição do serviço ou produto" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantidade</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preço Unitário (R$)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-2">
                          <div className="flex justify-between text-sm font-medium mt-1">
                            <span className="text-gray-800">Total do item:</span>
                            <span className="text-gray-800">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(calculateItemTotal(index))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          items.reduce((acc, item, index) => {
                            return acc + calculateItemTotal(index);
                          }, 0)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-bold border-t">
                      <span>Total:</span>
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          items.reduce((acc, item, index) => {
                            return acc + calculateItemTotal(index);
                          }, 0)
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-cooling-600 hover:bg-cooling-700 mt-4">
                    <Printer className="mr-2 h-4 w-4" />
                    Criar e Imprimir Orçamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { quotes };
export default CreateQuote;
