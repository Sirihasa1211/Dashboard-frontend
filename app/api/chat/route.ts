import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  const response = {
    message: `AI Response to: "${message}". This is a placeholder. Connect to your AI backend here.`,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}
