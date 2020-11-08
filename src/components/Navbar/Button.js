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
        <button className={`navbtn navbtn-signup navbtn--primary navbtn--medium`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}