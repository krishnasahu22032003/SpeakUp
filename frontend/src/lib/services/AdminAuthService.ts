import AdminAPI from "../../api/AdminApi";

interface AdminDetails {

    email: string,
    username?: string,
    password: string
}

export function AdminSignUp(Admin: AdminDetails) {

    return AdminAPI<AdminDetails>("signup", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(Admin)
    })
};

export function AdminSignIn(Admin: AdminDetails) {

    return AdminAPI<AdminDetails>("signin", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(Admin)
    })
};

export async function GetAdminDetails() {

    const res = await AdminAPI<{ success: boolean, data: any }>("me", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    return res.data;
};

export async function AdminSingOut() {

    const res = await AdminAPI<{ success: boolean, message: string }>("signout",

        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        }
    )
    return res ; 
}