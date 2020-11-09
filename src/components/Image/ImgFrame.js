import React from 'react'


function ImgFrame({clk,img,i}) {
function toggle(){
  clk(img);
}
const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
  return (
    <div className={"img-container"}>
      <img className={"imgView"} key={i} src={img.urls.small} alt="ViewImage" onClick = {toggle}/>
      <div className={"imgOverlayer"}>
        <div className={"imgbottom"}>
          <i className="fas fa-heart"></i> {img.likes}
          <span className="username" onClick={() => {openInNewTab(img.user.links.html)}}>{img.user.username}</span>
        </div>
      </div>
      
    </div>
  )
}

export default ImgFrame
