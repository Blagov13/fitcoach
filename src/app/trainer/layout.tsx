import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function TrainerLayout({ children }: { children: React.ReactNode }) {
const session = await getServerSession(authOptions);
if (!session) redirect("/");
const role = (session.user as any)?.role;
if (role !== "trainer") redirect("/client");


return <>{children}</>;
}