import type { ReactNode } from "react"

type ButtonType = "primary" | "secondary" 

const Button = ({ children }: { children: ReactNode }) => {

   
 



    return (
        <div>
           {children}
        </div>
    )
}

export default Button
