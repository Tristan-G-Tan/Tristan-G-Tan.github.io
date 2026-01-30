let inactive = new Set([
  "f1bfbed3",
  "87aa7bab",
  "d748c3fd",
  "6b8a7c74",
  "a15b3219",
  "ed314256",
  "22e4d633",
  "0d7f4966",
  "602b47c7",
  "068f939b",
  "ce4448b7",
  "0147b080",
  "040583a5",
  "7a1877be",
  "11a9f635",
  "2312021b",
  "e677fa6c",
  "4b3d6062",
  "66c47028",
  "58e9e497",
  "1a2b29c9",
  "04cbeca3",
  "d5b9ed0d",
  "2fdfe002",
  "6f626ae5",
  "ccb1ab92",
  "be19faa1",
  "85439572",
  "356ad646",
  "c83e0b43",
  "a9040290",
  "01989d77",
  "8a8236e1",
  "dd1757fd",
  "b38935ab",
  "8a584241",
  "4603d1f7",
  "6df33868",
  "e185a21f",
  "20000f5f",
  "67b59a67",
  "c228bd45",
  "7edfb2c5",
  "0c622cfb",
  "5fb6ed10",
  "db876fd5",
  "09f9edb0",
  "6bc0e595",
  "0fc0a773",
  "c538954d",
  "f8244f7c",
  "9debe79a",
  "f9bd4e61",
  "96802cc0",
  "35b46381",
  "4ba0695d",
  "e7dc27dc",
  "30c3aa98",
  "aaddd60f",
  "39e440e4",
  "29cde5fa",
  "c4d43991",
  "4042ff0b",
  "d0fbf1ae",
  "08395130",
  "14189fbb",
  "dc3ea63e",
  "156ff681",
  "40578580",
  "a9ac31e4",
  "e946a32e",
  "dc87adf4",
  "53c6c179",
  "55688b3c",
  "7c21b4b5",
  "df91532e",
  "81af81d4",
  "dbbbc5dd",
  "6409016a",
  "e1546fd6",
  "8a3ecac6",
  "4025e00c",
  "2592e0de",
  "44da37eb",
  "5432d1de",
  "3882ddf6",
  "626a1308",
  "d74b9bc6",
  "a44bbd6b",
  "a2b0fc3b",
  "89961e26",
  "2584bcfb",
  "d5da74be",
  "628e1305",
  "3f236877",
  "25290c8d",
  "4d3e3c52",
  "d1b8a9ad",
  "95dbdf51",
  "7ae8065c",
  "25b70215",
  "cbecb873",
  "63e7799d",
  "0dba14e6",
  "99fdf71c",
  "ff18829b",
  "e80ba20d",
  "e2829dd7",
  "08b28c1a",
  "4a07be59",
  "a13c1c66",
  "350e2336",
  "f8befe75",
  "f942646f",
  "3f05e40f",
  "de0a5b4e",
  "16025337",
  "659c6c1d",
  "df37c087",
  "5d6ab069",
  "6675c5c3",
  "0dccbf17",
  "25893fc7",
  "2df730d0",
  "61228830",
  "34c2e387",
  "af9e3240",
  "787729be",
  "e441da80",
  "1d08c7ee",
  "adbcbce0",
  "08ff903e",
  "47f2cddd",
  "7812801f",
  "dd349efc",
  "e1ee5f5c",
  "5eda42a3",
  "2edd7ffe",
  "2c06139b",
  "26ee16ba",
  "31ad8024",
  "1db1a9a6",
  "0b696a0c",
  "37a49687",
  "0113152f",
  "f38b40ac",
  "89f71526",
  "23a7038f",
  "7a895def",
  "b2e54b50",
  "cca6fae9",
  "73c091d2",
  "145da981",
  "ede3f942",
  "7921b86b",
  "46e45728",
  "95146ebb",
  "9077be25",
  "f27559d4",
  "d1539546",
  "faaf484f",
  "7fdba7ad",
  "485962a6",
  "d2e0cba5",
  "d8b78a2b",
  "7254379e",
  "23e2421a",
  "9abc3ba5",
  "94c726fb",
  "98fd50f2",
  "5ff1ba73",
  "0014477f",
  "5b4829d2",
  "409058ee",
  "7c9a65bb",
  "5c7e0d62",
  "299c5303",
  "378c66d5",
  "dc5edbf6",
  "d8758c3b",
  "22b3da87",
  "35ec767c",
  "0e3b4967",
  "24c1b7e4",
  "ee41d7e0",
  "fbb84fb0",
  "73d457b6",
  "56f477fb",
  "cac82f9b",
  "7afdcca2",
  "b69d821d",
  "923ebfe3",
  "09775cbf",
  "e503ae04",
  "87023f34",
  "cae97f58",
  "8391a002",
  "65502c46",
  "ab94d40a",
  "a842db60",
  "c384987b",
  "1e85caa9",
  "124fdcd7",
  "03701ef3",
  "359902ae",
  "22a41819",
  "f0be91b2",
  "5e57efec",
  "c966ad55",
  "757077f9",
  "eb89dcc8",
  "97e5bf55",
  "d4a8f7cb",
  "84ece3f6",
  "d4732483",
  "e386a11d",
  "6c086e70",
  "236fee8e",
  "02fd3da7",
  "0f040c50",
  "9cdcd902",
  "e459076b",
  "105ea6de",
  "5f56fdec",
  "2903a041",
  "066a3295",
  "c4737d6a",
  "5a97d9cd",
  "a87c3925",
  "b0f7541b",
  "8d802289",
  "835d1ae6",
  "ca47273b",
  "81da17d3",
  "e13171c4",
  "190857f0",
  "4d1a9c0d",
  "b5898291",
  "df46a2ee",
  "5a278f24",
  "a2835734",
  "ff97fd53",
  "c61a7c4a",
  "adc8ea28",
  "aa5897b8",
  "8de51658",
  "e0656211",
  "d2eb1df1",
  "d72b325e",
  "637d0878",
  "e929fe98",
  "54804e10",
  "e3ffb854",
  "9aa44886",
  "ab1bd603",
  "b4887dae",
  "c68ceeff",
  "84f9b577",
  "f3c45b4f",
  "e8c26398",
  "6f5fc289",
  "65406d2c",
  "10c236ce",
  "b92c13fa",
  "f7c02e89",
  "809addda",
  "82c05b34",
  "849bf8d7",
  "8b46bb51",
  "4ed09415",
  "0b5ecf0e",
  "ba974387",
  "ce8c03a8",
  "5a4b147c",
  "c6bd3447",
  "a68239ed",
  "c14daa3c",
  "d3ca5d59",
  "a2dd51c1",
  "9d73c9eb",
  "96f3accc",
  "48e4021d",
  "3566120b",
  "f2c48e47",
  "9645f55e",
  "f1c9d2c1",
  "dc043599",
  "34d7bb25",
  "c0e1b70a",
  "bbb77c84",
  "f631132b",
  "47904792",
  "eae66bf9",
  "9a94eb77",
  "35fd0eb4",
  "a60b0004",
  "a5e747f0",
  "03080769",
  "fce80a36",
  "e4e2aeb3",
  "0d402146",
  "ac5bf490",
  "6a1dc7c5",
  "5dce6cab",
  "8a47383f",
  "83fd3cf4",
  "12d81fc1",
  "e4f312c5",
  "a4f50d30",
  "2c50ed1a",
  "0ed94d4c",
  "aa7ae735",
  "62a18353",
  "4eee64fa",
  "4b54bbf0",
  "1374a9fa",
  "a70cbc53",
  "3d658a5a",
  "cd2ce51f",
  "17bf10de",
  "d8d1ecaa",
  "d0198544",
  "5e732e67",
  "56ec23a0",
  "a318c1ef",
  "bce627d9",
  "f83f0aab",
  "1fbf276a",
  "1782cdd7",
  "d74788e1",
  "6d44060a",
  "22105871",
  "02e49a0c",
  "27d9bb69",
  "de2c2f57",
  "3f753a8e",
  "82b7c3b2",
  "159ef46d",
  "9c35759f",
  "4fa7e50e",
  "aad56f2b",
  "48555763",
  "e7247766",
  "7b55e895",
  "8bc66f89",
  "c106b9f7",
  "b4d29611",
  "f6352bd3",
  "86fbc64d",
  "764331f8",
  "88bb0f6f",
  "ad4f7362",
  "9b01bcf4",
  "f52cc78c",
  "40270820",
  "dcd9ad50",
  "e8fb0744",
  "afec1a70",
  "af76771f",
  "064c8999",
  "b46e0c8a",
  "48d0bb34",
  "aa7e10d0",
  "25a197dd",
  "e3edc138",
  "cf11282b",
  "00221c00",
  "16631d34",
  "e2693197",
  "54227b8e",
  "84e108cf",
  "326017ce",
  "20733eac",
  "ca4ff52d",
  "7298633c",
  "6c9df5d1",
  "f07570bb",
  "221ecf0f",
  "296801d2",
  "97e2e364",
  "01c8c433",
  "b07a7634",
  "db8fe023",
  "11df9b99",
  "3fa48bf3",
  "2bf05ae9",
  "8fe4f4ab",
  "30438650",
  "6249b173",
  "a3204ab0",
  "00460c13",
  "dd11e5ab",
  "964c6055",
  "7ce14583",
  "3fd0ab63",
  "31ac4d2c",
  "8432a140",
  "f5959727",
  "6e0c60da",
  "146233fc",
  "64e88c58",
  "f4b63a04",
  "af88c47a",
  "fc5e83cc",
  "2df7b582",
  "f8c4591b",
  "49ecf985",
  "85c0c0f0",
  "f33f0892",
  "a6155e60",
  "bce57278",
  "5fa51c86",
  "5d3177aa",
  "ff3865b3",
  "fdd9a360",
  "1b94a80a",
  "00e0170f",
  "c071eca2",
  "176edca6",
  "10cd0327",
  "388b45aa",
  "81315093",
  "5b8b69a2",
  "164a32e7",
  "fbffb352",
  "9f1a0d91",
  "3c925481",
  "17e49403",
  "25755def",
  "5222ffab",
  "edf30612",
  "974b5a8c",
  "3dcc7140",
  "b7571c0a",
  "45eaf7fb",
  "47e238be",
  "0778b4ac",
  "622a351d",
  "5645f119",
  "0c13dea9",
  "34e1124f",
  "db3ad406",
  "ad729337",
  "0ee64efc",
  "56336696",
  "63c73b50",
  "3831f2d7",
  "1469d23a",
  "2b5e0731",
  "1c36e3e1",
  "b5972710",
  "7c3f0145",
  "ba263620",
  "c34d6bff",
  "ac8eb085",
  "ed80971c",
  "eaded344",
  "b0620764",
  "e3484c07",
  "5a5e22b5",
  "d7f31e68",
  "00bb356a",
  "4154a7a3",
  "d3898d32",
  "ecb31049",
  "7f2781fd",
  "eea351c4",
  "39d1a519",
  "420dea42",
  "61c0f7b3",
  "92dec236",
  "87d34a39",
  "37e5c794",
  "3580533b",
  "707461d8",
  "333b2b65",
  "4c335aea",
  "8b017d4e",
  "626a1642",
  "f78997cf",
  "f0864217",
  "6e193b19",
  "fced396a",
  "819c443d",
  "f10b7ce4",
  "ac5536c1",
  "5bed774c",
  "ea0aa676",
  "fba5d8d1",
  "dc645172",
  "6fece68e",
  "6ea8c23f",
  "aab74a3b",
  "1724dac2",
  "1aa3f174",
  "a9e5b788",
  "d2b81427",
  "a1e0c981",
  "b74f676f",
  "69f031ab",
  "003f22c8",
  "aab78b25",
  "145d5ca7",
  "be34a3df",
  "3bceeb93",
  "aecdb820",
  "dab8b8ee",
  "8f6d6ae6",
  "26c8c88c",
  "f4fd123c",
  "97df6650",
  "59209b6d",
  "870ae7ec",
  "2784cbaf",
  "863065c7",
  "872a002e",
  "0fe5ce68",
  "790fc366",
  "62120607",
  "2bb7416a",
  "89ab0d46",
  "b0a525be",
  "eef91a50",
  "01a32c84",
  "684b8bd2",
  "67667d72",
  "80aa7690",
  "ea8f4658",
  "5670a657",
  "b6560e5a",
  "5b8f9cf2",
  "c21df211",
  "403d7bb5",
  "de3dd17d",
  "6b49f5f1",
  "59094d87",
  "b260c65a",
  "c52652c9",
  "36944347",
  "7c48a6dd",
  "5cc85f01",
  "8d53e7a0",
  "7b950fc2",
  "20a6a4ed",
  "a03008de",
  "fff4c7f4",
  "40c3589d",
  "b15724fc",
  "e2759b92",
  "a872c60a",
  "594b4a94",
  "1448f43f",
  "c8540a5b",
  "fdb16e20",
  "d46ac7e7",
  "b1e8b87f",
  "e31b0056",
  "31362d2d",
  "667a0587",
  "d2cf0e11",
  "1d971f75",
  "2bca654a",
  "c101fc44",
  "0bcb4417",
  "b6de636f",
  "db2e480a",
  "4c9a2aee",
  "b0fb36ad",
  "a30567fd",
  "603755a5",
  "5aa1fffd",
  "81ac953e",
  "50801257",
  "1f39ab8b",
  "a14eef71",
  "6d4b2e1e",
  "b85c19ed",
  "109d5bbb",
  "c468db1c",
  "78e978b5",
  "dfbf5d33",
  "ec08463d",
  "4a90a978",
  "a427a52c",
  "c04e9136",
  "588887b9",
  "fe41f258",
  "e44db0a0",
  "b8e13a74",
  "3ed5ebb4",
  "67614549",
  "78b88c04"
]);

