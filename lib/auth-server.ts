// Sistema de autenticação server-side
// Usa variável global para simular banco de dados em memória

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  createdAt: string;
}

interface UserWithPassword extends User {
  password: string;
}

// Simular banco de dados em memória no servidor
// Em produção: usar banco de dados real (PostgreSQL, MongoDB, etc)
const users = new Map<string, UserWithPassword>();

export async function register(email: string, password: string, name: string): Promise<User> {
  // Verificar se email já existe
  if (users.has(email)) {
    throw new Error("Email já cadastrado");
  }

  const userWithPassword: UserWithPassword = {
    id: Math.random().toString(36).substring(7),
    name,
    email,
    points: 0,
    createdAt: new Date().toISOString(),
    password, // Em produção: hash da senha com bcrypt
  };

  users.set(email, userWithPassword);
  
  // Retornar usuário sem senha
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function login(email: string, password: string): Promise<User> {
  const userWithPassword = users.get(email);
  
  if (!userWithPassword || userWithPassword.password !== password) {
    throw new Error("Credenciais inválidas");
  }

  // Retornar usuário sem senha
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const userWithPassword = users.get(email);
  
  if (!userWithPassword) return null;
  
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function updateUserPoints(userId: string, points: number): Promise<void> {
  for (const [email, user] of users.entries()) {
    if (user.id === userId) {
      user.points = points;
      users.set(email, user);
      return;
    }
  }
}

