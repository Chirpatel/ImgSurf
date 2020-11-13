import React, { Fragment } from 'react'
import ImgFrame from './ImgFrame'

function Column({ images ,clk, addremovelike,liked}) {
  //console.log(images, images.length);
  //console.log("Column");
  return (
    <Fragment>
    {
      <div className="column">
      {images.length!==0 && images.map((img,i)=>{
        return <ImgFrame key ={i} img={img} clk={clk} addremovelike={addremovelike} liked={liked}/>
      })}
        
    </div>
    }
    </Fragment>
  )
}

export default Column
