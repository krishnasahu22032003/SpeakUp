import React, { forwardRef } from "react"
// We use ref to access or control a DOM element directly But react does not pass ref to custom components by default that's why we need forwardRef
import clsx from "clsx"
// clsx is used to make our css classname code more readable and cleaner. It takes multiple values , ignores false values , and joins valid one into string 

type ButtonVariants = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: ButtonVariants,
    loading?: boolean

}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", loading, children , ...props }, ref) => {

    return (

        <button
            ref={ref}
            disabled={loading || props.disabled}
            className={clsx(
                "btn-root",
                variant === "primary" && "btn-primary",
                variant === "secondary" && "btn-secondary",
                variant === "ghost" && "btn-ghost",
                variant === "danger" && "btn-danger",
                loading && "btn-loading",
                className
            )}
            {...props}
        >
            <span className="btn-content">
                {loading ? "Please wait..." : children}
            </span>
            {variant === "primary" && (
                <>
                    <span className="btn-glow" />
                    <span className="btn-highlight" />
                </>
            )}
        </button>
    )
}
)

Button.displayName = "Button";

export default Button




