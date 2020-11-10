import axios from 'axios';
import dataFormater from './DataFormater';

const randomImageApi = async({type,page})=>{

  //console.log("Type:=================>",type)
  var url = `https://api.unsplash.com/photos/random?count=30&content_filter=high&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`
  if(type===2){
    url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_SECRET_KEY}&image_type=photo&per_page=50&page=${page}`
  }
  var config = {
    url: url,
      headers: { 
      }
    };
  if(type===3){
    url =`https://api.pexels.com/v1/curated?per_page=80&page=${page}`
    config = {
      url: url,
      headers: { 
        'Authorization': process.env.REACT_APP_PEXEL_SECRET_KEY
      }
    };
  }
      //console.log("URLLLLLLLLL",url);
      var data;
      await axios(config)
      .then(function (response) {
        data = response.data;
        //console.log(data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
      //console.log(data);
      //return data;
      return await dataFormater(type,0,data);
      
}
export default randomImageApi;