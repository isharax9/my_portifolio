import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { skillSchema } from "@/lib/validations/skill";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const skill = await prisma.skill.update({ where: { id }, data: parsed.data });
  return NextResponse.json(skill);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.skill.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
