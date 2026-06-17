import type { LoginType, RegisterType } from "../types/user/user-types";

export type UpdateType = {
username?: string;
email?: string;
password?: string;
role?: User["role"];
}

interface User {
  username: string;
  email: string;
  password?: string;
  isLoggingIn: false;
  isRegistering: false;
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null;
  allUsers: User[];
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  isLoggingOut: boolean;
  

  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
  update: (data: UpdateType) => void;
  isAuthStatus: () => void;
}

// isUpdating, isLoggingOut, isSigningUp, isLoggingIn
// isModelPredicting, isRetrieving