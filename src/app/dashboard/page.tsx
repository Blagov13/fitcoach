import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function DashboardRedirect() {
const session = await getServerSession(authOptions);
if (!session) redirect("/");


const role = (session.user as any)?.role as "trainer" | "client" | undefined;
if (role === "trainer") redirect("/trainer");
if (role === "client") redirect("/client");


// На всякий случай — если роль пустая
redirect("/");
}