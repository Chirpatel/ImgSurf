
import axios from 'axios';

const LoginApi = async ({user}) =>{

    var config = {
        method: 'post',
        url: `https://loginapi.glitch.me/login?Email=${user.email}&Password=${user.password}`,
        headers: { }
      };
      let returndata;
      await axios(config)
      .then(function (response) {
        returndata=response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(returndata);
      return returndata;
}
export default LoginApi;