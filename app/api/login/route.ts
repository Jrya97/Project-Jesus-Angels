import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const validUser = {
    username: "admin",
    password: "123456",
  };

  if (username === validUser.username && password === validUser.password) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("session", "valid", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Usuario o contraseña incorrectos" },
    { status: 401 }
  );
}