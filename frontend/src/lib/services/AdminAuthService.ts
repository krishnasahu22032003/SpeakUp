import API from "../../api/UserAPI";
import AdminAPI from "../../api/AdminApi";

interface AdminDetails {

    email: string,
    username?: string,
    password: string
}

export function AdminSignUp(Admin: AdminDetails) {

    return AdminAPI<AdminDetails>("/signup", {
        method: "POST",
        body: JSON.stringify(Admin)
    })
};

export function AdminSignIn(Admin: AdminDetails) {

    return API<AdminDetails>("user/signin", {
        method: "POST",
        body: JSON.stringify(Admin)
    })
};