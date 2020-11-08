import React from 'react'


function ImgFrame({clk,img,src,i}) {
function toggle(){
  clk(img);
}
  return (
      <img className={"imgView"} key={i} src={src.small} alt="ViewImage" onClick = {toggle}/>
  )
}

export default ImgFrame
