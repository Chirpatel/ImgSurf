import React, {useState,useEffect}from 'react';
import {Button} from '../Navbar/Button';
import LoginApi from '../Api/User/LoginApi';

import './User.css';
function Login(){
    const [user,setUser] = useState({email:"",password:""});
    const [login, setLogin] = useState(false);
    const [islogedIn, setislogedIn] = useState(false);
    const [isErrorEmail1, setisErrorEmail1] = useState(false);
    const [isErrorEmail2, setisErrorEmail2] = useState(false);
    const [isErrorPassword, setisErrorPassword] = useState(false);
    useEffect(()=>{
        function loginCheck(){
            try{
                var localdata = localStorage.getItem('ImgSurfUserId');
            }
            catch(err){
                console.log(err);
            }
            
            if(localdata!==undefined &&localdata!==null ){
                var user = JSON.parse(localdata);
                console.log(user);
                setislogedIn(true);
                window.location.href = '/';
            }
        }
        loginCheck();
    })

     function check(){
        if(user.password.length<9){
             setisErrorPassword(true);
        }else{
             setisErrorPassword(false);
        }
        if(user.email.length>5 && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email))){
            
             setisErrorEmail2(false);
        }else{
             setisErrorEmail2(true);
            
        }
    }
    function dataEmail(e){
        setUser({...user,email:e.target.value});
        if(e.target.value.length>5 && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value))){
            
            setisErrorEmail2(false);
       }else{
            setisErrorEmail2(true);
           
       }
    }
    function dataPassword(e){
        setUser({...user,password:e.target.value});
        if(e.target.value.length<9){
            setisErrorPassword(true);
        }else{
            setisErrorPassword(false);
        }
    }
    
     function clickLogin(){
         check();
        if(user.email!=="" && !isErrorEmail2 && !isErrorPassword){
            console.log(user);
            setLogin(true);
        }else{
            setLogin(false);
        }
    }
    useEffect(()=>{
        async function logincall(){
            console.log("Called");
            let userdetails = await LoginApi({user:user});
            console.log(userdetails)
            if(userdetails!==undefined){
                setLogin(false);
                if(userdetails.value === undefined){
                    console.log(userdetails);
                    localStorage.setItem('ImgSurfUserId',JSON.stringify({data:userdetails}));
                    setisErrorEmail1(false);
                    setislogedIn(true);
                    window.location.href = '/';
                }
                else{
                    setisErrorEmail1(true);
                }
            }
        }

        if(login){
            logincall();
        }
    },[login,user,setLogin,setisErrorEmail1,setislogedIn])
    

    return(
        <div className={"login-container"}>
            <h1>Login</h1>
            <div className={`login-details ${islogedIn ? "display-off" : ""}`}>
                <p className={`${isErrorEmail1 ? "alert-on" : "alert-off"}`}>Email Id or Password Invalid.</p>
                
                <p>Email</p>
                <p className={`${isErrorEmail2 ? "alert-on" : "alert-off"}`}>Enter Valid Email Id.</p>
                <input type="text" value={user.email}  onChange={dataEmail} placeholder={"email@example.com"}/>
                <p>Password</p>
                <p className={`${isErrorPassword ? "alert-on" : "alert-off"}`}>Password should have min 9 characters.</p>
                <input type="password" value={user.password} onChange={dataPassword}/>
                <Button onClick={clickLogin}>Login <i className="fas fa-sign-in-alt"></i></Button>
                <h6> Not a User <a href="/signup">Sign up</a></h6>
            </div>
            <p className={`signedup ${islogedIn ? "display-on" : "display-off" }` }>Successfully Logged In. </p>
        </div>
    )
}
export default Login;