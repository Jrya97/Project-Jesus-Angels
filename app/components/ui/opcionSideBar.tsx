"use client";

import Link from "next/link";

import { links } from "../../../data/linksSideBar";
import { usePathname } from "next/navigation";

export function OpcionSideBar() {
  const pathname = usePathname();
  return (
 <nav
      className={`
        flex flex-col mt-4
        transition-all duration-300
        w-full
      `}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              flex items-center gap-3 px-3 py-3 text-sm font-medium
              transition-all duration-200 text-white
              ${isActive ? "bg-white/25 " : "hover:bg-white/30"}
              justify-center md:justify-start active:scale-90 transform
            `}
          >
            {link.icon}
            <span
              className={`
                hidden md:inline
                transition-opacity duration-200
              `}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
