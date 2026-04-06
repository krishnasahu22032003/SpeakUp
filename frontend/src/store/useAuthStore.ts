import { create } from "zustand";
import { CheckUser } from "../lib/services/AuthService";

type AuthService = {

    user: any,
    isAuth: boolean,
    loading: boolean,
    checkAuth: () => Promise<void>

}

export const CheckUserStore = create<AuthService>((set) => ({

    user: null,
    isAuth: false,
    loading: true,
   
    async checkAuth() {
         set({loading:true})
        try {
            const user = await CheckUser();
            set({ user, isAuth: true, loading: false });
        } catch (error) {
            set({ user: null, isAuth: false, loading: false });
        }
    },
}));