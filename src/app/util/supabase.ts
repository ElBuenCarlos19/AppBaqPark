import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import { AppState } from 'react-native';
import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    });

    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    });
