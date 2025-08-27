import NewClientForm from "@/components/trainer/clients/NewClientForm";

export default function NewClientPage() {
  return (
    <main className="p-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h1 className="mb-3 text-xl font-semibold">Новый клиент</h1>
        <NewClientForm />
      </section>
    </main>
  );
}