import React from 'react';
import Gallery  from '../Image/Gallery';
function Liked(){
    var data={}
    if(localStorage.getItem('setlikedImages')!==null){
        data = JSON.parse(localStorage.getItem('setlikedImages'))
        console.log(localStorage.getItem('ImgSurfUserId'));
    }
    
    return(
        <div>
            <p>Liked</p>
            {data.img.length>0 &&
                <Gallery imgarr={data.img}/>
            }
        </div>
    );
}

export default Liked;