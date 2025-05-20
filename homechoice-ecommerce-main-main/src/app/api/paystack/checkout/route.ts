import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY as string;

  if (!paystackSecret) {
    return NextResponse.json({ error: "Missing PAYSTACK_SECRET_KEY" }, { status: 500 });
  }

  try {
    const { email, amount, reference } = await req.json();
    
    // Convert amount to kobo (Paystack expects amount in kobo)
    const amountInKobo = amount * 100;

    const paystackUrl = "https://api.paystack.co/transaction/initialize";

    const response = await fetch(paystackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${paystackSecret}`,
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        currency: "KES", // Change if needed (e.g., KES for Kenya)
        reference, // Unique order reference
        callback_url: process.env.PAYSTACK_CALLBACK_URL, // Redirect after payment
      }),
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.message || "Failed to initialize payment");
    }

    return NextResponse.json({ checkoutUrl: data.data.authorization_url });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
