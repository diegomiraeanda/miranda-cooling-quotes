
import EmptyState from "@/components/EmptyState";
import { CalendarClock } from "lucide-react";

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
        <p className="text-gray-600 mt-1">
          Gerencie os agendamentos da Refrigeração Miranda
        </p>
      </div>

      <EmptyState
        title="Agenda não disponível"
        description="A funcionalidade de agenda está em desenvolvimento."
        icon={CalendarClock}
      />
    </div>
  );
};

export default Schedule;
