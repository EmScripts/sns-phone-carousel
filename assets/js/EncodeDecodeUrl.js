function EncodeUrl(url) {
    return btoa(encode_utf8(url));
}

function DecodeUrl(url) {
    return atob(decode_utf8(url));
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}