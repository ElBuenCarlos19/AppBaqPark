import { createContext, useContext, useState, useEffect } from "react";
import { useLoginAuthentication } from "./LoginAuthentication";
import { LoginAuthentication } from "../util/types";
import { supabase } from "../util/supabase";
import { Session } from "@supabase/supabase-js";

export const AuthenticationContext = createContext<LoginAuthentication | undefined>(undefined);
export const AuthenticationProvider = ({ children }) => {
    const login:LoginAuthentication = useLoginAuthentication();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);
    return (
        <AuthenticationContext.Provider value={{...login,session}}>
            {children}
        </AuthenticationContext.Provider>
    );
};
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};