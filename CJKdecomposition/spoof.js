function transformString(s) {
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
    return s.repeat(2);
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
    const text = input.value || '';
    undoStack.push(text);
    out.value = transformString(text);
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
    virtual_clipboard = out.value;
    try {
        await navigator.clipboard.writeText(out.value);
        copyOutput.textContent = 'copied!';
        setTimeout(() => copyOutput.textContent = 'copy to clipboard', 1000);
    } catch (e) {
        // fallback method
        try {
            const ta = document.createElement('textarea');
            ta.value = out.value;
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