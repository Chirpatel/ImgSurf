
/*
type1: 
    1 => Unsplash
    2 => Pixabay
    3 => Pexels

type2:
    0 => Random
    1 => Search
*/
/*
TotalPage: data.total/200
ImageId: img.id
Download: img.largeImageURL
View: img.webformatURL
Author: img.user
AuthorUrl: https://pixabay.com/users/{img.user}-{img.user_id}/
Likes: img.likes


*/
async function dataFormater(type1,type2,data){
    //console.log("In DataFormater Function")
    let apiData = {}
    let apiDataImg=[]
    if(type1===1){
        if(type2===0){
            data.forEach((img)=>{
                apiDataImg = [...apiDataImg,{ImageId: img.id,
                    ImageDes: img.alt_description,
                    Download: img.urls.raw,
                    View: img.urls.small,
                    Author: img.user.username,
                    AuthorURL: img.user.links.html,
                    Likes: img.likes,
                    w: img.width,
                    h: img.height,
                    type:type1}]
            })
        }
        else{
            //console.log(data);
            apiData={TotalPage: data.total_pages}
            data.results.forEach((img)=>{
                apiDataImg = [...apiDataImg,{ImageId: img.id,
                    ImageDes: img.alt_description,
                    Download: img.urls.raw,
                    View: img.urls.small,
                    Author: img.user.username,
                    AuthorURL: img.user.links.html,
                    Likes: img.likes,
                    w: img.width,
                    h: img.height,
                    type:type1}]
            })
        }
    }

    else if(type1===2){
        //console.log(data);
        apiData={TotalPage: parseInt(data.total/200)}
            data.hits.forEach((img)=>{
                apiDataImg = [...apiDataImg,{ImageId: img.id,
                    ImageDes: img.tags,
                    Download: img.largeImageURL,
                    View: img.webformatURL,
                    Author: img.user,
                    AuthorURL: `https://pixabay.com/users/${img.user}-${img.user_id}/`,
                    Likes: img.likes,
                    w: img.imageWidth,
                    h: img.imageHeight,
                    type:type1}]
            })
    }
    else{
        apiData={TotalPage: parseInt(data.total_results/80)}
            data.photos.forEach((img)=>{
                apiDataImg = [...apiDataImg,{ImageId: img.id,
                    ImageDes: img.photographer,
                    Download: img.src.original,
                    View: img.src.medium,
                    Author: img.photographer,
                    AuthorURL: img.photographer_url,
                    Likes: "",
                    w: img.width,
                    h: img.height,
                    type:type1}]
            })
    }
    //console.log(apiDataImg);
    apiData = {...apiData, data: apiDataImg}
    //console.log(apiData);
    if(type2===0){
        return apiData.data;
    }
    else{
        return apiData
    }
}
export default dataFormater;