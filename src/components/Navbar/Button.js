import React from 'react';
import './Button.css';

export const Button =({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) =>{
    return (
        <button className={`btn btn-signup btn--primary btn--medium`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}