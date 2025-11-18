import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Mock authentication - accept any email with password length >= 6
    // In production, this would check against a database
    if (password.length >= 6) {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return NextResponse.json({
        success: true,
        user: {
          email,
          name: email.split("@")[0],
          id: Math.random().toString(36).substring(7),
        },
        message: "Login successful",
      });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Mock logout
  return NextResponse.json({ success: true, message: "Logged out" });
}

