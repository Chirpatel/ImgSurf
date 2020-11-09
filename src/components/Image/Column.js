import React from 'react'
import ImgFrame from './ImgFrame'

function Column({ images ,clk}) {
  //console.log(images);

  return (
    
    <div className="column">
      {images.map((img,i)=>{
        return <ImgFrame key ={i} img={img} clk={clk}/>
      })}
        
    </div>
  )
}

export default Column
