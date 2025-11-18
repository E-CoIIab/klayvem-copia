import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Retornar sucesso - validação será feita no client-side com localStorage
    return NextResponse.json({
      success: true,
      credentials: { email, password },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao processar login" },
      { status: 400 }
    );
  }
}

