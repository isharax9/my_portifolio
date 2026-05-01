import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations/experience";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { startDate, endDate, ...rest } = parsed.data;
  const exp = await prisma.experience.update({
    where: { id },
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  });
  return NextResponse.json(exp);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
