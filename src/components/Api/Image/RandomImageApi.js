import axios from 'axios';
const randomImageApi = async()=>{
  var url = `https://api.unsplash.com/photos/random?count=30&content_filter=high&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_KEY}`
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
export default randomImageApi;