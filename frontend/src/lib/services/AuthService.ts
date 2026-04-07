import API from "../../api/UserAPI";

interface UserDetails {

    username?: string,
    email: string,
    password: string,

}


export function UserSignUp(User: UserDetails) {

    return API<UserDetails>("signup", {
        method: "POST",
        body: JSON.stringify(User)
    })
} 

export function UserSignIn(User:UserDetails){

    return API<UserDetails>("signin",{
        method:"POST",
        body:JSON.stringify(User)
    })
} 

export async function CheckUser() {
    const res = await API<{ success: boolean; data: any }>("me", {
        method: "GET"
    });

    return res.data;
}