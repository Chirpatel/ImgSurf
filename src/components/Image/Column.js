import React from 'react'
import ImgFrame from './ImgFrame'

function Column({clk, images,img }) {
  //console.log(images);

  return (
    
    <div className="column">
      {images.map((img,i)=>{
        return <ImgFrame key ={i} src={img.urls} author={img.user.username} img={img} clk={clk}/>
      })}
        
    </div>
  )
}

export default Column
