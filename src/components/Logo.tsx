import Image from "next/image";

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      <Image src="/logo.png" alt="Логотип" fill className="object-contain" />
    </div>
  );
}