
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/data/mockData";
import { ListChecks, Pencil } from "lucide-react";
import { toast } from "sonner";

const Services = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
          <p className="text-gray-600 mt-1">
            Serviços oferecidos pela Refrigeração Miranda
          </p>
        </div>
        <Button 
          className="bg-cooling-600 hover:bg-cooling-700"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          Novo Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{service.description}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-cooling-700">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(service.price)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={() => toast.info("Funcionalidade em desenvolvimento")}
              >
                <Pencil className="mr-2 h-3 w-3" />
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
