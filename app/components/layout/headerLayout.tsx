import { Logo } from "../ui/logo";
import { HeaderClient } from "./headerCliente";

export function HeaderLayout() {
  return (
    <header className="
      sticky top-0 z-50 bg-white flex items-center justify-between 
      border-b-2 border-gray-300 px-5 md:px-8 py-3 font-sans shadow-sm
    ">
      <Logo />
      <HeaderClient />
    </header>
  );
}
