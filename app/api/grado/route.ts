import { NextResponse } from "next/server";
import {GradoFake} from "@/data/fakeData"


export async function GET() {
  return NextResponse.json(GradoFake);
}

export async function POST(request: Request) {
  const body = await request.json();
  const nuevo = { id_apoderado: String(Date.now()), ...body };
  GradoFake.push(nuevo);
  return NextResponse.json(nuevo, { status: 201 });
}