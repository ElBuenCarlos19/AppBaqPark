import { Session } from "@supabase/supabase-js";
type LoginProps = {
    email: string;
    password: string;
    confirmPassword?: string;
    };

interface LoginAuthentication {
        session?: Session | null; // Estado de sesión
        data: LoginProps; // Este es el estado que contiene email, password y confirmPassword
        handleInput: (name: string, value: string) => void; // Método para manejar el input
        signInWithEmail: () => Promise<void>; // Método para iniciar sesión
        signUpWithEmail: () => Promise<void>; // Método para registrarse
        loading: boolean; // Estado de carga
        signOut: () => Promise<void>; // Método para cerrar sesión
    };
    interface RoutineItemProps {
        routine: { title: string; image: any };
    };
export type { LoginProps, LoginAuthentication, RoutineItemProps };

