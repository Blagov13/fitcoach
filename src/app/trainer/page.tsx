import TrainerShell from "@/components/layout/TrainerShell";
import DayCalendar from "@/components/trainer/DayCalendar";
import StatsPanel from "@/components/trainer/StatsPanel";
import CreateSessionModal from "@/components/trainer/CreateSessionModal";

export default function TrainerDashboardPage() {
  return (
    <TrainerShell>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <DayCalendar />
        </section>
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <StatsPanel />
        </aside>
      </div>
      <CreateSessionModal />
    </TrainerShell>
  );
}