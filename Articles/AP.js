const alphabet = "ABCDE";
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

let darkMode = false;
let show = {
    mcq: {
        atAll: true,
        stimulus: true,
        correct: true,
        rationale: true,
        correctHighlight: true,  // TODO: lumi SAT
        rationaleHighlight: true
    },

    frq: {
        atAll: true,
        stimulus: true,
        sg: true
    },

    features: true
}
let assignmentName;

function handle1response(txt) {
    let data;
    try { // TODO:  pre-submission: activity; post-submission: activity?&a=get&c (best for lang but takes a while to show up) or init (loads all questions but no features/sharedpassages; for instance: "The position as a function of time for two objects moving along a straight line is shown in the graph." does not show up in AP Physics 1 1.1 init), or activity+items or questionresponses (but there are duplicate questions). FOR SCORING: items (has scoring guide) prevails over activity (only questions, no scoring guides)
        /**
         * pre-submission: activity with visible headers ?&a=get&c
         * post-submission: click into any of the questions THEN activity with visible headeres ?&a=get&c
         * next best: init (no duplicates but missing features)
         * then bare activity + items
         * then questionresponses
         */
        data = JSON.parse(txt).data; // error 1: not json
        if (data[0]?.data?._internal?.questions_json) {
            data = Object.values(data[0].data._internal.questions_json); // init, not activity not items
            // VALUABLE.push(data);
        } else {
            if (data.apiActivity) {
                assignmentName = data.request.name;
                document.title = `SG ${assignmentName}`; // if HAR is taken after completion, the assignment name just says "Questions Preview"
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
                console.log("question")
            let subq = q.questions ? q.questions[0] : q; // TODO: awkward. Only added to parse init response
            if (subq.type === "mcq") {
                if (!show.mcq.atAll) {
                    continue;
                }
            } else { // NOT "frq"; could be "longtextV2"
                if (!show.frq.atAll) {
                    continue;
                }
            }

            let li = document.createElement("li");
            li.className = "question";

            if (show.features && q.features) // usually a sharedpassage if there are features
                for (let f of q.features) {
                    let d = document.createElement("div");
                    d.innerHTML = f.content;
                    li.appendChild(d);
                }

            if (subq.type === "mcq") {
                let key = subq.validation.valid_response.value[0];  // TODO: MANY VALUES?
                if (show.mcq.stimulus) {
                    let stimulus = document.createElement("div");
                    stimulus.innerHTML = subq.stimulus;
                    if (assignmentName) {
                        stimulus.title = assignmentName;
                    }
                    li.appendChild(stimulus);
                }

                let validation_map = {};
                let correctIndex = -1;

                let options;
                if (show.mcq.stimulus) {
                    options = document.createElement("ol")
                    options.style.listStyleType = "upper-alpha";
                    options.style.marginBottom = "4em";
                }
                let index = 0;
                for (let option of subq.options) {
                    validation_map[option.value] = alphabet[index];
                    if (option.value === key) {
                        correctIndex = index;
                        answerKey.push(index);
                    }

                    if (show.mcq.stimulus) {
                        let letter = document.createElement("li");
                        letter.innerHTML = option.label;
                        letter.title = option.value;
                        if (show.mcq.correctHighlight && correctIndex == index)
                            letter.className = "correct";
                        options.appendChild(letter);
                    }

                    ++index;
                }
                if (show.mcq.stimulus) {
                    li.appendChild(options);
                }

                if (show.mcq.correct) {
                    let correct = document.createElement("div");
                    correct.innerHTML = `Correct answer: ${key} (option ${validation_map[key]})`;
                    correct.className = "heading"
                    li.appendChild(correct);
                }

                if (show.mcq.rationale) {
                    let answer = subq.metadata;
                    answer = answer.distractor_rationale_response_level || answer.custom_distractor_rationale_response_level;
                    if (answer) {
                        let answers = document.createElement("ol");
                        answers.style.listStyleType = "upper-alpha";
                        let index = 0;
                        for (let a of answer) {
                            let letter = document.createElement("li");
                            if (show.mcq.rationaleHighlight) {
                                if (correctIndex === index) {
                                    letter.className = "correct";
                                } else {
                                    letter.className = "incorrect";
                                }
                            }
                            letter.innerHTML = a;
                            answers.append(letter);
                            ++index;
                        }
                        li.appendChild(answers);
                    }
                }
            } else if (show.frq.stimulus) { // TODO: FIGURE OUT HOW TO ACCESS FRQ RUBRIC
                answerKey.push(-1);

                for (subq of q.questions) {
                    let stimulus = document.createElement("div");
                    stimulus.innerHTML = subq.stimulus;
                    if (assignmentName) {
                        stimulus.title = assignmentName;
                    }
                    li.appendChild(stimulus);
                }
            }

            results.appendChild(li);
        }

        return 0xBEEF;
    } catch (e) {
        console.error(e);
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

// https://mokaoai.com/dashboard
// TODO: COMPLETE BEFORE 15 July 2026
// EXPIRED in 3 months.
function handleMokao(txt) {
    let data = JSON.parse(txt).data;
    assignmentName = data.examName;
    document.title = assignmentName;

    if (show.mcq.atAll)
        for (let q of data.mcqAnswerInfoJsonList) {
            let li = document.createElement("li");
            li.className = "question";
            let correctIndex = q.correctAnswer[0];
            answerKey.push(correctIndex);

            if (show.mcq.stimulus) {
                let stimulus = document.createElement("div");
                stimulus.innerHTML = q.questionContent;
                li.appendChild(stimulus);

                let index = 0;
                for (let option of q.options) {
                    let letter = document.createElement("div");
                    letter.innerHTML = option;
                    if (show.mcq.correctHighlight && correctIndex == index)
                        letter.className = "correct";

                    li.appendChild(letter);
                    ++index;
                }
            }

            if (show.mcq.correct) {
                let correct = document.createElement("div");
                correct.innerHTML = `Correct answer: ${alphabet[correctIndex]}`;
                correct.className = "heading"
                li.appendChild(correct);
            }

            // rationales
            // TODO: figure out aiAnalysis (unparsed JSON) vs aiAnalysisVO (parsed JSON). PE: both appear, progress check: neither appear. aiAnalysisEn, aiAnalysisEnVO never appear.
            if (show.mcq.rationale && q.aiAnalysisVO) {
                // JSON.parse(q.aiAnalysis)
                let explanation = document.createElement("div");
                explanation.innerHTML = q.aiAnalysisVO.analysis + q.aiAnalysisVO.correct_answer;
                li.appendChild(explanation);
            }

            results.appendChild(li);
        }

    // TODO: figure out diff between parsed frqAnswerJson (AP模考) and frqAnswerJsonList (both AP练习 and AP模考). there seems to be no diff.
    // if (data.frqAnswerJson) {
    //     data = JSON.parse(data.frqAnswerJson);
    // } else {
    //     data = data.frqAnswerJsonList;
    // }
    if (show.frq.atAll)
        for (let q of data.frqAnswerJsonList) {
            answerKey.push(-1);
            let li = document.createElement("li");
            li.className = "question";

            if (show.frq.stimulus) {
                let stimulus = document.createElement("div");
                stimulus.innerHTML = JSON.parse(q.questionContent).join("");
                stimulus.style.marginBottom = "4em";
                li.appendChild(stimulus);
            }

            if (show.frq.sg) {
                for (let part of JSON.parse(q.analysisAndScoringGuidelinesJson)) {
                    let partHeading = document.createElement("div");
                    partHeading.innerHTML = part.title;
                    partHeading.className = "heading";
                    li.appendChild(partHeading);

                    let d = document.createElement("div");
                    let criteria = part.categoryList;
                    // part.content = "Select a point value to view scoring criteria, solutions, and/or examples and to score the response."
                    d.innerHTML = part.content + criteria[criteria.length - 1].description;
                    li.appendChild(d);
                }
                results.appendChild(li);
            }
        }
}

// https://mock.lumiclass.com/dashboard
// EXPIRED in 7 days.
function handleLumi(txt) {
    let data = JSON.parse(txt).data;
    data = data.question_details || data;
    results.innerHTML = '';

    for (let q of data) {
        if (q.type === "mcq") {
            if (!show.mcq.atAll) {
                continue;
            }
        } else { // NOT "frq"; could be "longtextV2"
            if (!show.frq.atAll) {
                continue;
            }
        }

        let li = document.createElement("li");
        li.className = "question";

        if (q.question_type === "MCQ") {
            let correct = document.createElement("div");
            let key = q.correct_answer.charCodeAt(0) - 65;
            answerKey.push(key);

            if (show.mcq.stimulus) {
                let stimulus = document.createElement("div");
                stimulus.innerHTML = parseImagesAndLatex(q.question_content);
                li.appendChild(stimulus);

                let options = document.createElement("ol");
                options.style.listStyleType = "upper-alpha";
                options.style.marginBottom = "4em";

                let index = 0;
                for (let option of Object.values(q.options_json)) {
                    let letter = document.createElement("li");
                    letter.innerHTML = parseImagesAndLatex(option);

                    if (show.mcq.correctHighlight && key == index)
                        letter.className = "correct";

                    options.appendChild(letter);
                    ++index;
                }
                li.appendChild(options);
            }

            if (show.mcq.correct) {
                correct.innerHTML = `Correct answer: ${q.correct_answer}`;
                correct.className = "heading";
                li.appendChild(correct);
            }

            if (show.mcq.rationale) {
                let explanation = document.createElement("div");
                explanation.innerHTML = parseImagesAndLatex(q.explanation);
                li.appendChild(explanation);
            }
        } else {
            if (show.frq.stimulus) {
                let stimulus = document.createElement("div");
                stimulus.innerHTML = parseImagesAndLatex(q.question_content);
                li.appendChild(stimulus);
            }

            if (show.frq.sg) {
                // correct answer
                if (q.correct_answer.length > 4) {
                    let correctHeading = document.createElement("div");
                    correctHeading.innerHTML = `Correct answer:`;
                    correctHeading.className = "heading";
                    li.appendChild(correctHeading);
                    let correct = document.createElement("div");
                    correct.innerHTML = parseImagesAndLatex(q.correct_answer);
                    li.appendChild(correct);
                }

                // explanation
                if (q.explanation.length > 4) {
                    let expHeading = document.createElement("div");
                    expHeading.innerHTML = `Explanation:`;
                    expHeading.className = "heading";
                    li.appendChild(expHeading);
                    let explanation = document.createElement("div");
                    explanation.innerHTML = parseImagesAndLatex(q.explanation);
                    li.appendChild(explanation);
                }

                // rubric
                let rubric = document.createElement("div");
                rubric.innerHTML = parseImagesAndLatex(`Rubric: ${q.rubric}`);
                li.appendChild(rubric);
            }
        }

        results.appendChild(li);
    }

    // IMPORTANT: Wait for MathJax to be ready and then process
    // if (window.MathJax) {
    //     // Small delay to ensure DOM is updated
    //     setTimeout(() => {
    //         window.MathJax.typesetPromise([results])
    //             .then(() => console.log('MathJax rendering complete'))
    //             .catch(err => console.log('MathJax error:', err));
    //     }, 100);
    // } else {
    //     console.error('MathJax not loaded yet!');
    // }
    MathJax.typesetPromise([results])
}

// Helper function to replace image syntax with img tags for lumi
function parseImagesAndLatex(text) {
    if (!text) return '';

    // First, protect LaTeX from being broken by HTML replacement
    // Temporarily replace LaTeX delimiters with placeholders
    // let latexBlocks = [];
    // let protectedText = text.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
    //     latexBlocks.push(match);
    //     return `%%LATEX_BLOCK_${latexBlocks.length - 1}%%`;
    // });

    // protectedText = protectedText.replace(/\$([^\$]+?)\$/g, (match) => {
    //     latexBlocks.push(match);
    //     return `%%LATEX_INLINE_${latexBlocks.length - 1}%%`;
    // });

    // Replace image syntax: ![图片](url) or any alt text
    let withImages = text.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (match, altText, imageUrl) => {
            // Validate and sanitize the URL
            const safeUrl = imageUrl.replace(/[<>'"]/g, '');
            return `<img src="${safeUrl}" alt="${altText || '图片' || 'Image'}" class="har-image" 
                         onerror="this.style.display='none'; console.warn('Failed to load: ${safeUrl}')" 
                         loading="lazy" />`;
        }
    );

    // Restore LaTeX blocks
    // withImages = withImages.replace(/%%LATEX_BLOCK_(\d+)%%/g, (match, index) => {
    //     return latexBlocks[parseInt(index)];
    // });

    // withImages = withImages.replace(/%%LATEX_INLINE_(\d+)%%/g, (match, index) => {
    //     return latexBlocks[parseInt(index)];
    // });

    return withImages;
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

async function parse() {
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
            if (uploadedText)
                response = uploadedText;
            else
                response = uploadedText = prompt("Paste in the response from the learnosity activity:");
            handle1response(response);
            autocompleter();
            break;
        case "HAR":
            response = JSON.parse(uploadedText);
            for (let entry of response.log.entries) {
                let content = entry.response.content;
                if (content.size > 0) {
                    let text = content.text;
                    if (content.encoding === "base64") {
                        let response = await fetch(`data:application/octet-stream;base64,${text}`);
                        text = await response.text();
                    }

                    let parsed = handle1response(text);
                    if (parsed === 0xDEADBEEF) {
                        err.push(entry);
                    } else if (parsed === 0xBEEF) {
                        VALUABLE.push(entry);
                    }
                }
            }

            autocompleter();
            break;
        case "mokaoaiAP": // filter in the network tab for getApPracticeReportInfo (progress checks) or getexamreport (practice exams)
            response = JSON.parse(uploadedText);
            for (let entry of response.log.entries) {
                let content = entry.response.content;
                if (content.size > 0) {
                    let parsed = handleMokao(content.text);
                    if (parsed === 0xDEADBEEF) {
                        err.push(entry);
                    } else if (parsed === 0xBEEF) {
                        VALUABLE.push(entry);
                    }
                }
            }
            autocompleter();
            break;
        case "mokaoaiSAT": // filter in the network tab for getReportInfo
            response = JSON.parse(uploadedText);
            // let questionTestingCentres = new Set();
            for (let entry of response.log.entries) {
                if (entry.request.url.includes("getReportInfo")) {
                    let data = JSON.parse(entry.response.content.text).data;
                    assignmentName = data.examName;
                    document.title = assignmentName;
                    for (let section of data.sectionModuleList) {
                        // let sectionLi = document.createElement("li");
                        // let sectionOl = document.createElement("ol");
                        sectionOl = results;

                        for (let question of section.questionList) {
                            let li = document.createElement("li");
                            li.insertAdjacentText("beforeend", `questionTestingCentre: ${question.questionTestingCentre}`);
                            // questionTestingCentres.add(question.questionTestingCentre)

                            if (show.mcq.stimulus) {
                                li.insertAdjacentHTML("beforeend", question.questionStem);
                                li.insertAdjacentHTML("beforeend", question.questionContent);
                                if (question.questionOption) {
                                    if (show.mcq.correctHighlight)
                                        question.questionOption[question.correctQuestionAnswerStr.charCodeAt(0) - 65] = question.questionOption[question.correctQuestionAnswerStr.charCodeAt(0) - 65].replace('<p>', '<p class="correct">')
                                    li.insertAdjacentHTML("beforeend", question.questionOption);
                                }
                            }
                            if (show.mcq.correct) {
                                li.insertAdjacentText("beforeend", `Correct answer: ${question.correctQuestionAnswerStr}`);
                            }
                            if (show.mcq.rationale) {
                                if (question.questionAnalysis) {
                                    li.insertAdjacentHTML("beforeend", question.questionAnalysis);
                                }
                                if (question.aiAnalysisEn) {
                                    li.insertAdjacentText("beforeend", `\n\naiAnalysisEn: ${question.aiAnalysisEn.analysis} correct_answer:`);
                                    li.insertAdjacentHTML("beforeend", question.aiAnalysisEn.correct_answer);
                                }
                                if (question.aiAnalysis) {
                                    li.insertAdjacentText("beforeend", `\n\naiAnalysis: ${question.aiAnalysis.analysis} correct_answer:`);
                                    li.insertAdjacentHTML("beforeend", question.aiAnalysis.correct_answer);
                                }
                            }
                            sectionOl.appendChild(li);
                        }

                        // sectionLi.appendChild(sectionOl);
                        // results.appendChild(sectionLi);
                    }
                }
            }
            // console.log(questionTestingCentres);
            autocompleter();
            break;
        case "lumiAP":
            response = JSON.parse(uploadedText);
            for (let entry of response.log.entries) {
                let content = entry.response.content;
                if (content.size > 0) {
                    let parsed = handleLumi(content.text);
                    if (parsed === 0xDEADBEEF) {
                        err.push(entry);
                    } else if (parsed === 0xBEEF) {
                        VALUABLE.push(entry);
                    }
                }
            }
            // autocompleterLumi();
            break;
        case "lumiSAT": // filter in the network tab for /questions|report/
            response = JSON.parse(uploadedText);

            sectionModuleList = [];
            for (let entry of response.log.entries) {
                if (entry.request.url.endsWith("questions")) {
                    let section = JSON.parse(entry.response.content.text);
                    let sectionLi = document.createElement("li");
                    let sectionOl = document.createElement("ol");
                    sectionModuleList.push(sectionOl);

                    for (let question of section.questions) {
                        let li = document.createElement("li");

                        if (show.mcq.stimulus) {
                            let stimulus = document.createElement("div");
                            stimulus.innerHTML = parseImagesAndLatex(question.content);
                            li.appendChild(stimulus);

                            if (question.options) {
                                let options = document.createElement("ol");
                                options.style.listStyleType = "upper-alpha";
                                options.style.marginBottom = "4em";
                                for (let answer of "ABCD") {
                                    let letter = document.createElement("li");
                                    letter.innerHTML = parseImagesAndLatex(question.options[answer]);
                                    options.appendChild(letter);
                                }
                                li.appendChild(options);
                            }
                        }

                        sectionOl.appendChild(li);
                        sectionLi.appendChild(sectionOl);
                        results.appendChild(sectionLi);
                    }

                } else if (entry.request.url.endsWith("report")) {
                    let key = JSON.parse(entry.response.content.text);
                    for (let question of key.questions) {
                        let sectionIndex = 3;
                        if (question.section_name[0] === "R") {
                            if (question.module_name === "Module 1")
                                sectionIndex = 0;
                            else
                                sectionIndex = 1;
                        } else {
                            if (question.module_name === "Module 1")
                                sectionIndex = 2;
                        }
                        let li = sectionModuleList[sectionIndex].children[question.order - 1];
                        li.appendChild(document.createTextNode(`Correct answer: ${question.correct_answer}; Difficulty: ${question.difficulty}; Topic: ${question.topic}—${question.subtopic}.`));

                        let explanation = document.createElement("div");
                        explanation.innerHTML = parseImagesAndLatex(question.explanation);
                        li.appendChild(explanation);
                    }
                }
            }
            MathJax.typesetPromise([results]);
            // autocompleterLumi();
            break;
    }


    /* TODO: FIRST PHUB THEN LOAD BREAKS THE THEME; also: random rationales have the inline declaration color:black; not sure if this is the best fix for this */
    // for (let black of document.querySelectorAll('span[style*="color:black"], span[style*="color:rgb(0,0,0)"]')) {
    for (let black of results.querySelectorAll('*')) {
        black.style.removeProperty("color");
        black.style.removeProperty("background-color");
    }

    if (darkMode) {
        for (let e of document.querySelectorAll("pre, code, a, img, #results, .hub, .heading")) {
            e.classList.add("dark");
        }
    }
}


function togglePhub() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark");
    for (let e of document.querySelectorAll("pre, code, a, img, #results, .hub, .heading")) {
        e.classList.toggle("dark");
    }
}

function toggleVisibility(e) {
}

onkeydown = ev => {
    // console.log(ev.key);

    switch (ev.key) {
        case "P":
            togglePhub();
            break;
        case "O":
            websiteLink.style.display = (websiteLink.style.display === "none") ? "inline" : "none";
            menu.style.display = (menu.style.display === "none") ? "block" : "none";
            break;
        case "H":
            parseMode.value = "HAR";
            break;
        case "A":
            parseMode.value = "activity";
            break;
        case "V":
            parseMode.value = "video";
            break;
        case "M":
            parseMode.value = "mokaoaiAP";
            break;
        case "L":
            parseMode.value = "lumiAP";
            break;
        case "Enter":
            if (ev.shiftKey)
                parse();
            break;
    }
}
