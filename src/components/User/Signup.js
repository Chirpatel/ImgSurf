import React, {useState,useEffect}from 'react';
import {Button} from '../Navbar/Button';
import SignupApi from '../Api/User/SingupApi';

import './User.css';
function Signup(){
    const [user,setUser] = useState({email:"",username:"",password:""});
    const [singup, setSignup] = useState(false);
    const [issingup, setisSignup] = useState(false);
    const [isErrorUsername, setisErrorUsername] = useState(false);
    const [isErrorEmail1, setisErrorEmail1] = useState(false);
    const [isErrorEmail2, setisErrorEmail2] = useState(false);
    const [isErrorPassword, setisErrorPassword] = useState(false);
    function check(){
        if(user.password.length<9){
            setisErrorPassword(true);
        }else{
            setisErrorPassword(false);
        }
        if(user.username.length <5){
            setisErrorUsername(true);
        }else{
            setisErrorUsername(false);
        }
        if(user.email.length>5 &&(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email))){
            
            setisErrorEmail2(false);
        }else{
            setisErrorEmail2(true);
            
        }
    }
    function dataUsername(e){
        setUser({...user,username:e.target.value});
        if(e.target.value.length <5){
            setisErrorUsername(true);
        }else{
            setisErrorUsername(false);
        }
    }
    function dataEmail(e){
        setUser({...user,email:e.target.value});
    }
    function dataPassword(e){
        setUser({...user,password:e.target.value});
        if(e.target.value.length<9){
            setisErrorPassword(true);
        }else{
            setisErrorPassword(false);
        }
    }
    
    function clickSignup(){
        check();
        if(user.email!=="" && !isErrorUsername && !isErrorEmail2 && !isErrorPassword){
            console.log(user);
            setSignup(true);
            
        }else{
            setSignup(false);
        }
    }

    useEffect(()=>{
        async function singupcall(){
            console.log("Called");
            let userdetails = await SignupApi({user:user});
            if(userdetails!==undefined){
                setSignup(false);
                if(userdetails.value===undefined){
                    //console.log(userdetails);
                    localStorage.setItem('ImgSurfUserId',JSON.stringify({data:userdetails}));
                    setisSignup(true);
                    setisErrorEmail1(false);
                    window.location.href = '/';
                }else{
                    setisErrorEmail1(true);
                }
            }
        }

        if(singup){
            singupcall();
        }
    },[singup,user,setSignup,setisErrorEmail1])

    return(
        <div className={"signup-container"}>
            <h1>Signup</h1>
            <div className={`signup-details ${issingup ? "display-off" : ""}`}>
                <p>Email</p>
                <p className={`${isErrorEmail1 ? "alert-on" : "alert-off"}`}>Email Id Already Exists.</p>
                <p className={`${isErrorEmail2 ? "alert-on" : "alert-off"}`}>Enter Valid Email Id.</p>
                <input type="text" value={user.email}  onChange={dataEmail} placeholder={"email@example.com"}/>
                <p>Username</p>
                <p className={`${isErrorUsername ? "alert-on" : "alert-off"}`}>Username should have min 5 characters.</p>
                <input type="text" value={user.username} onChange={dataUsername} placeholder={"example123"} />
                <p>Password</p>
                <p className={`${isErrorPassword ? "alert-on" : "alert-off"}`}>Password should have min 9 characters.</p>
                <input type="password" value={user.password} onChange={dataPassword}/>
                <Button onClick={clickSignup}>Singup <i className="fas fa-sign-in-alt"></i></Button>
                <h6> Already User <a href="/login">Login</a></h6>
            </div>
            <p className={`signedup ${issingup ? "display-on" : "display-off" }` }>Successfully Signed Up. </p>
        </div>
    )
}
export default Signup;