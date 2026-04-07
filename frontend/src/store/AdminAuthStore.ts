import { create } from "zustand"
import { GetAdminDetails } from "../lib/services/AdminAuthService"

type AdminAuth = {

    admin: any
    isAuth: boolean,
    loading: boolean,
    checkAdminAuth: () => Promise<void>

}

const AdminAuthStore = create<AdminAuth>((set) => ({

    admin: null,
    isAuth: false,
    loading: false,

    async checkAdminAuth() {
        set({loading : true })
        try {
            const res = await GetAdminDetails();
            set({ admin: res.data, isAuth: true, loading: false });
        } catch (err){
            set({ admin: null, isAuth: false, loading: false });
        }
    }

}));

export default AdminAuthStore ;