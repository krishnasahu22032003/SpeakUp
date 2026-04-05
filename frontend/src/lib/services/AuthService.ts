import API from "../../api/UserAPI";

interface UserDetails {

    username: string,
    email: string,
    password: string,

}


export function UserSignUp(User: UserDetails) {

    return API<UserDetails>("user/signup", {
        method: "POST",
        body: JSON.stringify(User)
    })
}