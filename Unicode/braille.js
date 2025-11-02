const original = document.getElementById("original");
const modified = document.getElementById("modified");
let img = new Image();
let data, originalData, w, h;
let right = 0.4375 * 0.4;
let bottomleft = 0.1875 * 0.4;
let bottom = 0.3125 * 0.4;
let bottomright = 0.0625 * 0.4;
// let right = 0.4375;
// let bottomleft = 0.1875;
// let bottom = 0.3125;
// let bottomright = 0.0625;


class Color {
    static WHITE = new Color(255, 255, 255);
    static BLACK = new Color(0, 0, 0);

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

function dif(a, b) {
    return new Color(a.r - b.r, a.g - b.g, a.b - b.b);
}


function upload(file) {
    img.onload = modify;
    img.src = URL.createObjectURL(file);
}

function showOriginal() {
    w = img.width;
    h = img.height;
    // max w: 40 on phone
    // max area: 1e7 without dithering, 1e4 with dithering
    // let factor = Math.sqrt(Math.min(1, 1e7 / (w * h)));
    let factor = 350 / w;
    w *= factor;
    h *= factor;
    w -= w % 3;
    h -= h % 5;
    original.width = w;
    original.height = h;
    let ctx = original.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    originalData = ctx.getImageData(0, 0, w, h);
}

function dither() {
    modified.width = w;
    modified.height = h;
    let ctx = modified.getContext("2d");
    data = new ImageData(new Uint8ClampedArray(originalData.data), w, h);

    let index = 0;
    for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
            let old = new Color(data.data[index], data.data[index + 1], data.data[index + 2]);
            let black = old.r + old.g + old.b < 384;
            let changed = black ? Color.BLACK : Color.WHITE;
            data.data[index] = changed.r;
            data.data[index + 1] = changed.g;
            data.data[index + 2] = changed.b;

            let err = dif(old, changed);
            if (x < w - 1) {
                data.data[index + 4] += err.r * right;
                data.data[index + 5] += err.g * right;
                data.data[index + 6] += err.b * right;
                if (y < h - 1) {
                    data.data[index + 4 * (w + 1)] += err.r * bottomright;
                    data.data[index + 4 * (w + 1) + 1] += err.g * bottomright;
                    data.data[index + 4 * (w + 1) + 2] += err.b * bottomright;
                }
            }
            if (y < h - 1) {
                data.data[index + 4 * w] += err.r * bottom;
                data.data[index + 4 * w + 1] += err.g * bottom;
                data.data[index + 4 * w + 2] += err.b * bottom;
                if (x > 0) {
                    data.data[index + 4 * (w - 1)] += err.r * bottomleft;
                    data.data[index + 4 * (w - 1) + 1] += err.g * bottomleft;
                    data.data[index + 4 * (w - 1) + 2] += err.b * bottomleft;
                }
            }

            index += 4;
        }
    }

    ctx.putImageData(data, 0, 0);
}

function convertASCII() {
    let codes = [];

    for (let y = 0; y < h; y += 5) {
        for (let x = 0; x < w; x += 3) {
            let code = 0;

            if (!data.data[4 * (x + y * w)]) code |= 1;
            if (!data.data[4 * (x + (y + 1) * w)]) code |= 1 << 1;
            if (!data.data[4 * (x + (y + 2) * w)]) code |= 1 << 2;
            if (!data.data[4 * ((x + 1) + y * w)]) code |= 1 << 3;
            if (!data.data[4 * ((x + 1) + (y + 1) * w)]) code |= 1 << 4;
            if (!data.data[4 * ((x + 1) + (y + 2) * w)]) code |= 1 << 5;
            if (!data.data[4 * (x + (y + 3) * w)]) code |= 1 << 6;
            if (!data.data[4 * ((x + 1) + (y + 3) * w)]) code |= 1 << 7;

            codes.push(0x2800 + code);
        }
        codes.push(60, 98, 114, 62);
    }
    codes.pop();

    document.getElementById("output").innerHTML = String.fromCharCode(...codes);
}

function slider(n, value) {
    switch (n) {
        case 1:
            right = value;
            break;
        case 2:
            bottomleft = value;
            break;
        case 3:
            bottom = value;
            break;
        case 4:
            bottomright = value;
            break;
        default:
            return;
    }
    dither();
    convertASCII();
}

function modify() {
    let start = performance.now();
    showOriginal();
    dither();
    convertASCII();
    console.log(`Editing done in ${0.001 * (performance.now() - start)} seconds.`);
}
