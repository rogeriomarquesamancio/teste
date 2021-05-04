export default class Mask{
    static MASK = {
        UF: "##",
        HOUR: "##:##",
        DATE: "##/##/####",
        DATE_HOUR: "##/##/#### ##:##",
        PHONE: "(##) ####-####",
        CELLPHONE: "(##) #####-####",
        RG: "##.###.###",
        CPF: "###.###.###-##",
        CNPJ: "##.###.###/####-##",
        POSTAL_CODE: "#####-###",
        PERCENTAGE: "##.##",
        CARD: "#### #### #### ####",
        CARD_EXPIRATION_1: "##/####",
        CARD_EXPIRATION_2: "##/##",
        CVV: "###"
    }

    /**
     * Removes the mask form the text
     * @param {String} text - Text that will be unmasked
     * @returns {String} Unmasked text
     */
    static unmask(text) {
        return text.replace(/\./g, "").replace(/-/g, "")
                .replace(/\//g, "").replace(/\(/g, "")
                .replace(/\)/g, "").replace(/:/g, "")
                .replace(/ /g, "").replace(/,/g, "");
    }

    /**
     * Apply a mask on the text
     * @param {String} mask - Mask to be applied
     * @param {String} text - Text to apply mask
     * @returns {String} Masked text
     */
    static applyMask(mask, text){
        if(mask && mask.length > 0 && text && text.length > 0) {
            text = Mask.unmask(text);
            let out = "";
            let i = 0;
            let j = 0;
            while (i < mask.length && j < text.length) {
                if (mask[i] === '#') {
                    out += text[j];
                    j++;
                } else {
                    out += mask[i];
                }
                i++;
            }
            return out;
        }
        return text;
    }

    /**
     * Apply a generic phone mask on the text
     * @param {String} text Text to apply mask
     * @returns {String} Masked text
     */
    static genericPhoneMask(text){
        if(text.length <= Mask.MASK.PHONE.length) return Mask.applyMask(Mask.MASK.PHONE, text);
        else return Mask.applyMask(Mask.MASK.CELLPHONE, text);
    }

    /**
     * Apply a cpf or cnpj mask, depending on the length of the text
     * @param {String} text Text to apply mask
     * @returns {String} Masked text
     */
    static formatCpfCnpj(text){
        if(text.length <= Mask.MASK.CPF.length) return Mask.applyMask(Mask.MASK.CPF, text);
        else return Mask.applyMask(Mask.MASK.CNPJ, text);
    }

    /**
     * Apply a decimal mask
     * @param {String} value Text to apply mask
     * @param {String} prefix Prefix of the decimal
     * @returns {String} Masked text
     */
    static formatDecimal(value, prefix = "") {
        if(typeof(value) !== "string") return "";
        value = Mask.unmaskDecimal(value, prefix);
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if(prefix) value = `${prefix} ${value}`;
        return `${value.substring(0, value.length - 3)},${value.substring(value.length-2, value.length)}`;
    }

    /**
     * Remove decimal mask
     * @param {String} value Text to remove mask
     * @param {String} prefix Prefix of the decimal
     * @returns {String} Unmasked text
     */
    static unmaskDecimal(value, prefix = "") {
        value = Mask.unmask(value.replace(prefix, "").replace("^0+", ""));
        value = Mask.NaN0(Number(value))/100;
        return value.toFixed(2);
    }

    /**
      * Tests if is not a number, returning 0 if true and the original value if false.
     */
    static NaN0(value) {
        return isNaN(value) ? 0 : value;
    };

    /**
      * Safely parse JSON (no errors).
     */
    static parseJSON(data) {
        if(!data) return "";
        try {
            return JSON.parse(data);
        } catch (e) {
            return "";
        }
    }

    /**
      * Adds the header to the base64.
     */
    static formatBase64(base64, format = "png"){
        switch (format) {
            case 'png':
                return `data:image/${format};base64,${base64}`;
            case "mpeg":
            case "mp4":
            case "mp3":
            case "m4a":
                return `data:audio/${format};base64,${base64}`;
            default: return base64;
        }
    }

    /**
      * Splits the base64 into header and pure base64.
     */
    static splitBase64(str){
        let [header, base64] = str.split(",");
        return {header, base64};
    }

    static normalizeStr(str){
        if(!str) return "";
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    /**
      * Escapes a string for insertion into HTML.
     */
    static escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/'/g, '&#39;')
                .replace(/"/g, '&quot;');
    }

    /**
      * Unescapes HTML special chars
     */
    static unescapeHtml(str) {
        return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>').replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"');
    }

    /**
      * Remove HTML tags from string.
     */
    static removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
    }
    
    /**
      * Reverse a string.
     */
    static reverseString(str) {
        return str.split('').reverse().join('');
    }
    
    /**
      * Uppercase the first char of a string.
     */
    static upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
}
