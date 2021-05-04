import CryptoJS from "crypto-js";

export default class Encryption {

    static encryptByTDES(text, salt) {
        if (!text || !salt) return "";
        try {
            // transforma o json em um array de bytes
            let DataToEncrypt = CryptoJS.enc.Utf8.parse(text);
            // transforma a chave em um array de bytes usando Utf8 e depois cria uma hash em MD5
            // como a hash só tem 16 bytes é necessário usar os 8 primeiros bytes e concatenar no final para formar 24 bytes
            let TDESKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(salt));
            let k1 = TDESKey.words.slice(0, 2);
            TDESKey.words = TDESKey.words.concat(k1);
            TDESKey.sigBytes = 24;
            // encripta o dado
            let encryptedData = CryptoJS.TripleDES.encrypt(DataToEncrypt, TDESKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
            // retorna o dado no formato de base64
            return encryptedData.toString();
        } catch (e) {
            return "";
        }
    }

    static decryptByTDES(ciphertext, salt) {
        if (!ciphertext || !salt) return "";
        try {
            // passa o dado em base64 para um array de bytes
            let dataToDecrypt = CryptoJS.enc.Base64.parse(ciphertext)
            // transforma a chave em um array de bytes usando Utf8 e depois cria uma hash em MD5
            // como a hash só tem 16 bytes é necessário usar os 8 primeiros bytes e concatenar no final para formar 24 bytes
            let TDESKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(salt));
            let k1 = TDESKey.words.slice(0, 2);
            TDESKey.words = TDESKey.words.concat(k1);
            TDESKey.sigBytes = 24;
            // decripta o dado
            let decryptedData = CryptoJS.TripleDES.decrypt({ ciphertext: dataToDecrypt }, TDESKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
            // retorna o dato em formato json
            let result = CryptoJS.enc.Utf8.stringify(decryptedData);
            return result;
        } catch (e) {
            return "";
        }
    }

    static encryptByAES(text, salt) {
        if (!text || !salt) return "";
        try {
            // transforma o json em um array de bytes
            let dataToEncrypt = CryptoJS.enc.Utf8.parse(text);
            // cria uma key de 256 bits em SHA-3 usando o salt
            let key = CryptoJS.SHA3(salt, { outputLength: 256 });
            // cria uma iv em Hex usando o salt
            let iv = CryptoJS.enc.Hex.parse(salt);
            // encripta o dado em AES
            let encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, { iv: iv });
            // retorna o dado no formato de base64
            return encrypted.toString();
        } catch (e) {
            return "";
        }
    }

    static decryptByAES(ciphertext, salt) {
        if (!ciphertext || !salt) return "";
        try {
            // passa o dado em base64 para um array de bytes
            let dataToDecrypt = CryptoJS.enc.Base64.parse(ciphertext);
            // cria uma key de 256 bits em SHA-3 usando o salt
            let key = CryptoJS.SHA3(salt, { outputLength: 256 });
            // cria uma iv em Hex usando o salt
            let iv = CryptoJS.enc.Hex.parse(salt);
            // descripta o dado em AES
            let decrypted = CryptoJS.AES.decrypt({ ciphertext: dataToDecrypt }, key, { iv: iv });
            // retorna o dato em formato json
            let result = CryptoJS.enc.Utf8.stringify(decrypted);
            return result;
        } catch (e) {
            return "";
        }
    }

    static encrypterInAES(text, salt) {
        if (!text || !salt) return "";
        try {
            const key = CryptoJS.PBKDF2(salt, salt, {keySize: 256 / 32});
            const iv = CryptoJS.PBKDF2(salt, salt, {keySize: 128 / 32});            
            const encrypted = CryptoJS.AES.encrypt(text, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
            return encrypted;
        } catch (e) {
            return "";
        }
    }

    static decrypterInAES(ciphertext, salt) {
        if (!ciphertext || !salt) return "";
        try {
            const key = CryptoJS.PBKDF2(salt, salt, {keySize: 256 / 32});
            const iv = CryptoJS.PBKDF2(salt, salt, {keySize: 128 / 32});
            const bytes  = CryptoJS.AES.decrypt(ciphertext, key,{ iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            return "";
        }
    }

    static stringToBase64(string) {
        if (typeof (string) !== 'string' || string === "") return "";
        const words = CryptoJS.enc.Utf8.parse(string);
        return CryptoJS.enc.Base64.stringify(words);
    }

    static base64ToString(base64) {
        if (typeof (base64) !== 'string' || base64 === "") return "";
        const words = CryptoJS.enc.Base64.parse(base64);
        return CryptoJS.enc.Utf8.stringify(words);
    }

    static readFileAsText(file) {
        return new Promise((resolve, reject) => {
            try {
                const fileReader = new FileReader();
                fileReader.onload = (e) => resolve({base64: e.target.result});
                fileReader.readAsText(file);
            } catch (error) {
                reject({error});
            }
        });
    }
    
    static readFileAsDataURL(file) {
        if (!file) return "";
        return new Promise((resolve, reject) => {
            try {
                const fileReader = new FileReader();
                fileReader.onload = (e) => resolve(e.target.result);
                fileReader.readAsDataURL(file);
            } catch (error) {
                reject({error});
            }
        });
    }

    static async readFilesAsDataUrl(files = []) {
        return Array.from(files).reduce(async (filesAsDataUrl, f) => {
            const accumulator = await filesAsDataUrl;
            const fileAsDataUrl = await Encryption.readFileAsDataURL(f);
            accumulator.push(fileAsDataUrl);
            return Promise.all(accumulator);
        }, Promise.all([]));
    }
}
