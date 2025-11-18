import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validação básica
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 6 caracteres" },
        { status: 400 }
      );
    }

    // Criar usuário
    const user = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      points: 2000,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
      credentials: { email, password }, // Retornar para salvar no localStorage
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao registrar usuário" },
      { status: 400 }
    );
  }
}

