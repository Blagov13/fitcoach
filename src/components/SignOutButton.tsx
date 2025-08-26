"use client";
import { signOut } from "next-auth/react";


export default function SignOutButton() {
return (
<button
onClick={() => signOut({ callbackUrl: "/" })}
className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
>
Выйти
</button>
);
}