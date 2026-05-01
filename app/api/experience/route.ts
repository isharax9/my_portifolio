import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations/experience";

export async function GET() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(experience);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { startDate, endDate, ...rest } = parsed.data;
  const exp = await prisma.experience.create({
    data: {
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  });
  return NextResponse.json(exp, { status: 201 });
}
