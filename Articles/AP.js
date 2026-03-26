const alphabet = "ABCDE";
const showFeatures = true;
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

function handle1response(txt) {
    let data;
    try { // TODO: figure out which files to parse. activity for pr-submission, but what about post-submission? init or items or questionresponses? there are duplicate questions
        data = JSON.parse(txt).data; // error 1: not json
        if (data[0]?.data?._internal?.questions_json) {
            data = Object.values(data[0].data._internal.questions_json); // init, not activity not items
            VALUABLE.push(data);
        } else {
            if (data.apiActivity) {
                document.title = `SG ${data.request.name}`; // if HAR is taken after completion, the assignment name just says "Questions Preview"
                data = data.apiActivity; // if the HAR is loaded before question completion, it is always an activity link and has apiActivity
            }
            if (data.items) {
                data = data.items; // error 2: not a response about questions
            }
            data[0].questions[0]; // error 3: error response (data is iterable, but each q is a simple object {error: 10005, id: "something"})
        }
    } catch (e) {
        return; // these errors don't matter
    }

    try {
        for (let q of data) {
            let li = document.createElement("li");
            li.className = "question";

            if (showFeatures && q.features) // usually a sharedpassage if there are features
                for (let f of q.features) {
                    let d = document.createElement("div");
                    d.innerHTML = f.content;
                    li.appendChild(d);
                }

            let subq = q.questions ? q.questions[0] : q; // TODO: awkward. Only added to parse init response
            if (subq.type === "mcq") {
                let stimulus = document.createElement("div");
                stimulus.innerHTML = subq.stimulus;
                li.appendChild(stimulus);

                let validation_map = {};
                let correctIndex = 0;

                // options
                let options = document.createElement("ol")
                options.style.listStyleType = "upper-alpha";
                options.style.marginBottom = "4em";
                let index = 0;
                for (let option of subq.options) {
                    let letter = document.createElement("li");
                    letter.innerHTML = option.label;
                    letter.title = option.value;
                    if (option.value === subq.validation.valid_response.value[0]) {
                        correctIndex = index;
                        answerKey.push(index);
                    }
                    validation_map[option.value] = alphabet[index++];
                    options.appendChild(letter);
                }
                li.appendChild(options);

                // correct answer
                let correct = document.createElement("div");
                let key = subq.validation.valid_response.value[0]; // TODO: MANY VALUES?
                correct.innerHTML = `Correct answer: ${key} (option ${validation_map[key]})`;
                li.appendChild(correct);

                // rationales
                let answer = subq.metadata;
                answer = answer.distractor_rationale_response_level || answer.custom_distractor_rationale_response_level;
                if (answer) {
                    let answers = document.createElement("ol");
                    answers.style.listStyleType = "upper-alpha";
                    let index = 0;
                    for (let a of answer) {
                        let letter = document.createElement("li");
                        if (correctIndex === index++) {
                            letter.className = "correct";
                        } else {
                            letter.className = "incorrect";
                        }
                        letter.innerHTML = a;
                        answers.append(letter);
                    }
                    li.appendChild(answers);
                }
            } else { // TODO: FIGURE OUT HOW TO ACCESS FRQ RUBRIC
                answerKey.push(-1);

                for (subq of q.questions) {
                    let stimulus = document.createElement("div");
                    stimulus.innerHTML = subq.stimulus;
                    li.appendChild(stimulus);
                }
            }

            results.appendChild(li);
        }

        return 0xBEEF;
    } catch (e) {
        console.log(e);
        return 0xDEADBEEF;
    }
}

function autocompleter() {
    document.getElementById("key").textContent = answerKey.map((correct, index) => `${index + 1}. ${correct < 0 ? "Free-response" : alphabet[correct]}`).join("\n");
    document.getElementById("code").textContent = `let i = 0;
let questions = document.querySelector(".slides-control").children;
let answerKey = [${answerKey}];
function doOneMore() {
    if (answerKey[i] < 0) {
        console.log(\`Question \${++i} is free-response.\`);
    } else {
        const choices = questions[i].querySelectorAll("input");
        choices[answerKey[i]].click();
        console.log(\`Completed question \${++i}.\`);
    }
  document.querySelector("button[data-test-id=next-button]").click();
  if (i < questions.length)
    setTimeout(doOneMore, 900);
  else
    console.log("NICE");
}
doOneMore();`;
}

let VALUABLE;
let err;
let answerKey;
let uploadedText;

function upload(f) {
    let reader = new FileReader();

    let display_file = (e) => {
        uploadedText = e.target.result;
    };

    let on_reader_load = fl => {
        return display_file; // a function
    };

    // Closure to capture the file information.
    reader.onload = on_reader_load(f);
    reader.readAsText(f);
}

function parse() {
    let response;
    err = [];
    VALUABLE = [];
    answerKey = [];
    results.innerHTML = '';
    switch (parseMode.value) {
        case "video":
            response = JSON.parse(uploadedText);
            for (let entry of response.log.entries) {
                let url = entry.request.url;
                if (url.endsWith(".ts")) {
                    let li = document.createElement("li");
                    let link = document.createElement("a");
                    link.href = url.slice(0, 89) + "p4";
                    link.innerHTML = "link";
                    li.appendChild(link);
                    results.appendChild(li);
                }
            }
            break;
        case "activity":
            response = prompt("Paste in the response from the learnosity activity:");
            handle1response(response);
            autocompleter();
            break;
        case "HAR":
            response = JSON.parse(uploadedText);
            for (let entry of response.log.entries) {
                let content = entry.response.content;
                if (content.size > 0) {
                    let parsed = handle1response(content.text);
                    if (parsed === 0xDEADBEEF) {
                        err.push(entry);
                    } else if (parsed === 0xBEEF) {
                        VALUABLE.push(entry);
                    }
                }
            }

            autocompleter();
            break;
    }
}
