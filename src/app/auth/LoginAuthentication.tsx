import {useState} from 'react';
import { supabase } from '../lib/supabase';
import { LoginProps } from '../util/types';

export const useLoginAuthentication = () => {
    const [data, setData] = useState<LoginProps>({ email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    
    const signInWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) {
            alert(error.message);
        } else {
            alert('Logged in successfully');
        }
        setLoading(false);
    };

    const signUpWithEmail = async () => {
        setLoading(true);
        const { data : {session}, error } = await supabase.auth.signUp({ 
          email: data.email,
          password: data.password,
        });
        if (error) {
          alert(error.message);
        } else{
            if(!session){
                alert('Revisa tu correo para confirmar tu cuenta');
            }
        }
        setLoading(false);
    }

    const signOut = async ()=>{
      const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      alert('Logged out successfully');
  }
    }

    const handleInput = (name: string, value: string) => {
        setData({ ...data, [name]: value });
      };
    
    return {
        data,
        handleInput,
        signInWithEmail,
        signUpWithEmail,
        loading,
        signOut
    };
};