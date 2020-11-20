import React,{useState,useEffect} from 'react';
import ProfileApi from '../Api/User/ProfileApi';
import defaultImg from './default.png';
import Liked from '../User/Liked';
function Profile(){
    const [user,setUser] = useState({});
    const [islogedIn, setislogedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
      async function loginCheck(){
        try{
            var localdata = localStorage.getItem('ImgSurfUserId');
        }
        catch(err){
            console.log(err);
        }
        
        if(localdata!==undefined &&localdata!==null ){
            var user = JSON.parse(localdata);
            //console.log(user);
            setislogedIn(true);
        }
        var data={}
        console.log(user);
        data = await ProfileApi({UserId:user.data.UserId});
        console.log(data);
        setUser(data);
        setLoading(false);
        if(data.value===undefined){
            console.log("Profile Recieved")
        }
      }
      if(!islogedIn){
        loginCheck();
      }
    },[islogedIn])
   return(
        <div>
            {isLoading && 
                <h6> Loading...</h6>
            }
            {!isLoading && 
                <div>
                    <div className={"profile-container"}>
                        <div className={"profile-image"}>
                            <img src={defaultImg} alt={"Default image"}/>
                        </div>
                        <h5>{user.UserName}</h5>
                        <h6>{user.Email}</h6>
                    </div>
                    <Liked />
                </div>
            }
        </div>
   ); 
}

export default Profile;