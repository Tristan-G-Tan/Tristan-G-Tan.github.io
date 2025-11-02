const original = document.getElementById("original");
const modified = document.getElementById("modified");
let img = new Image();
let data, originalData, w, h;


let palette = [
    "　",
    "．",
    "＇",
    "｀",
    "、",
    "，",
    "＂",
    "：",
    "－",
    "；",
    "＿",
    "。",
    "＾",
    "～",
    "｜",
    "＊",
    "！",
    "ｒ",
    "＋",
    "／",
    "＼",
    "（",
    "）",
    "＜",
    "＞",
    "Ｊ",
    "？",
    "｛",
    "ｖ",
    "一",
    "＝",
    "ｔ",
    "ｊ",
    "Ｌ",
    "ｙ",
    "ｌ",
    "７",
    "Ｔ",
    "卜",
    "《",
    "１",
    "ｈ",
    "Ｆ",
    "厂",
    "入",
    "Ｉ",
    "ｅ",
    "八",
    "Ｅ",
    "个",
    "４",
    "ｑ",
    "十",
    "０",
    "Ｚ",
    "９",
    "Ｘ",
    "六",
    "久",
    "什",
    "心",
    "卞",
    "以",
    "斗",
    "Ｂ",
    "计",
    "价",
    "父",
    "尸",
    "千",
    "圹",
    "水",
    "止",
    "们",
    "术",
    "爪",
    "廿",
    "允",
    "汰",
    "亢",
    "尺",
    "灭",
    "立",
    "仨",
    "衫",
    "书",
    "炎",
    "平",
    "拤",
    "汝",
    "杵",
    "可",
    "诀",
    "讹",
    "念",
    "朱",
    "料",
    "负",
    "浒",
    "峦",
    "泱",
    "犯",
    "丏",
    "巴",
    "栌",
    "咴",
    "豹",
    "劾",
    "浴",
    "斩",
    "来",
    "胗",
    "宏",
    "愉",
    "峣",
    "秀",
    "涎",
    "蛱",
    "综",
    "纲",
    "抠",
    "肼",
    "陨",
    "铬",
    "铪",
    "录",
    "蒸",
    "奋",
    "碜",
    "胍",
    "胨",
    "赂",
    "脱",
    "慨",
    "睛",
    "庚",
    "畅",
    "唯",
    "惧",
    "稳",
    "隧",
    "胯",
    "拳",
    "晦",
    "载",
    "捶",
    "裔",
    "萄",
    "番",
    "履",
    "搋",
    "轰",
    "椿",
    "璠",
    "糟",
    "隍",
    "晡",
    "颠",
    "携",
    "隋",
    "桑",
    "蝗",
    "蝈",
    "灌",
    "猬",
    "腰",
    "潭",
    "票",
    "瞎",
    "疃",
    "稽",
    "晕",
    "蝠",
    "朦",
    "孱",
    "雩",
    "癔",
    "魑",
    "醋",
    "重",
    "毳",
    "擅",
    "遭",
    "嘉",
    "赣",
    "蔫",
    "霰",
    "霜",
    "噩",
    "翥",
    "戆",
    "墨",
    "薷",
    "蕞",
    "熹",
    "嬗",
    "篁",
    "露",
    "鬈",
    "羲",
    "纂",
    "攫",
    "蔓",
    "氰",
    "霉",
    "翼",
    "篝",
    "蕈",
    "蠡",
    "囊",
    "爨",
    "鬻",
    "霎",
    "橐",
    "馨",
    "藿",
    "霾",
    "霾",
    "謇",
    "謇",
    "謇",
    "纛",
    "矍",
    "矍",
    "矍",
    "矗",
    "矗",
    "矗",
    "鼍",
    "羹",
    "羹",
    "羹",
    "羹",
    "羹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "蠹",
    "薹",
    "薹",
    "薹",
    "薹",
    "薹",
    "薹",
    "薹",
    "薹",
    "薹"
];


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
    // let factor = Math.sqrt(5e4 / (w * h));
    // let factor = Math.sqrt(Math.min(1, 1e7 / (w * h)));
    let factor = 150 / w;
    w = ~~(w * factor);
    h = ~~(h * factor);
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
            let greyscale = Math.trunc(256 * Math.tanh(0.01 * (old.r + old.g + old.b - 250)));
            // let greyscale = Math.trunc((old.r + old.g + old.b) / 3 + 1);
            let changed = new Color(greyscale, greyscale, greyscale);
            data.data[index] = changed.r;
            data.data[index + 1] = changed.g;
            data.data[index + 2] = changed.b;

            // let err = dif(old, changed);
            // if (x < w - 1) {
            //     data.data[index + 4] += err.r * 0.4375;
            //     data.data[index + 5] += err.g * 0.4375;
            //     data.data[index + 6] += err.b * 0.4375;
            //     if (y < h - 1) {
            //         data.data[index + 4 * (w + 1)] += err.r * 0.0625;
            //         data.data[index + 4 * (w + 1) + 1] += err.g * 0.0625;
            //         data.data[index + 4 * (w + 1) + 2] += err.b * 0.0625;
            //     }
            // }
            // if (y < h - 1) {
            //     data.data[index + 4 * w] += err.r * 0.3125;
            //     data.data[index + 4 * w + 1] += err.g * 0.3125;
            //     data.data[index + 4 * w + 2] += err.b * 0.3125;
            //     if (x > 0) {
            //         data.data[index + 4 * (w - 1)] += err.r * 0.1875;
            //         data.data[index + 4 * (w - 1) + 1] += err.g * 0.1875;
            //         data.data[index + 4 * (w - 1) + 2] += err.b * 0.1875;
            //     }
            // }

            index += 4;
        }
    }

    ctx.putImageData(data, 0, 0);
}

function convertASCII() {
    let codes = [];

    for (let y = 0; y < h; y ++) {
        for (let x = 0; x < w; x ++) {
            let greyscale = data.data[4 * (x + y * w)];
            codes.push(palette[255 - greyscale].codePointAt(0));
        }
        codes.push(60, 98, 114, 62); // <br>
    }
    codes.pop();

    document.getElementById("output").innerHTML = String.fromCodePoint(...codes);
}

function modify() {
    let start = performance.now();
    showOriginal();
    dither();
    convertASCII();
    console.log(`Editing done in ${0.001 * (performance.now() - start)} seconds.`);
}
