import Image from "next/image";
import Link from "next/link";

export function Logo(){
  return (
    <div className="flex items-center gap-4">
      <Link href="/">
      <Image
        src="/Logo-Jesus-Angels.png"
        alt="Logo Jesus Angels"
        width={200}
        height={100}
        className="object-scale-down w-auto h-auto"
      />
      </Link>
    </div>
  );
}
