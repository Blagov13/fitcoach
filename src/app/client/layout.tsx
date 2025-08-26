import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function ClientLayout({ children }: { children: React.ReactNode }) {
const session = await getServerSession(authOptions);
if (!session) redirect("/");
const role = (session.user as any)?.role;
if (role !== "client") redirect("/trainer");


return <>{children}</>;
}