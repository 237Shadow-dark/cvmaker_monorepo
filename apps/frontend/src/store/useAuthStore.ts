import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand'

interface User {
  id: number;
  name: string;
  email: string;
  // ajoute d’autres champs selon ton backend
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  authUser: User[] | null; // ou ton type d'utilisateur
  checkAuth: () => void;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;
    googleUrl: string;
    signup: (data: SignupData) => Promise<void>  ;
    login: (data: LoginData) => Promise<void> ;
    // googleAuth: () => Promise<void> ;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingAuth: true,
    googleUrl: `http://localhost:3000/api/auth/google`,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/auth/check', {withCredentials: true});
            if(res.data.success){
                set({authUser: res.data});
            } else {
                set({authUser: null});
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            set({authUser: null});
        }
        finally {
            set({isCheckingAuth: false});
        }
    },
    signup: async(data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post('/auth/signup', data, {withCredentials: true});
            if(res.data.success){
                set({authUser: res.data.user});
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
        finally {
            set({isSigningUp: false});
        }
    },
    login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post('/auth/login', data, {withCredentials: true});
            if(res.data.success){
                set({authUser: res.data.user});
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
        finally {
            set({isLoggingIn: false});
        }
    },
    // googleAuth: async() => {
    //     set({isCheckingAuth: true});
    //     try {
    //         const res = await axiosInstance.get("/auth/google");
    //         if(res.data.success){
    //             set({authUser: res.data.user});
    //         }
    //     } catch (error) {
    //         console.error('Error during Google authentication:', error);
    //     }
    //     finally {
    //         set({isCheckingAuth: false});
    //     }
    // }
}));