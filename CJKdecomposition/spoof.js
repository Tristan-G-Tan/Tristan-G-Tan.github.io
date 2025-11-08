// https://stackoverflow.com/questions/52841860/javascript-how-to-get-the-union-of-2-3-sets-without-any-library-package-functio
function union(arr1, arr2) {
    return new Set([].concat(...sets.map(set => [...set])));
}

function spoofName(s) {
    /* TODO: TRANSLATE THIS INTO JS!

    name = input()
    variants = []

    char_no = 0
    for query in name:
        variants.append(set())
        for char in ids:
            parts = ids[char][:]
            if query in parts:
                parts.pop(parts.index(query))
            else:
                continue
            variants[char_no].update(set(parts))

        char_no += 1

    total_variants = variants[0]
    for i in range(1, len(name)):
        total_variants.intersection_update(variants[i])

    print(total_variants)

    for variant in total_variants:
        for query in name:
            available = set()
            for char in ids:
                if query in ids[char] and variant in ids[char]:
                    available.add(char)
            if len(available) > 1:
                print(available, end="")
            else:
                print(available.pop(), end="")
        print()
     */
    let results = ["Test results:"];
    try {
        // let variants = [];
        // let char_no = 0;
        // for (const query of Array.from(s)) {
        //     variants.push(new Set());
        //     for (let parts of Object.values(ids_map_BMP)) {
        //         parts = [...parts];
        //         if (parts.includes(query)) {
        //             parts.pop(parts.indexOf(query));
        //         } else {
        //             continue;
        //         }
        //         variants[char_no] = variants[char_no].union(new Set(parts));
        //     }
        //     ++char_no;
        // }

        // let total_variants = variants[0];
        // for (let i = 1; i < s.length; ++i) {
        //     total_variants = total_variants.intersection(variants[i]);
        // }
        // let results = [[...total_variants].join("")];

        // for (let variant of total_variants) {
        //     let name = `${variant}：`;
        //     for (let query of Array.from(s)) {
        //         let available = new Set();
        //         for (let [char, ids] of Object.entries(ids_map_BMP)) {
        //             if (ids.includes(query) && ids.includes(variant))
        //                 available.add(char);
        //         }
        //         if (available.size > 1) {
        //             name += `{${[...available]}}`;
        //         } else {
        //             name += `${[...available]}`;
        //         }
        //     }
        //     results.push(name);
        // }


        let A = new Set([67, 69, 420]);
        results.push(Array.from(A));
        results.push([...A]);
        A.add(520);
        results.push([...A]);
        results.push(A.size);
        results.push(A.has);
        results.push(A.delete);
        results.push(A.clear);
        results.push(A.entries);
        results.push(A.keys);
        results.push(A.values);

        results.push("Maybe doesn't exist anymore:");

        results.push(A.isSubsetOf);
        results.push(A.isSupersetOf);
        results.push(A.symmetricDifference);
        results.push(A.difference);
        results.push(A.intersection);
        results.push(A.union);

        out.innerHTML = "";
        out.textContent = results.join("\n");
        document.getElementById("randomizeOutput").style.display = 'none';
    } catch (err) {
        alert(err && err.message ? err.message : err);
    }
}

function spoofText(s) {
    out.innerHTML = "";

    for (const char of Array.from(s)) {
        let available = new Set([char]);
        for (let [key, ids] of Object.entries(ids_map_BMP)) {
            if (ids.includes(char))
                available.add(key);
        }

        if (available.size > 1) {
            const select = document.createElement("select");
            for (let variant of available) {
                const choice = document.createElement("option");
                choice.innerHTML = variant;
                choice.value = variant;
                select.appendChild(choice);
            }
            out.appendChild(select);
        } else {
            out.appendChild(
                document.createTextNode(char)
            )
        }
    }
    document.getElementById("randomizeOutput").style.display = 'block';
}

let copyInput = document.getElementById("copyInput");
copyInput.onclick = async () => {
    virtual_clipboard = input.value;
    try {
        await navigator.clipboard.writeText(input.value);
        copyInput.textContent = 'copied!';
        setTimeout(() => copyInput.textContent = 'copy', 1000);
    } catch (e) {
        // fallback method
        try {
            const ta = document.createElement('textarea');
            ta.value = input.value;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            copyInput.textContent = 'copied!';
            setTimeout(() => copyInput.textContent = 'copy', 1000);
        } catch (err) {
            alert('Copy failed: ' + (err && err.message ? err.message : err));
        }
    }
};

let virtual_clipboard;
const undoStack = [];
// Update outputs from input
const input = document.getElementById('source');
const craziness = document.getElementById('craziness');
const out = document.getElementById("out");
function update() {
    const mode = document.getElementById('mode').value;
    const text = input.value || '';
    switch (mode) {
        case "name":
            spoofName(text);
            break;
        case "random":
            spoofText(text);
            break;
    }
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    out.style.height = 'auto';
    out.style.height = out.scrollHeight + 'px';
}
// craziness.oninput = update;
input.oninput = update;

function selectAll() {
    input.focus();
    input.select();
}

function undo() {
    if (undoStack.length > 1) {
        undoStack.pop(); // remove current state
        input.value = undoStack.pop(); // revert to previous
        input.dispatchEvent(new Event('input')); // trigger any updates
    }
}

const copy = async () => {
    let text;
    if (out.children) {
        text = "";
        for (let select of out.children) {
            text += select.value;
        }
    } else {
        text = out.textContent;
    }
    virtual_clipboard = text;
    try {
        await navigator.clipboard.writeText(text);
        copyOutput.textContent = 'copied!';
        setTimeout(() => copyOutput.textContent = 'copy to clipboard', 1000);
    } catch (e) {
        // fallback method
        try {
            const ta = document.createElement('textarea');
            ta.value = out.text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            copyOutput.textContent = 'copied!';
            setTimeout(() => copyOutput.textContent = 'copy to clipboard', 1000);
        } catch (err) {
            alert('Copy failed: ' + (err && err.message ? err.message : err));
        }
    }
};

const paste = async () => {
    let text;
    try {
        text = await navigator.clipboard.readText(); // read clipboard
    } catch (err) {
        // alert('Clipboard access denied. Try granting permission or pasting manually.');
        // text = "";
        // Note: HUAWEI browser ALWAYS denies pasting permission. Use our virtual_clipboard variable instead.
        text = virtual_clipboard || "";
    }
    input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
    input.dispatchEvent(new Event('input')); // update height etc.
};

function randomize() {
    for (let select of out.children) {
        select.value = select.options[Math.trunc(Math.random() * select.options.length)].value;
    }
}
