let education = [];
let experience = [];
let skills = [];
let references = [];

const fullNameInput = document.getElementById("fullName");
const titleInput = document.getElementById("title");

const cvName = document.getElementById("cvName");
const cvTitle = document.getElementById("cvTitle");

const cvSection = document.getElementById("cvSection");
const cvForm = document.getElementById("cvForm");
const newCvBtn = document.getElementById("newCvBtn");

function formatDate(input){
    input.value = input.value.replace(/[^0-9\/]/g,'');
    if(input.value.length === 2 || input.value.length === 5){
        if(input.value.charAt(input.value.length-1) !== '/'){
            input.value += '/';
        }
    }
}

function isValidDate(dateStr){
    const regex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if(!regex.test(dateStr)) return false;
    const parts = dateStr.split("/");
    const day = parseInt(parts[0],10);
    const month = parseInt(parts[1],10);
    const year = parseInt(parts[2],10);
    const dt = new Date(year, month-1, day);
    return dt && dt.getDate()===day && dt.getMonth()===month-1 && dt.getFullYear()===year;
}

// Dinamik input ekleme
function addEducation(){
    const container = document.getElementById("educationContainer");
    const div = document.createElement("div");
    div.className = "edu-entry form-group";
    div.innerHTML = `<input type="text" placeholder="Okul / Üniversite">
                     <input type="text" placeholder="Bölüm / Derece">
                     <input type="text" placeholder="GG/AA/YYYY" maxlength="10" oninput="formatDate(this)">`;
    container.appendChild(div);
}
function addExperience(){
    const container = document.getElementById("experienceContainer");
    const div = document.createElement("div");
    div.className = "exp-entry form-group";
    div.innerHTML = `<input type="text" placeholder="Şirket">
                     <input type="text" placeholder="Pozisyon">
                     <input type="text" placeholder="GG/AA/YYYY" maxlength="10" oninput="formatDate(this)">`;
    container.appendChild(div);
}
function addSkillInput(){
    const container = document.getElementById("skillsContainer");
    const input = document.createElement("input");
    input.type="text";
    input.placeholder="Yetenek";
    container.appendChild(input);
}
function addRefInput(){
    const container = document.getElementById("refsContainer");
    const input = document.createElement("input");
    input.type="text";
    input.placeholder="Referans";
    container.appendChild(input);
}

function addAllInfo(){
    // Temizle
    education=[]; experience=[]; skills=[]; references=[];

    if(!fullNameInput.value.trim() || !titleInput.value.trim()){
        alert("Ad Soyad ve Pozisyon/Unvan boş olamaz!");
        return;
    }
    cvName.textContent = fullNameInput.value;
    cvTitle.textContent = titleInput.value;

    // Eğitimler
    const eduEntries = document.querySelectorAll(".edu-entry");
    for(let e of eduEntries){
        const inputs = e.querySelectorAll("input");
        const school = inputs[0].value.trim();
        const degree = inputs[1].value.trim();
        const date = inputs[2].value.trim();
        if(!school || !degree || !date || !isValidDate(date)){
            alert("Tüm eğitim alanlarını doğru doldurun! Tarih GG/AA/YYYY formatında olmalı.");
            return;
        }
        education.push({school, degree, date});
    }

    // İş Deneyimleri
    const expEntries = document.querySelectorAll(".exp-entry");
    for(let e of expEntries){
        const inputs = e.querySelectorAll("input");
        const company = inputs[0].value.trim();
        const position = inputs[1].value.trim();
        const date = inputs[2].value.trim();
        if(!company || !position || !date || !isValidDate(date)){
            alert("Tüm iş deneyimi alanlarını doğru doldurun! Tarih GG/AA/YYYY formatında olmalı.");
            return;
        }
        experience.push({company, position, date});
    }

    // Yetenekler
    const skillInputs = document.querySelectorAll("#skillsContainer input");
    for(let s of skillInputs){
        if(!s.value.trim()){ alert("Yetenek alanı boş olamaz!"); return; }
        skills.push(s.value.trim());
    }

    // Referanslar
    const refInputs = document.querySelectorAll("#refsContainer input");
    for(let r of refInputs){
        if(!r.value.trim()){ alert("Referans alanı boş olamaz!"); return; }
        references.push(r.value.trim());
    }

    // CV render
    renderEducation(); renderExperience(); renderSkills(); renderReferences();

    cvForm.style.display="none";
    cvSection.style.display="block";
    newCvBtn.style.display="block";
}

function renderEducation(){
    const ul = document.getElementById("educationList");
    ul.innerHTML="";
    education.forEach(item=>{
        const li = document.createElement("li");
        li.innerHTML = `<span class="item-title">${item.school}</span>
                        <span class="item-sub">${item.degree}</span>
                        <span class="item-date">${item.date}</span>`;
        ul.appendChild(li);
    });
}
function renderExperience(){
    const ul = document.getElementById("experienceList");
    ul.innerHTML="";
    experience.forEach(item=>{
        const li = document.createElement("li");
        li.innerHTML = `<span class="item-title">${item.company}</span>
                        <span class="item-sub">${item.position}</span>
                        <span class="item-date">${item.date}</span>`;
        ul.appendChild(li);
    });
}
function renderSkills(){
    const ul = document.getElementById("skillsList");
    ul.innerHTML="";
    skills.forEach(item=>{
        const li=document.createElement("li");
        li.textContent=item;
        ul.appendChild(li);
    });
}
function renderReferences(){
    const ul = document.getElementById("referencesList");
    ul.innerHTML="";
    references.forEach(item=>{
        const li=document.createElement("li");
        li.textContent=item;
        ul.appendChild(li);
    });
}

function resetCV(){
    education=[]; experience=[]; skills=[]; references=[];
    fullNameInput.value=""; titleInput.value="";

    // Eğitim, deneyim, yetenek, referans container temizle ve 1 input bırak
    const eduContainer=document.getElementById("educationContainer");
    eduContainer.innerHTML=`<div class="edu-entry form-group">
        <input type="text" placeholder="Okul / Üniversite">
        <input type="text" placeholder="Bölüm / Derece">
        <input type="text" placeholder="GG/AA/YYYY" maxlength="10" oninput="formatDate(this)">
    </div>`;

    const expContainer=document.getElementById("experienceContainer");
    expContainer.innerHTML=`<div class="exp-entry form-group">
        <input type="text" placeholder="Şirket">
        <input type="text" placeholder="Pozisyon">
        <input type="text" placeholder="GG/AA/YYYY" maxlength="10" oninput="formatDate(this)">
    </div>`;

    document.getElementById("skillsContainer").innerHTML=`<input type="text" placeholder="Yetenek">`;
    document.getElementById("refsContainer").innerHTML=`<input type="text" placeholder="Referans">`;

    renderEducation(); renderExperience(); renderSkills(); renderReferences();

    cvForm.style.display="block";
    cvSection.style.display="none";
    newCvBtn.style.display="none";
}
