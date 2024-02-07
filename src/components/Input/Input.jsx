import styles from './Input.module.css';
import React, {forwardRef} from "react";

const Input = forwardRef(function Input({ className, isValid, appearance, ...props }, ref) {

    return (
        <input
            {...props}
            ref={ref}
            className={`${className} ${styles['input']} ${appearance === 'title' ? 'input-title' : ''} ${isValid ? '' : styles['invalid']}`}
        />
    );
});

export default Input;