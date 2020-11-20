
import axios from 'axios';

const ProfileApi = async ({UserId}) =>{
    //console.log(UserId)
    var config = {
        method: 'get',
        url: `https://loginapi.glitch.me/profile/${UserId}`,
        headers: { }
      };
      let returndata;
      await axios(config)
      .then(function (response) {
        returndata=response.data;
        console.log(returndata);
      })
      .catch(function (error) {
        console.log(error);
      });
      //console.log(returndata);
      return returndata;
}
export default ProfileApi;