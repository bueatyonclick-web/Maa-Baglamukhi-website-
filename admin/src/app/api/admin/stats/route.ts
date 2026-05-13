import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { withCors } from "@/lib/cors";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) {
    return withCors(request, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [totalBookings, totalMessages, totalGallery, totalDonations, recentBookings, recentMessages, bookingsForChart] =
    await Promise.all([
      prisma.booking.count(),
      prisma.contactMessage.count(),
      prisma.gallery.count(),
      prisma.donation.count(),
      prisma.booking.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { package: { select: { title: true } } },
      }),
      prisma.contactMessage.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true },
      }),
    ]);

  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const counts = new Map<string, number>();
  for (const b of bookingsForChart) {
    const k = monthKey(new Date(b.createdAt));
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const months: { key: string; label: string; bookings: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const k = monthKey(d);
    months.push({
      key: k,
      label: d.toLocaleString("en-IN", { month: "short" }),
      bookings: counts.get(k) || 0,
    });
  }

  return withCors(
    request,
    NextResponse.json({
      totals: {
        bookings: totalBookings,
        messages: totalMessages,
        gallery: totalGallery,
        donations: totalDonations,
      },
      recentBookings,
      recentMessages,
      chart: months,
    }),
  );
}
