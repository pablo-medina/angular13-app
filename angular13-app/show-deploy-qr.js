const QRCode = require('qrcode');

const url = 'https://pablo-medina.github.io/angular13-app';

QRCode.toString(url, {type: 'terminal'}, (err, qrCode) => {
    if (err) {
        console.error("Couldn't generate QR Code: ", err);
        return;
    }
    console.log(qrCode);
});

