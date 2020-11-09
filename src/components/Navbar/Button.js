import React from 'react';
import './Button.css';

export const Button =({
    children,
    type,
    onClick,
    cName
}) =>{
    return (
        <button className={`navbtn navbtn-signup navbtn--primary navbtn--medium ${cName}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}