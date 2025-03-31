import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { quotes } from "@/data/mockData";

const formSchema = z.object({
  customerName: z.string().min(1, { message: "Nome do cliente é obrigatório" }),
  customerAddress: z.string().optional(),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email({ message: "E-mail inválido" }).optional().or(z.literal('')),
  date: z.date({ required_error: "Data é obrigatória" }),
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
      date: new Date(),
      notes: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const onSubmit = (data: FormValues) => {
    // Calculate totals
    const itemsWithTotals = data.items.map(item => ({
      ...item,
      total: item.quantity * item.unitPrice
    }));
    
    const subtotal = itemsWithTotals.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    // Create quote object with a new ID
    const newQuoteId = `quote-${Date.now()}`;
    
    // Create quote object
    const quote = {
      id: newQuoteId,
      number: `ORC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: format(data.date, "yyyy-MM-dd"),
      customerName: data.customerName,
      customerAddress: data.customerAddress || "",
      customerPhone: data.customerPhone || "",
      customerEmail: data.customerEmail || "",
      items: itemsWithTotals.map((item, index) => ({
        id: `item-${index}`,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total
      })),
      subtotal,
      tax,
      total,
      notes: data.notes || "",
      status: "draft" as const
    };
    
    console.log("Orçamento criado:", quote);
    
    // Add the new quote to the mock data
    // @ts-ignore - We'll ignore the type mismatch temporarily
    quotes.unshift(quote);
    
    toast.success("Orçamento criado com sucesso!");
    
    // Navigate to the detail view to allow printing
    navigate(`/quotes/${newQuoteId}`);
  };

  const addItem = () => {
    const newItem = {
      id: `item-${items.length + 1}`,
      description: "",
      quantity: 1,
      unitPrice: 0
    };
    setItems([...items, newItem]);
    form.setValue('items', [...form.getValues('items'), { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) {
      return; // Don't remove if it's the last item
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Orçamento</h1>
        <p className="text-gray-600 mt-1">
          Crie um novo orçamento para a Refrigeração Miranda
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
                <CardDescription>
                  Preencha os dados do cliente
                </CardDescription>
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

            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Itens do Orçamento</CardTitle>
                    <CardDescription>
                      Adicione os produtos/serviços ao orçamento
                    </CardDescription>
                  </div>
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

              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent>
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
                    <div className="flex justify-between">
                      <span>Impostos (10%):</span>
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          items.reduce((acc, item, index) => {
                            return acc + (calculateItemTotal(index) * 0.1);
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
                            return acc + (calculateItemTotal(index) * 1.1);
                          }, 0)
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to="/quotes">
                    <Button variant="outline">Cancelar</Button>
                  </Link>
                  <Button type="submit" className="bg-cooling-600 hover:bg-cooling-700">
                    Criar Orçamento
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateQuote;
