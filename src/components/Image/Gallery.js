import React, {useState, useEffect } from 'react'
import Column from './Column'

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
  useEffect(()=>{
    setColumns(getColumns(imgarr, 3));
  },[imgarr])
  function togglePopup(data) {
    //console.log(data);
    setImageData({src:data.urls.small,author:data.user.name,name:data.alt_description,download:data.urls.raw});
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
            return <Column key={i} images={img} clk={togglePopup}/>
          })

      }
      <div className={'popup'} style={showPopup ? display : hide}>
        <div className={'popup_inner'}>
          <img className={"showImage"} src={showImageData.src} alt="ViewImage"/>
          <div>
            <button className="btn downloadbtn" onClick={() => {openInNewTab(showImageData.download)}}><i className="fa fa-download"></i> Download</button>
            <button className="closebtn" onClick={closePopup}><i className="fa fa-times"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
