import axios from 'axios';
import dataFormater from './DataFormater';

const searchImageApi = async({type,query,page})=>{
  //console.log(type,page);
  var url = `https://api.unsplash.com/search/photos?count=30&query=${query}&page=${page}&order_by=relevant&content_filter=high&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`

    if(type===2){
      url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_SECRET_KEY}&q=${query}&image_type=photo&per_page=50&page=${page}`
    }
    var config = {
      url: url,
        headers: { 
        }
      };
    if(type===3){
      url =`https://api.pexels.com/v1/search?query=${query}&per_page=80&page=${page}`
      config = {
        url: url,
        headers: { 
          'Authorization': process.env.REACT_APP_PEXEL_SECRET_KEY
        }
      };
    }
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
      return await dataFormater(type,1,data);
      
}
export default searchImageApi;