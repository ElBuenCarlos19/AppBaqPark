import { Session } from "@supabase/supabase-js";
import { PropsWithChildren } from "react";
import { ImageSourcePropType } from "react-native";
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
    
    interface Props {
        src: ImageSourcePropType;
        repeticiones: string;
      }

      interface Ejercicio {
        src: any;
        repeticiones: string;
      }
      
      interface ExcerciseProps {
        nombre: string;
        ejercicios: Ejercicio[];
      }

    interface RutinePropsWithChildren extends PropsWithChildren {
        style?: object; // Propiedad opcional para estilos adicionales
        type?: string; // Propiedad opcional para el tipo de componente
        SessionRequired?: boolean; // Propiedad opcional para requerir sesión
        rutine?: { title: string; image: any, value: string }[]; // Propiedad opcional para rutina
        excercises? : Props; // Propiedad opcional para ejercicios
        excerciseItems? : ExcerciseProps
    } 

export type { LoginProps, LoginAuthentication, RoutineItemProps, RutinePropsWithChildren };

