import React, { FunctionComponent, InputHTMLAttributes, ForwardedRef } from "react";

import './index.scss';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    onEnterPress?: () => void;
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
    (props: CustomInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const { hasError, onEnterPress, ...rest } = props;

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && onEnterPress) {
                event.preventDefault();
                onEnterPress();
            }
        };

        return (
            <input
                {...rest}
                ref={ref}
                className={`custom-input ${hasError ? 'error' : ''}`}
                onKeyDown={handleKeyDown}
            />
        );
    }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
