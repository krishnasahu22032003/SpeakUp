import ENV from "../utils/ENV";

export default async function ComplaintAPI<T>(endString: string, options: RequestInit = {}): Promise<T> {


    const res = await fetch(`${ENV.BACKEND_BASE_API_COMPLAINT}/${endString}`, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...options
    })
    const data = await res.json();

    if (!res.ok) {
        const error = await data;
        throw new Error(error.message || "Error while fetching");
    }



    return data as T
}