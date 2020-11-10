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
      <img className={"imgView"} key={i} src={img.View} alt="ViewImage" onClick = {toggle}/>
      <div className={"imgOverlayer"}>
        <div className={"imgbottom"}>
          <i className="fas fa-heart"></i> {img.Likes}
          <span className="username" onClick={() => {openInNewTab(img.AuthorURL)}}>{img.Author}</span>
        </div>
      </div>
      
    </div>
  )
}

export default ImgFrame
