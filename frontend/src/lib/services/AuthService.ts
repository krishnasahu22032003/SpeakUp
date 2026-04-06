import API from "../../api/UserAPI";

interface UserDetails {

    username?: string,
    email: string,
    password: string,

}


export function UserSignUp(User: UserDetails) {

    return API<UserDetails>("user/signup", {
        method: "POST",
        body: JSON.stringify(User)
    })
} 

export function UserSignIn(User:UserDetails){

    return API<UserDetails>("user/signin",{
        method:"POST",
        body:JSON.stringify(User)
    })
} 

export async function CheckUser() {
    const res = await API<{ success: boolean; data: any }>("user/me", {
        method: "GET"
    });

    return res.data;
}