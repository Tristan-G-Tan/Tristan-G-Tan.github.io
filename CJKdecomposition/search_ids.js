
let hideCDP = true;

let cells = new Array(256);
let selected = 256;
let page = 0;

{
    let table = document.getElementById("body");
    for (let y = 0; y < 16; ++y) {
        let row = document.createElement("tr");
        for (let x = 0; x < 16; ++x) {
            let cell = document.createElement("td");
            let id = x + 16 * y;
            let uni = id + (page << 8);
            cell.textContent = String.fromCodePoint(uni);
            cell.title = "U+" + uni.toString(16).toUpperCase().padStart(6, "0");
            cell.className = "char";
            cell.onclick = () => { select(id) };
            cell.onmouseenter = () => { over(id) };
            cell.onmouseleave = () => { leave(id) };
            cells[id] = cell;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function over(i) {
    if (i !== selected)
        cells[i].style.backgroundColor = "lightgrey";
}

function leave(i) {
    if (i !== selected)
        cells[i].style.backgroundColor = "white";
}

function select(i) {
    if (selected < 256) cells[selected].style.backgroundColor = "white";
    selected = i;
    cells[i].style.backgroundColor = "grey";
    let char = cells[i].textContent;
    let code = 256 * page + i;

    let name;
    for (let [block, range] of Object.entries(blocks)) {
        if (code >= range[0] && code <= range[1]) {
            name = `${block}-${code.toString(16).toUpperCase().padStart(4, "0")}`;
            break;
        }
    }
    name = name || names[char] || `<reserved-${code.toString(16).toUpperCase().padStart(4, "0")}>`;
    let isCJK = name.includes("CJK Ideograph");

    document.getElementById("view").value = char;
    document.getElementById("uni").value = `U+${code.toString(16).toUpperCase().padStart(6, "0")}`;
    document.getElementById("dec").textContent = code.toString();
    document.getElementById("verbose").innerHTML = "";
    if (isCJK) {
        let entry = readings_map[char];
        document.getElementById("title1").textContent = "Reading:";
        document.getElementById("read").textContent = "N/A";

        let i = 0;
        for (let property of ["kXHC1983", "kTGHZ2013", "kHanyuPinlu", "kSMSZD2003Readings", "kHanyuPinyin", "kMandarin", "kCantonese", "kTang", "kZhuang", "kVietnamese", "kJapanese", "kHangul", "kKorean"]) {
            if (entry[property]) {
                if (i > 5)
                    document.getElementById("title1").textContent = property;
                document.getElementById("read").textContent = entry[property];
                break
            }
            ++i;
        }

        document.getElementById("title2").textContent = "Strokes:";
        document.getElementById("stroke").textContent = entry["kTotalStrokes"] || "N/A";

        if (entry["kDefinition"]) {
            document.getElementById("title3").textContent = "Definition:";
            document.getElementById("def").textContent = entry["kDefinition"];
        } else {
            document.getElementById("title3").textContent = "Block:";
            document.getElementById("def").textContent = name;
        }

        let ids = ids_map[char];
        if (ids === undefined)
            ids = [char];
        else if (hideCDP)
            for (component of ids) {
                if (component.includes("&")) {
                    ids = [char];
                    break
                }
            }
        document.getElementById("ids").textContent = ids;

        document.getElementById("verbose").innerHTML = "";
        for (let [key, value] of Object.entries(entry)) {
            let cell = document.createElement("li");
            cell.innerHTML = `<i>${key}</i>: ${value}`;
            document.getElementById("verbose").appendChild(cell);
        }
    } else {
        document.getElementById("title1").textContent = "UTF-8:";
        document.getElementById("title2").textContent = "UTF-16:";
        document.getElementById("title3").textContent = "Name:";
        let utf8, utf16;
        if (code < 0x10000) {
            // BMP range
            utf16 = "\\u" + code.toString(16).toUpperCase().padStart(4, "0");

            if (code < 0x80) {
                // 1-byte UTF-8
                utf8 = "0x" + code.toString(16).toUpperCase().padStart(2, "0");
            } else if (code < 0x800) {
                // 2-byte UTF-8
                let b1 = 0xC0 | (code >> 6);
                let b2 = 0x80 | (code & 0x3F);
                utf8 = `0x${b1.toString(16).toUpperCase()} 0x${b2.toString(16).toUpperCase()}`;
            } else {
                // 3-byte UTF-8
                let b1 = 0xE0 | (code >> 12);
                let b2 = 0x80 | ((code >> 6) & 0x3F);
                let b3 = 0x80 | (code & 0x3F);
                utf8 = `0x${b1.toString(16).toUpperCase()} 0x${b2.toString(16).toUpperCase()} 0x${b3.toString(16).toUpperCase()}`;
            }
        } else {
            // Astral plane (>= 0x10000)
            let u = code - 0x10000; // 20-bit number
            let high = u >> 10;     // top 10 bits
            let low = u & 0x3FF;    // bottom 10 bits

            // Surrogate pair for UTF-16
            utf16 =
                "\\u" +
                (0xD800 | high).toString(16).toUpperCase().padStart(4, "0") +
                "\\u" +
                (0xDC00 | low).toString(16).toUpperCase().padStart(4, "0");

            // 4-byte UTF-8
            let b1 = 0xF0 | (code >> 18);
            let b2 = 0x80 | ((code >> 12) & 0x3F);
            let b3 = 0x80 | ((code >> 6) & 0x3F);
            let b4 = 0x80 | (code & 0x3F);
            utf8 = `0x${b1.toString(16).toUpperCase()} 0x${b2.toString(16).toUpperCase()} 0x${b3.toString(16).toUpperCase()} 0x${b4.toString(16).toUpperCase()}`;
        }

        document.getElementById("read").textContent = utf8;
        document.getElementById("stroke").textContent = utf16;
        document.getElementById("ids").textContent = char;
        document.getElementById("def").textContent = name || "unassigned";
    }
}

function setPage(n) {
    n = Number.parseInt(n);
    if (n !== n) return;
    if (n < 0) n = 4351;
    if (n > 4351) n = 0;
    page = n;
    document.getElementById("pageInput").value = n;

    for (let i = 0; i < 256; ++i) {
        cells[i].textContent = String.fromCodePoint(256 * n + i);
    }
}

function findChar(c) {
    let code = c.codePointAt(0);
    let n = code >> 8; // divide by 2^8
    setPage(n);
    select(code & 0xFF); // mod(code, 2^8)
}

function expand(c) {
    let ids = ids_map[c];
    if (ids === undefined)
        return [c]

    let result = [];
    for (let part of ids) {
        if (hideCDP && part.includes("&"))
            return [c];
        result.push(...expand(part));
    }
    return result;
}

function containsAll(target, query) {
    let targetCount = {};
    for (let ch of target) targetCount[ch] = (targetCount[ch] || 0) + 1;

    for (let ch of query) {
        if (!targetCount[ch]) return false;
        targetCount[ch]--;
    }
    return true;

    // for (let n of Object.values(targetCount)) {
    //     if (n >= 2) return true;
    // }
    // return false;
}

function isSimilar(target, query) {
    let targetCount = {};
    for (let ch of target) targetCount[ch] = (targetCount[ch] || 0) + 1;
    let queryCount = {};
    for (let ch of query) queryCount[ch] = (queryCount[ch] || 0) + 1;

    let keys = new Set([...Object.keys(targetCount), ...Object.keys(queryCount)]);
    let distance = 0;
    for (let key of keys) {
        const countA = targetCount[key] || 0;
        const countB = queryCount[key] || 0;
        distance += Math.abs(countA - countB);
        if (distance > 1) return false;
    }
    return true;
}

function string2list(s) {
    let i = 0;
    let result = [];
    while (i < s.length) {
        let char = s[i];
        if (char === "&") {
            end = s.indexOf(";", i + 1);
            char = s.slice(i + 1, end);
            result.push(char);
            i = end + 1;
            continue
        }
        let uni = char.charCodeAt(0);
        if (uni >= 0xD800 && uni < 0xE000) {
            char += s[++i];
        }

        result.push(char);
        i += 1
    }
    return result
}

function decompose(list) {
    if (document.getElementById("searchDepth").value === "2") return list;
    let result = [];
    for (let char of list) {
        result.push(...expand(char));
    }
    return result;
}

function searchChar(c) {
    document.getElementById("result_div").style.visibility = "visible";
    let ids = decompose(string2list(c));
    let unwanted = decompose(string2list(document.getElementById("negSearch").value));
    document.getElementById("result_components").textContent = ids;
    let results = [];
    let minUni = document.getElementById("searchStart").value.toUpperCase().replaceAll("U", "").replaceAll("+", "");
    minUni = Number("0x" + minUni);
    if (minUni !== minUni) minUni = 0; // NaN, not a hex code;
    let maxUni = document.getElementById("searchEnd").value.toUpperCase().replaceAll("U", "").replaceAll("+", "");
    maxUni = Number("0x" + maxUni);
    if (maxUni !== maxUni) maxUni = 0x110000; // NaN, not a hex code;
    let maxResults = document.getElementById("maxResults").value;
    maxResults = Number(maxResults);
    if (maxResults !== maxResults) maxResults = 10000;

    if (document.getElementById("searchDepth").value === "1") {
        for (let uni = minUni; uni < maxUni; uni++) {
            let key = String.fromCodePoint(uni);
            if (results.length >= maxResults) {
                results.push("...")
                break;
            }

            decomposition = expand(key);
            if (isSimilar(decomposition, ids)) {
                if (unwanted.length && containsAll(decomposition, unwanted)) {
                    continue;
                }
                results.push(key);
            }
        }
    } else {
        for (let [key, decomposition] of Object.entries(ids_map)) {
            // if ("𦮙𱱄".includes(key)) {
            //     console.log(key);
            //     console.log(decomposition);
            //     console.log(decompose(decomposition));
            //     console.log(ids);
            //     console.log(containsAll(decomposition, ids));
            // }

            if (results.length >= maxResults) {
                results.push("...")
                break;
            }
            let uni = key.codePointAt(0);
            if (uni >= maxUni || uni < minUni)
                continue;

            decomposition = decompose(decomposition);
            if (containsAll(decomposition, ids)) {
                if (unwanted.length && containsAll(decomposition, unwanted)) {
                    continue;
                }
                results.push(key);
            }

            // if (key.codePointAt(0) < 0x20000) continue;
            // let entry = readings_map[key];
            // if (entry && entry["kDefinition"] && !entry["kTraditionalVariant"]) results.push(key);

            // if (key[0] === "C")
            //     // results.push(key);
            //     continue;
            // else if (key.codePointAt(0) < 0x3400)
            //     results.push(key);
            // else {
            //     let components = decompose([key]);
            //     for (let part of components) {
            //         if (part.codePointAt(0) < 0x3400 && !(results.includes(part))) {
            //             if ("∟".includes(part)) {
            //                 console.log(key);
            //             }
            //             results.push(part);
            //         }
            //     }
            // }
        }
    }
    document.getElementById("results").innerHTML = "";
    if (results.length) {
        for (let result of results) {
            let cell = document.createElement("span");
            cell.innerHTML = result;
            let code = result.codePointAt(0);
            if (code !== 0x43) {
                cell.onclick = ev => {
                    findChar(result);
                };
                cell.title = "U+" + code.toString(16).toUpperCase().padStart(6, "0");
            } else {
                cell.title = "https://en.glyphwiki.org/wiki/" + result.toLowerCase();
                cell.onclick = ev => {
                    open(cell.title);
                };
            }
            cell.className = "searchResult"
            /*
            https://www.hanyuguoxue.com/zidian/bushou-26408-p15
            rgba(220, 220, 220, 0.1);
            rgba(125, 210, 255, 0.1);
            rgba(248, 215, 60, 0.1);
            rgba(237, 137, 253, 0.1);
            rgba(109, 252, 171, 0.1);
            rgba(255, 123, 156, 0.1);
            rgba(101, 255, 218, 0.1);
            rgba(55, 89, 255, 0.05);
            */
            if (code === 0x43) {
                cell.style.backgroundColor = "rgba(237, 137, 253, 0.1)";
            } else if (code < 0x10000) {
                cell.style.backgroundColor = "rgba(220, 220, 220, 0.1)";
            } else if (code < 0x30000) {
                cell.style.backgroundColor = "rgba(248, 215, 60, 0.1)";
            } else {
                cell.style.backgroundColor = "rgba(255, 123, 156, 0.1)";
            }
            document.getElementById("results").appendChild(cell);
        }
        document.getElementById("results").appendChild(document.createElement("br"));
        document.getElementById("results").appendChild(
            document.createTextNode(`Retrieved ${results.length} results.`)
        );
    } else {
        document.getElementById("results").textContent = "Nothing";
    }
}

function findUni(code) {
    code = code.toUpperCase().replaceAll("U", "").replaceAll("+", "");
    code = Number("0x" + code);
    if (code !== code) return; // NaN, not a hex code
    let n = code >> 8; // divide by 2^8
    if (n >= 4352 || n < 0) return;

    setPage(n);
    select(code & 0xFF); // mod(code, 2^8)
    document.getElementById("uni").value = `U+${code.toString(16).toUpperCase().padStart(6, "0")}`;
}


const copy = async txt => {
    try {
        await navigator.clipboard.writeText(txt);
    } catch (e) {
        // old fallback method, for HUAWEI
        try {
            const ta = document.createElement('textarea');
            ta.value = txt;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        } catch (err) {
            alert('Copy failed: ' + (err && err.message ? err.message : err));
        }
    }
}
