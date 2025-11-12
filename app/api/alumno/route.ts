import { NextResponse } from "next/server";
import {AlumnosFake} from "@/data/fakeData"


export async function GET() {
  return NextResponse.json(AlumnosFake);
}

export async function POST(request: Request) {
  const body = await request.json();
  const nuevo = { id_apoderado: String(Date.now()), ...body };
  AlumnosFake.push(nuevo);
  return NextResponse.json(nuevo, { status: 201 });
}