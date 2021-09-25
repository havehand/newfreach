import Cookie from "js-cookie"

export function setCookie(info){
    const arr = Object.entries(info);
    for (let item of arr){
        Cookie.set(item[0], item[1]);
    }
    return true;
}

export function getUserInfo(){
    return {
        username: Cookie.get('username'),
        appkey: Cookie.get('appkey'),
        role: Cookie.get('role'),
        email: Cookie.get('email')
    }
}

export function removeUserCookie(){
    Cookie.remove('username');
    Cookie.remove('appkey');
    Cookie.remove('role');
    Cookie.remove('email');
}