import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log("Received searchParams:", searchParams.toString()); // Debugging log

  const orderTrackingId = searchParams.get("OrderTrackingId"); // Ensure correct case

  if (!orderTrackingId) {
    return NextResponse.json({ error: "Missing OrderTrackingId" }, { status: 400 });
  }

  console.log("Paystack Callback Received:", orderTrackingId);

  return NextResponse.redirect("/", 302);
}
