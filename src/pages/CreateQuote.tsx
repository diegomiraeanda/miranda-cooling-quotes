
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { customers, services } from "@/data/mockData";
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

const formSchema = z.object({
  customer: z.string().min(1, { message: "Cliente é obrigatório" }),
  date: z.date({ required_error: "Data é obrigatória" }),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      serviceId: z.string().min(1, { message: "Serviço é obrigatório" }),
      quantity: z.number().min(1, { message: "Quantidade deve ser maior que 0" }),
    })
  ).min(1, { message: "Adicione pelo menos um item" }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateQuote = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<{ id: string; serviceId: string; quantity: number }[]>(
    [{ id: "1", serviceId: "", quantity: 1 }]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      date: new Date(),
      notes: "",
      items: [{ serviceId: "", quantity: 1 }],
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real application, we would send this data to an API
    console.log("Form submitted:", data);
    toast.success("Orçamento criado com sucesso!");
    navigate("/quotes");
  };

  const addItem = () => {
    const newItem = {
      id: `item-${items.length + 1}`,
      serviceId: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
    form.setValue('items', [...form.getValues('items'), { serviceId: "", quantity: 1 }]);
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

  const getServiceNameById = (id: string) => {
    const service = services.find(s => s.id === id);
    return service ? service.description : '';
  };

  const getServicePriceById = (id: string) => {
    const service = services.find(s => s.id === id);
    return service ? service.price : 0;
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
                <CardTitle>Informações do Orçamento</CardTitle>
                <CardDescription>
                  Preencha as informações básicas do orçamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id}>
                              {customer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      Adicione os serviços ao orçamento
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
                          name={`items.${index}.serviceId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Serviço</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um serviço" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                      {service.description} - {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      }).format(service.price)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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

                        {form.watch(`items.${index}.serviceId`) && (
                          <div className="pt-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Serviço:</span>
                              <span className="text-gray-700">{getServiceNameById(form.watch(`items.${index}.serviceId`))}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-500">Valor unitário:</span>
                              <span className="text-gray-700">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(getServicePriceById(form.watch(`items.${index}.serviceId`)))}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm font-medium mt-1">
                              <span className="text-gray-800">Total do item:</span>
                              <span className="text-gray-800">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(
                                  getServicePriceById(form.watch(`items.${index}.serviceId`)) * 
                                  (form.watch(`items.${index}.quantity`) || 0)
                                )}
                              </span>
                            </div>
                          </div>
                        )}
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
                            const serviceId = form.watch(`items.${index}.serviceId`);
                            const quantity = form.watch(`items.${index}.quantity`) || 0;
                            if (!serviceId) return acc;
                            return acc + (getServicePriceById(serviceId) * quantity);
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
                            const serviceId = form.watch(`items.${index}.serviceId`);
                            const quantity = form.watch(`items.${index}.quantity`) || 0;
                            if (!serviceId) return acc;
                            return acc + (getServicePriceById(serviceId) * quantity * 0.1);
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
                            const serviceId = form.watch(`items.${index}.serviceId`);
                            const quantity = form.watch(`items.${index}.quantity`) || 0;
                            if (!serviceId) return acc;
                            return acc + (getServicePriceById(serviceId) * quantity * 1.1);
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
