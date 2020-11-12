import React,{useState} from  'react';


function ImgFrame({clk,img,i,addremovelike}) {
let [isLiked, setLiked] = useState(false);
  function toggle(){
  clk(img);
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  function setIsLiked(){
    if(isLiked){
      img.Likes--;
      addremovelike("Remove",{imgId:img.ImageId,type:img.type})
    }else{
      img.Likes++;
      addremovelike("Add",img)
    }
    setLiked(!isLiked);
    
  }
  return (
    <div className={"img-container"}>
      
      <img className={`imgView`} key={i} src={img.View} alt="ViewImage" onClick = {toggle}/>
      <div className={"imgOverlayer"}>
        <div className={"imgbottom"} >
          <i className={`fas fa-heart ${isLiked ? "imgheart":""}`} onClick={setIsLiked} ></i> {img.Likes}
          <span className="username" onClick={() => {openInNewTab(img.AuthorURL)}}>{img.Author}</span>
        </div>
      </div>
      
    </div>
  )
}

export default ImgFrame
