import React, {useState,useEffect } from 'react'
import {MenuItems} from "./MenuItems";
import './Navbar.css';
import {Button} from "./Button";
import {Link} from "react-router-dom";
import ActivateApi from  '../Api/User/ActivateApi.js';
function Navbar(){
    const [clicked,setClick] = useState(false);
    const [loginActive, setActive] = useState(false);
    const [islogedIn, setislogedIn] = useState(false);
    const [user,setUser] =useState({});
    const handleClick= ()=>{
      setClick(!clicked )
    }
    useEffect(()=>{
        async function check(){
            if(await ActivateApi()){
                setActive(true);
            }
        }
        check();

    },[loginActive,setActive])

    useEffect(()=>{
        async function loginCheck(){
            try{
                var localdata = localStorage.getItem('ImgSurfUserId');
            }
            catch(err){
                console.log(err);
            }
            
            if(localdata!==undefined &&localdata!==null ){
                setUser(JSON.parse(localStorage.getItem('ImgSurfUserId')).data);
                //console.log(user);
                await setislogedIn(true);
            }
        }
        if(!islogedIn){
            loginCheck();
        }
    })
    
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
                                <Link className={`${item.cName} ${item.title==="Liked" ? (loginActive ? (islogedIn ? "":"display-off not-active") : "not-active"): item.url}`} to={`${item.title==="Sign up" ? (!islogedIn ? item.url:"/logout"): item.url} `}>{`${item.title==="Sign up" ?  (!islogedIn ? item.title:`${user.UserName} `) : item.title}`}{item.title==="Sign up" && islogedIn &&
                                <i className="fas fa-sign-out-alt"></i>}</Link>
                            </li>
                        )
                    })}
                    
                </ul>

                <Link className={`signupLink ${loginActive ? "":"not-active"}`} to={`${islogedIn ? "/logout" :"/signup"}`}><Button className={"btn-signup"}>
                {!loginActive &&
                    <i className="fa fa-spinner fa-spin"></i>
                }
                {loginActive &&
                    islogedIn &&
                        <span>{user.UserName} <i className="fas fa-sign-out-alt"></i></span>
                }
                {loginActive &&
                    !islogedIn &&
                        <span>Sign Up</span>
                }        
                </Button></Link>
            </nav>
        );
}

export default Navbar;