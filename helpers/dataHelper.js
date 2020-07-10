export function convertToCurrency(value, option) {
    if(typeof value !== 'number')
        return'';

    if(!option)
        option = {};
    if(!option.format)
        option.format = 'en-US';
    if(!option.currency)
        option.currency = 'USD';

    return value.toLocaleString(option.format, {style:'currency', currency:option.currency});
};

export function convertToSize(size) {
    return(size / 1000000).toFixed(2) + 'MB';
}

export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/';
};

export function convertToUrl(url) {
    return'http://localhost:9000/hubbco-core/' + url; // local
}

// export function convertToUrl(url) {
//     return'https://minio.namtech.xyz/hubbco-core/' + url; // staging
// }

export function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if(!strCookie)
        return null;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
};

export function pagination(page , limit) {
    let skip = (page - 1) * limit;
    return skip;
};

export let url = process.env.API_URL_IMAGE;
