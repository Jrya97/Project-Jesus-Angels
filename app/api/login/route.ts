import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await backendResponse.json();

    if (backendResponse.ok) {
      const token = data.access_token || data.token || data.session?.access_token;

      if (token) {
        const response = NextResponse.json({
          success: true,
          user: data.user,
          userId: data.user?.id
        });

        response.cookies.set("session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24,
        });

        return response;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: data.error_description || data.message || data.msg || "Credenciales inválidas"
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error en /api/login:", error);
    return NextResponse.json(
      { success: false, message: "Error de conexión con el servidor" },
      { status: 500 }
    );
  }
}