import axios from 'axios';
import qs from 'qs';
const LikedApi = async ({user,img}) =>{
    //console.log(user);
    var data = qs.stringify(img);
    var config = {
        method: 'post',
        url: `https://loginapi.glitch.me/user/${user.data.UserId}/add`,
        headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
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

export default LikedApi;