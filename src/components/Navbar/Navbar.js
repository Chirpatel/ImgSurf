import React, {useState } from 'react'
import {MenuItems} from "./MenuItems";
import './Navbar.css';
import {Button} from "./Button";
import {Link} from "react-router-dom";
function Navbar(){
    const [clicked,setClick] = useState(false);
    const handleClick= ()=>{
      setClick(!clicked )
    }
        return(
            <nav className="NavbarItems" >
                <h1 className="navbar-logo" onClick={()=>{window.location='/'}}>imgSurf <i className="fas fa-camera"></i></h1>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times':'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active':'nav-menu'}>
                    {MenuItems.map((item, index)=>{
                        return(
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>{item.title}</Link>
                            </li>
                        )
                    })}
                    
                </ul>
                <Link className={"signupLink"} to="/signup"><Button>Sign Up</Button></Link>

            </nav>
        );
}

export default Navbar;