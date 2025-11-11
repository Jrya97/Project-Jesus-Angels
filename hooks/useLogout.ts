import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });

    router.push("/login");
  };

  return { handleLogout };
}