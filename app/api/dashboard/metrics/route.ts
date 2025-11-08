import { NextResponse } from "next/server";

export async function GET() {
  const metrics = {
    totalRevenue: 45231.89,
    activeUsers: 2350,
    totalInvoices: 1284,
    growthRate: 12.5,
  };

  return NextResponse.json(metrics);
}
