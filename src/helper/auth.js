import CryptoJS from "crypto-js";
import { USER_SESSION_KEY, ENC_KEY } from "../config/index";

export const setSession = (data) => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), ENC_KEY).toString();
    localStorage.setItem(USER_SESSION_KEY, ciphertext);
}

export const getSession = () => {
    let userData = localStorage.getItem(USER_SESSION_KEY);
    if (userData) {
        let ciphertext = CryptoJS.AES.decrypt(userData, ENC_KEY);
        return JSON.parse(ciphertext.toString(CryptoJS.enc.Utf8));
    } else {
        return null;
    }
}
export const deleteSession = () => {
    localStorage.removeItem(USER_SESSION_KEY);
}

export const getCookie = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";")

    for (let i = 0; i <= cookieString.length; i++) {
        const cookie = cookies[i]?.trim();
        
        if (cookie && cookie.startsWith(cookieName + '=')) {
            let cookieData = cookie.substring(cookieName.length + 1);
            if (cookieData) {

                return cookieData = JSON.parse(CryptoJS.AES.decrypt(cookieData, ENC_KEY).toString(CryptoJS.enc.Utf8));
            }
        }
    }
}