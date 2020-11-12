import React, { Fragment } from 'react'
import ImgFrame from './ImgFrame'

function Column({ images ,clk, addremovelike}) {
  //console.log(images, images.length);
  
  return (
    <Fragment>
    {images.length!==0 &&
      <div className="column">
      {images.length!==0 && images.map((img,i)=>{
        return <ImgFrame key ={i} img={img} clk={clk} addremovelike={addremovelike}/>
      })}
        
    </div>
    }
    </Fragment>
  )
}

export default Column
