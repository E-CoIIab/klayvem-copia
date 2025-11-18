import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Log the contact form submission (in production, save to database or send email)
    console.log("📧 Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In production, you would:
    // 1. Save to database
    // 2. Send notification email to admin
    // 3. Send confirmation email to user
    // 4. Integrate with CRM, etc.

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      data: {
        name,
        email,
        subject,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

