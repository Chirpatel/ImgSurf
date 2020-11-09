import axios from 'axios';
const searchImageApi = async({query,page})=>{
  var url = `https://api.unsplash.com/search/photos?count=30&query=${query}&page=${page}&order_by=relevant&content_filter=high&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`
    var config = {
      url: url,
        headers: { 
        }
      };
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
      return data;
      
}
export default searchImageApi;