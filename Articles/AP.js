
// const mode = "activity";
let mode = "HAR";
let VALUABLE;
let err;

function upload(f) {
    let reader = new FileReader();

    let display_file = (e) => {
        let response = JSON.parse(e.target.result);
        err = [];
        VALUABLE = [];
        let i = 0;
        switch (mode) {
            case "activity": // TODO: THIS IS STILL ACCEPTING JS NOT JSON
                for (let q of response.data.apiActivity.items) {
                    ++i;
                    for (let subq of q.questions) {
                        let q = document.createElement("div");
                        q.innerHTML = [i + "", ". ", subq.stimulus].concat(subq.options.map(option => option.label)).join("");
                        document.body.appendChild(q);

                        let a = document.createElement("div");
                        a.innerHTML = subq.metadata.distractor_rationale_response_level.join("");
                        document.body.appendChild(a);
                    }
                    document.body.appendChild(document.createElement("br"));
                }
                break;
            case "HAR":
                results.innerHTML = '';
                for (let entry of response.log.entries) {
                    let content = entry.response.content;
                    if (content.size > 0) {
                        let txt = content.text;
                        try {
                            if (txt.includes("Incorrect. ")) {
                                // VALUABLE.push(entry);
                                let data = JSON.parse(txt).data;
                                if (data.apiActivity)
                                    data = data.apiActivity;
                                if (data.items)
                                    data = data.items;
                                for (let q of data) {
                                    // ++i;
                                    // for (let subq of q.questions) {
                                    //     let q = document.createElement("div");
                                    //     q.innerHTML = [i + "", ". ", subq.stimulus].concat(subq.options.map(option => option.label)).join("");
                                    //     document.body.appendChild(q);

                                    //     try {
                                    //         let a = document.createElement("div");
                                    //         let answer = subq.metadata;
                                    //         answer = answer.distractor_rationale_response_level || answer.custom_distractor_rationale_response_level;
                                    //         a.innerHTML = answer.join("");
                                    //         document.body.appendChild(a);
                                    //     } catch {
                                    //         err.push(subq)
                                    //         // err.push(entry);
                                    //     }
                                    // }
                                    // document.body.appendChild(document.createElement("br"));


                                    for (let subq of q.questions) {
                                        // err.push(subq);
                                        let li = document.createElement("li");
                                        li.className = "question";

                                        let stimulus = document.createElement("div");
                                        stimulus.innerHTML = subq.stimulus;
                                        li.appendChild(stimulus);

                                        let options = document.createElement("ol")
                                        options.style.listStyleType = "upper-alpha";
                                        options.style.marginBottom = "4em";
                                        for (let option of subq.options) {
                                            let letter = document.createElement("li");
                                            letter.innerHTML = option.label;
                                            options.appendChild(letter);
                                        }
                                        li.appendChild(options);

                                        let correct = document.createElement("div");
                                        let key = subq.validation.valid_response.value[0]; // TODO: MANY VALUES?
                                        correct.innerHTML = `Correct answer: ${key} (option ${String.fromCharCode(key.charCodeAt(1) - 0x31 + 0x41)})`;
                                        li.appendChild(correct);

                                        let answers = document.createElement("ol");
                                        answers.style.listStyleType = "upper-alpha";
                                        let answer = subq.metadata;
                                        answer = answer.distractor_rationale_response_level || answer.custom_distractor_rationale_response_level;
                                        for (let a of answer) {
                                            let letter = document.createElement("li");
                                            if (a.includes("Correct. ")) {
                                                letter.className = "correct";
                                            } else {
                                                letter.className = "incorrect";
                                            }
                                            letter.innerHTML = a;
                                            answers.append(letter);
                                        }
                                        li.appendChild(answers);

                                        results.appendChild(li);
                                    }
                                }

                                VALUABLE.push(entry);
                            }
                        } catch (e) {
                            err.push(entry);
                            console.log(e);
                        }
                    }
                }
                break;
        }
    };

    let on_reader_load = (fl) => {
        return display_file; // a function
    };

    // Closure to capture the file information.
    reader.onload = on_reader_load(f);
    reader.readAsText(f);
}