import axios from 'axios';
const LikedImagesApi = async ({user}) =>{
    //console.log(user);
    var config = {
        method: 'get',
        url: `https://loginapi.glitch.me/user/${user.data.UserId}`,
        headers: { }
      };
    let datareturn;
    //console.log(config);
    await axios(config)
    .then(function (response) {
        //console.log(response.data);
        datareturn = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
    //console.log(datareturn);
    return datareturn;
}

export default LikedImagesApi;