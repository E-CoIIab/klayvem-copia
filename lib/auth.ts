// Sistema de autenticação simplificado
// Em produção, usar NextAuth.js ou similar

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

// Simular banco de dados com localStorage no cliente
// Em produção: usar banco de dados real
function getUsers(): Map<string, UserWithPassword> {
  if (typeof window === 'undefined') return new Map();
  
  const usersJson = localStorage.getItem('ecollab_users');
  if (!usersJson) return new Map();
  
  try {
    const usersArray = JSON.parse(usersJson);
    return new Map(usersArray);
  } catch {
    return new Map();
  }
}

function saveUsers(users: Map<string, UserWithPassword>): void {
  if (typeof window === 'undefined') return;
  
  const usersArray = Array.from(users.entries());
  localStorage.setItem('ecollab_users', JSON.stringify(usersArray));
}

export async function register(email: string, password: string, name: string): Promise<User> {
  const users = getUsers();
  
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
  saveUsers(users);
  
  // Retornar usuário sem senha
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function login(email: string, password: string): Promise<User> {
  const users = getUsers();
  const userWithPassword = users.get(email);
  
  if (!userWithPassword || userWithPassword.password !== password) {
    throw new Error("Credenciais inválidas");
  }

  // Retornar usuário sem senha
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = getUsers();
  const userWithPassword = users.get(email);
  
  if (!userWithPassword) return null;
  
  const { password: _, ...user } = userWithPassword;
  return user;
}

export async function updateUserPoints(userId: string, points: number): Promise<void> {
  const users = getUsers();
  
  for (const [email, user] of users.entries()) {
    if (user.id === userId) {
      user.points = points;
      users.set(email, user);
      saveUsers(users);
      return;
    }
  }
}

