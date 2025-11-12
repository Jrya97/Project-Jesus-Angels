import { NextResponse } from "next/server";
import {ApoderadosFake} from "@/data/fakeData"


export async function GET() {
  return NextResponse.json(ApoderadosFake);
}

export async function POST(request: Request) {
  const body = await request.json();
  const nuevo = { id_apoderado: String(Date.now()), ...body };
  ApoderadosFake.push(nuevo);
  return NextResponse.json(nuevo, { status: 201 });
}