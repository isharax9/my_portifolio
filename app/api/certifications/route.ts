import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { certificationSchema } from "@/lib/validations/certification";

export async function GET() {
  const certs = await prisma.certification.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = certificationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { issuedDate, ...rest } = parsed.data;
  const cert = await prisma.certification.create({
    data: { ...rest, issuedDate: new Date(issuedDate) },
  });
  return NextResponse.json(cert, { status: 201 });
}