document.addEventListener('DOMContentLoaded', () => {
  /* --- original page tweaks (keeps current behavior) --- */
  for (let difficulty of document.querySelectorAll('.sr-only')) {
    if (["Easy", "Medium", "Hard"].includes(difficulty.innerHTML))
      difficulty.className = "column-content";
  }
  for (let blank of document.querySelectorAll('span[aria-hidden="true"]')) {
    if (blank.innerHTML === "______")
      blank.style.fontFamily = "Arial";
  }
  let id = 0;
  for (let header of document.getElementsByClassName("question-header")) {
    header.title = `${id + 1} of 1590 (page ${1 + Math.floor(id / 10)} of 159)`;
    ++id;
  }

  /* --- FILTER IMPLEMENTATION --- */

  // Lists (use the lists you supplied; they are all checked by default)

  const DOMAIN_OPTIONS = [
    "Information and Ideas",
    "Craft and Structure",
    "Expression of Ideas",
    "Standard English Conventions"
  ];

  const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

  const SKILL_OPTIONS = {
    "Information and Ideas": [
    "Central Ideas and Details",
    "Inferences",
    "Command of Evidence"],
    "Craft and Structure": [
    "Words in Context",
    "Text Structure and Purpose",
    "Cross-Text Connections"],
    "Expression of Ideas": [
    "Rhetorical Synthesis",
    "Transitions"],
    "Standard English Conventions": [
    "Boundaries",
    "Form, Structure, and Sense"]
  };

  // utility: create checkbox inputs inside a container
  // function populateCheckList(containerId, options, groupName) {
  //   const container = document.getElementById(containerId);
  //   container.innerHTML = '';
  //   options.forEach(opt => {
  //     const id = `chk-${groupName}-${cssSafe(opt)}`;
  //     const label = document.createElement('label');
  //     label.innerHTML = `<input type="checkbox" checked data-group="${groupName}" value="${escapeQuotes(opt)}" id="${id}"> ${opt}`;
  //     container.appendChild(label);
  //   });
  // }

  // function cssSafe(s) { return s.replace(/\s+/g, '-').replace(/[^\w\-]/g, ''); }
  // function escapeQuotes(s) { return s.replace(/"/g, '&quot;'); }

  // populateCheckList('domain-list', DOMAIN_OPTIONS, 'domain');
  // populateCheckList('difficulty-list', DIFFICULTY_OPTIONS, 'difficulty');
  // populateCheckList('skill-list', SKILL_OPTIONS, 'skill');

  // modal controls
  const addBtn = document.getElementById('add-filters-btn');
  const applyBtn = document.getElementById('apply-filters-btn');
  const modal = document.getElementById('filter-modal');
  const backdrop = document.getElementById('filter-backdrop');
  const saveBtn = document.getElementById('save-filters');
  const resetBtn = document.getElementById('reset-filters');
  const toggleButtons = document.querySelectorAll('.toggle-group');
  const filterSummary = document.getElementById('filter-summary');

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    // focus first checkbox
    const first = modal.querySelector('input[type="checkbox"]');
    if (first) first.focus();
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  addBtn.addEventListener('click', openModal);
  backdrop.addEventListener('click', closeModal);
  // keyboard: Esc closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Toggle select all / clear selection for each group
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const group = btn.dataset.group;
      const checks = modal.querySelectorAll(`input[type="checkbox"][data-group="${group}"]`);
      const anyUnchecked = Array.from(checks).some(c => !c.checked);
      checks.forEach(c => c.checked = anyUnchecked); // if any unchecked => set all checked; else uncheck all
      btn.textContent = anyUnchecked ? 'Clear selection / select all' : 'Clear selection / select all';
    });
  });

  // Reset filters -> check all
  resetBtn.addEventListener('click', (ev) => {
    modal.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = true);
  });

  // Extract selected values
  function getSelectedValues(group) {
    return Array.from(document.querySelectorAll(`input[type="checkbox"][data-group="${group}"]:checked`))
      .map(i => i.value.trim().toLowerCase());
  }

  // The main filter function
  function applyFilter() {
    const selectedDomains = getSelectedValues('domain');
    const selectedDifficulties = getSelectedValues('difficulty');
    const selectedSkills = getSelectedValues('skill');

    const questions = Array.from(document.querySelectorAll('.page.question-info'));
    let visibleCount = 0;
    for (const q of questions) {
      let banner = q.getElementsByClassName("question-banner row")[0].children;
      let domain = banner[2].getElementsByClassName("column-content")[0].innerHTML.toLowerCase();
      let skill = banner[3].getElementsByClassName("column-content")[0].innerHTML.toLowerCase();
      let difficulty = banner[4].getElementsByClassName("column-content")[0].innerHTML.toLowerCase();
      // for example... Questions d72b325e and f0ae0da3 test skill "Cross-text Connections" instead of "Cross-Text Connections"

      const activeOk = document.getElementById("chk-active").checked ? inactive.has(q.id.slice(-8)) : true;
      const domainOk = selectedDomains.length === 0 ? false : selectedDomains.includes(domain);
      const skillOk = selectedSkills.length === 0 ? false : selectedSkills.includes(skill);
      const difficultyOk = selectedDifficulties.length === 0 ? false : selectedDifficulties.includes(difficulty);

      if (activeOk && domainOk && skillOk && difficultyOk) {
        q.style.display = '';
        visibleCount++;
      } else {
        q.style.display = 'none';
      }
    }

    // Update summary text
    const total = questions.length;
    filterSummary.textContent = visibleCount === total ? `Showing all questions (${total})` : `Showing ${visibleCount} of ${total} questions`;
    // Optionally, scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Save button applies/records selections (in this simple version we immediately apply on Save)
  saveBtn.addEventListener('click', () => {
    closeModal();
  });

  // Apply button applies without opening modal (useful for repeated filters)
  applyBtn.addEventListener('click', applyFilter);

  // initialize summary
  filterSummary.textContent = `Showing all questions (${document.querySelectorAll('.page.question-info').length})`;
});