import axios from 'axios';
import qs from 'qs';

const SignupApi = async ({user}) =>{


    var data = qs.stringify({
    'Email': user.email,
    'Password': user.password,
    'UserName': user.username 
    });
    var config = {
    method: 'post',
    url: 'https://loginapi.glitch.me/signup',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };
    let datareturn;
    await axios(config)
    .then(function (response) {
    console.log(response.data);
    datareturn = response.data;
    })
    .catch(function (error) {
    console.log(error);
    });
    console.log(datareturn);
    return datareturn;
}
export default SignupApi;