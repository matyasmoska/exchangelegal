import { FC } from "react";
import { c } from "../../services/misc";

const ErrorMessage: FC<{ id: string }> = ({ children, id }) => {
    return (
        <span data-test={`${id}-error`} className={c("block text-left text-red-500 font-text", 'md:text-sm')}>
            {children}
        </span>
    );
}

export default ErrorMessage;