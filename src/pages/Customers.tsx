
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customers } from "@/data/mockData";
import { Users } from "lucide-react";
import { toast } from "sonner";

const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">
            Gerencie os clientes da Refrigeração Miranda
          </p>
        </div>
        <Button 
          className="bg-cooling-600 hover:bg-cooling-700"
          onClick={() => toast.info("Funcionalidade em desenvolvimento")}
        >
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{customer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-500">{customer.address}</p>
                <p className="text-gray-500">{customer.phone}</p>
                <p className="text-gray-500">{customer.email}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info("Funcionalidade em desenvolvimento")}
                >
                  Ver detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
