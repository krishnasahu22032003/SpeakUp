import API from "../../api/UserAPI";

interface AdminDetails {

    email: string,
    username?: string,
    password: string
}

export function AdminSignUp(Admin: AdminDetails) {

    return API<AdminDetails>("/admin/signup", {
        method: "POST",
        body: JSON.stringify(Admin)
    })
};

export function AdminSignIn(Admin: AdminDetails) {

    return API<AdminDetails>("/admin/signin", {
        method: "POST",
        body: JSON.stringify(Admin)
    })
};