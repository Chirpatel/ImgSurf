import React,{useState,useEffect} from 'react';
import Gallery  from '../Image/Gallery';
import LikedImagesApi from '../Api/User/LikedImagesApi';
function Liked(){
    const [images,setImages] = useState({images:[],liked:[]});
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
        data = await LikedImagesApi({user:user});
        //console.log(data);
        setLoading(false);
        if(data.value===undefined){
            var tempdata =[];
            var tempid=[];
            data.data.map((img)=>{
                tempdata.push(img.data);
                tempid.push(img.imgId);
                return 0;
            })
            //console.log(images);
            setImages({images:tempdata,liked:tempid});
        }
      }
      if(!islogedIn){
        loginCheck();
      }
    },[islogedIn,images])
    
    
    return(
        <div className="liked-image-container">
            <h1>Liked</h1>
            {isLoading &&
                <h6>Loading</h6>
            }
            {!isLoading && images.images.length===0 &&
                <h6>No Liked Images</h6>
            }
            {!isLoading && images.images.length!==0 &&
                <Gallery imgarr={images.images} liked={images.liked}/>
            }
        </div>
    );
}

export default Liked;