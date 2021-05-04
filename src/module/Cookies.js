import Cookie from 'js-cookie';
import Encryption from "./Encryption";

export default class Cookies {
    // COOKIE NAMES
    static TOKEN = "auth-token";
    static USER_DATA = "_ud";
    static LAST_TOURNAMENT = "_lt";

    /**
     * Create a cookie
     * @param {String} name The name of the cookie
     * @param {Object} data The data to be stored in cookie
     * @param {Number} [expires] The number (in days) to expire the cookie (optional)
     * @param {String} [salt] The salt to encrypt the data that will be stored in cookie (optional)
     * @returns {Boolean} If the cookie was stored successfully
     */
    static set(name, data, expires = 7, salt) {
        if(!name || !data) return; 
        if(!salt) return Cookie.set(name, data, { expires });
        const encrypted_data = Encryption.encrypterInAES(JSON.stringify(data), salt);
        if(!encrypted_data) return;
        return Cookie.set(name, encrypted_data, { expires });
    }

    /**
     * Get a cookie
     * @param {String} name The name of the cookie
     * @param {String} [salt] The salt to decrypt the data (optional)
     * @returns {Object} The cookie data
     */
    static get(name, salt) {
        if(!salt) return Cookie.getJSON(name);
        const data = Encryption.decrypterInAES(Cookie.get(name), salt);
        if(!data) return;
        return JSON.parse(data);
    }

    /**
     * Remove a cookie
     * @param {String} name The name of the cookie
     * @returns {Boolean} If the cookie was removed successfully
     */
    static remove(name) {
        if(!name) return false;
        Cookie.remove(name);
        return true;
    }
}