import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { skillSchema } from "@/lib/validations/skill";

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const skill = await prisma.skill.create({ data: parsed.data });
  return NextResponse.json(skill, { status: 201 });
}
