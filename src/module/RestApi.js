
export default class RestAPI {

    static URL = "https://tcc-back-end-puc.azurewebsites.net/";

    static httpMethod(method, url, body) {
        return fetch(url, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then((res) => res.json());
    }

    static httpGet = (url) => RestAPI.httpMethod("GET", url);
    static httpPost = (url, body) => RestAPI.httpMethod("POST", url, body);
    static httpPut = (url, body) => RestAPI.httpMethod("PUT", url, body);
    static httpDelete = (url, body) => RestAPI.httpMethod("DELETE", url, body);


    static getTemp = () => RestAPI.httpGet(this.URL);

    // ************************************************** //
    // User Controller
    // ************************************************** //

    /*    static URL_USER = `${RestAPI.URL}/User`;
   
       static addUser = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/Add`, body);
       static auth = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/Auth`, body);
       static authFacebook = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/AuthFacebook`, body);
       static authDiscord = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/AuthDiscord`, body);
       static authTwitch = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/AuthTwitch`, body);
       static getUser = () => RestAPI.httpGet(`${RestAPI.URL_USER}/Get`);
       static getPasswordKey = () => RestAPI.httpGet(`${RestAPI.URL_USER}/GetPasswordKey`);
       static getUserInfoByToken = () => RestAPI.httpGet(`${RestAPI.URL_USER}/GetByToken`);
       static setUser = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/Set`, body);
       static updatePassword = (body, oldPassword, newPassword) => RestAPI.httpPost(`${RestAPI.URL_USER}/PasswordUpdate?oldPassword=${oldPassword}&newPassword=${newPassword}`, body);
       static contact = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/Contact`, body);
       static deleteUser = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/RemoveUser`, body);
       static resetPasswordUser = (email) => RestAPI.httpGet(`${RestAPI.URL_USER}/ResetPassword?email=${email}`);
       static updatePasswordUser = (body) => RestAPI.httpPost(`${RestAPI.URL_USER}/UpdateResetedPassword`, body); */

}
