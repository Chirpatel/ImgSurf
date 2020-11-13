import React, {useState, useEffect } from 'react'
import Column from './Column'
import {Button} from "../Navbar/Button";
import LikedApi from '../Api/User/LikedApi';
import UnlikedApi from '../Api/User/UnlikeApi';

const getColumns = (imgarr,col)=>{
  //console.log(imgarr);
  var images=[];
  for(let i=0;i<col;i++){
    images.push([]);
  }

  let l = 0;

  imgarr.forEach(img => {
    //console.log(l)
    if (l !== col - 1) { l += 1 }else{l=0;}
    images[l].push(img)
  })
  return images
}


 function Gallery({ imgarr ,liked}) {
  //console.log(imgarr);
  //console.log("Gallery");
  let [columns, setColumns] = useState([]);
  let [showPopup, setShowPopup] = useState(false);
  let [showImageData, setImageData] = useState({src:"",author:"",name:"",download:""});
  let [currentUser, setCurrentUser] = useState({})
  const [islogedIn, setislogedIn] = useState(false);
  let [Liked,setLiked] = useState([]);
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
            setCurrentUser(user);
            setislogedIn(true);
        }
    }
    if(!islogedIn){
      loginCheck();
    }
  })
  
  function addLikeImages(img){
    if(islogedIn){
      LikedApi({user:currentUser,img:img})
      if(!Liked.includes(img.ImageId)){
        setLiked([...Liked,img.ImageId])
      }
      return true;
    }else{
      alert("You must Login to Like Image ");
      return false;
    }
  }
  function removeLikeImages(img){
    if(islogedIn){
      UnlikedApi({user:currentUser,imgId:img.imgId})
      const index = Liked.indexOf(img.imgId);
      if (index > -1) {
        Liked.splice(index, 1);
      }
      return true;
    }else{
      alert("You must Login to Unlike Image ");
      return false;
    }
  }

  function addRemoveImages(operation,imgId,type){
    if(operation==="Add"){
      //console.log("Adding");
      return addLikeImages(imgId,type);
    }else{
      //console.log("Removing");
      return removeLikeImages(imgId,type);
    }
  }
  useEffect(()=>{
    var imgarray = getColumns(imgarr, 4);
    function Sort(a, b){
      if(a.length >= b.length) {
          return -1;
      } else {
          return 1;
      }
    }
    imgarray.sort(Sort);
    setColumns(imgarray);
  },[imgarr])
  function togglePopup(data) {
    //console.log(data);
    setImageData({imgId:data.ImageId,src:data.View,author:data.Author,h:data.h,w:data.w,name:data.ImageDes,download:data.Download,likes:data.Likes,AuthorURL:data.AuthorURL});
    setShowPopup(!showPopup);
  }
  function closePopup(){
    setShowPopup(!showPopup);
  }
  const display = {
    display: 'block'
  };
  const hide = {
    display: 'none'
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <div className="row">
      {
          columns.map((img, i) => {
            return <Column key={i} images={img} clk={togglePopup} addremovelike={addRemoveImages} liked={liked}/>
          })

      }
      <div className={'popup'} style={showPopup ? display : hide}>
        <div className={'popup_inner'}>
        <div className={"img-div"}>
          <img className={`showImage ${showImageData.h>showImageData.w ? 'img-vert':'img-hor'}`} src={showImageData.src} alt="ViewImage"/>
          </div>
          <button className="closebtn" onClick={closePopup}><i className="fa fa-times"></i></button>
          <div className={"img-details-container"}>
            <div className={"img-details"}>
              <p className={"img-details-author"} ><span onClick={() => {openInNewTab(showImageData.AuthorURL)}}>{showImageData.author}</span></p>
              <p className={"img-details-des"}>{showImageData.name}</p>
              <p><i className={`fas fa-heart ${Liked.includes(showImageData.imgId) ? "imgheart":""}`}></i> {showImageData.likes}</p>
            </div>
            <Button cName={"dbtn"} onClick={() => {openInNewTab(showImageData.download)}}><i className="fa fa-download"></i></Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
