import { create } from "zustand";
import { GetAdminDetails } from "../lib/services/AdminAuthService";

type AdminAuth = {
  admin: any;
  isAuth: boolean;
  loading: boolean;
  checkAdminAuth: () => Promise<void>;
  logout: () => void;
};

const AdminAuthStore = create<AdminAuth>((set) => ({

  admin: null,
  isAuth: false,
  loading: false,

  async checkAdminAuth() {
    set({ loading: true });
    try {
      const res = await GetAdminDetails();
      set({ admin: res, isAuth: true, loading: false });
    } catch {
      set({ admin: null, isAuth: false, loading: false });
    }
  },

  logout: () => set({
    admin: null,
    isAuth: false
  })

}));

export default AdminAuthStore;