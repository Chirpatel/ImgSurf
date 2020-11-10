
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
                    Likes: img.likes}]
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
                    Likes: img.likes}]
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
                    Likes: img.likes}]
            })
    }
 /*
Total Page: data.total_results/80
ImageId: data.photos[0].id
Download:  data.photos[0].src.original
View: data.photos[0].src.medium
Author: data.photos[0].photographer
AuthorUrl: data.photos[0].photographer_url
likes: NA data.photos[0].liked ("false") 
 
 
 */   
    
    else{
        apiData={TotalPage: parseInt(data.total_results/80)}
            data.photos.forEach((img)=>{
                apiDataImg = [...apiDataImg,{ImageId: img.id,
                    ImageDes: img.src.original,
                    Download: img.src.original,
                    View: img.src.medium,
                    Author: img.photographer,
                    AuthorURL: img.photographer_url,
                    Likes: ""}]
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