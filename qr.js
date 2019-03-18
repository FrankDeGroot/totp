'use strict';

export function onAddQR(cb) {
    qrcode.callback = function (url) {
        var matches = url.match(/otpauth:\/\/totp\/(.*)\?secret=(.*)&issuer=(.*)/);
        var nameUser = decodeURIComponent(matches[1]).match(/(.*):(.*)/);
        cb({
            name: nameUser[1],
            user: nameUser[2],
            secret: matches[2],
            issuer: matches[3]
        });
    };
}

export function addQR(f) {
    for (var i = 0; i < f.length; i++) {
        var reader = new FileReader();
        reader.onload = (function () {
            return function (e) {
                qrcode.decode(e.target.result);
            };
        })(f[i]);
        reader.readAsDataURL(f[i]);
    }
}
