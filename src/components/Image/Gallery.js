import React, {useState, useEffect } from 'react'
import Column from './Column'
import {Button} from "../Navbar/Button";


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


 function Gallery({ imgarr }) {
  //console.log(imgarr);
  let [columns, setColumns] = useState([]);
  let [showPopup, setShowPopup] = useState(false);
  let [showImageData, setImageData] = useState({src:"",author:"",name:"",download:""});
  let [likedImages, setlikedImages] = useState([])

  function addLikeImages(img){
    let index = -1;
    likedImages.forEach((imgt,i)=>{
      if(imgt.ImageId===img.imgId && imgt.type===img.type){
        index = i;
      }
    })
    if(index === -1){
      setlikedImages([...likedImages,img])
    }
    console.log("Added");
    console.log(likedImages);
    localStorage.setItem('setlikedImages',JSON.stringify({img: likedImages}));
  }
  function removeLikeImages(img){
    console.log(img.imgId,img.type);
    if(likedImages[0]!==undefined){
      likedImages.forEach((imgt,i)=>{
        if(imgt.ImageId===img.imgId && imgt.type===img.type){
          console.log(i);
          likedImages.splice(i, 1);
        }
      })
      console.log(likedImages);
      console.log("Removed");
      localStorage.setItem('setlikedImages', likedImages);
  }
    
  }
  function addRemoveImages(operation,imgId,type){
    if(operation==="Add"){
      console.log("Adding");
      addLikeImages(imgId,type);
    }else{
      console.log("Removing");
      removeLikeImages(imgId,type);
    }
  }
  useEffect(()=>{
    var imgarray = getColumns(imgarr, 3);
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
    setImageData({src:data.View,author:data.Author,h:data.h,w:data.w,name:data.ImageDes,download:data.Download,likes:data.Likes,AuthorURL:data.AuthorURL});
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
            return <Column key={i} images={img} clk={togglePopup} addremovelike={addRemoveImages}/>
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
              <p><i className="fas fa-heart"></i> {showImageData.likes}</p>
            </div>
            <Button cName={"dbtn"} onClick={() => {openInNewTab(showImageData.download)}}><i className="fa fa-download"></i></Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
