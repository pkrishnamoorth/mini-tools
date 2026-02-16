function toggleMode(){
    document.body.classList.toggle("dark");

    const icon = document.getElementById("themeIcon");

    if(document.body.classList.contains("dark")){
        icon.textContent = "🌞";
    } else {
        icon.textContent = "🌙";
    }
}


// QR
let qr;
function generateQR(){
let text = document.getElementById("qrText").value;
if(text === "") return alert("Enter text!");
document.getElementById("qrCode").innerHTML="";
qr = new QRCode(document.getElementById("qrCode"), text);
}

function downloadQR(){
let img = document.querySelector("#qrCode img");
if(!img) return alert("Generate QR first!");
let link = document.createElement("a");
link.href = img.src;
link.download = "qr.png";
link.click();
}

// IMAGE COMPRESS
let originalSize = 0;

document.getElementById("imageInput").addEventListener("change", function(e){
let file = e.target.files[0];
if(!file) return;
originalSize = file.size/1024;
document.getElementById("imageInfo").innerText =
"Original Size: " + originalSize.toFixed(2)+" KB";
let reader = new FileReader();
reader.onload = function(){
let img = document.getElementById("preview");
img.src = reader.result;
img.style.display="block";
}
reader.readAsDataURL(file);
});

function compressImage(){
let img = document.getElementById("preview");
if(!img.src) return alert("Upload image first!");

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let image = new Image();
image.src = img.src;
image.onload = function(){
canvas.width=image.width;
canvas.height=image.height;
ctx.drawImage(image,0,0);
let compressed = canvas.toDataURL("image/jpeg",0.5);
let size = (compressed.length/1024).toFixed(2);
document.getElementById("imageInfo").innerText +=
"\nCompressed Size: "+size+" KB";
let link=document.getElementById("downloadLink");
link.href=compressed;
link.style.display="block";
}
}

// NOTES
function saveNotes(){
let note=document.getElementById("noteText").value;
if(note==="") return alert("Write something!");
localStorage.setItem("notes",note);
alert("Saved!");
}

window.onload=function(){
document.getElementById("noteText").value=
localStorage.getItem("notes")||"";
}

// PDF
async function downloadPDF(){
let text=document.getElementById("noteText").value;
if(text==="") return alert("Empty notes!");
const {jsPDF}=window.jspdf;
let doc=new jsPDF();
doc.text(text,10,10);
doc.save("notes.pdf");
}

// UNIT CONVERTER
function cmToInch(){
let cm=document.getElementById("cm").value;
if(cm==="") return alert("Enter value!");
document.getElementById("inchResult").innerText=
(cm/2.54).toFixed(2)+" inches";
}

function kgToPound(){
let kg=document.getElementById("kg").value;
if(kg==="") return alert("Enter value!");
document.getElementById("poundResult").innerText=
(kg*2.20462).toFixed(2)+" pounds";
}

function cToF(){
let c=document.getElementById("celsius").value;
if(c==="") return alert("Enter value!");
document.getElementById("fResult").innerText=
((c*9/5)+32).toFixed(2)+" °F";
}

/* ================= MASSIVE INTERVIEW PORTAL ================= */

let allSelectedQuestions = [];

function generateInterviewQuestions() {

    const type = document.getElementById("interviewType").value;
    const box = document.getElementById("questionBox");
    box.innerHTML = "";

    if(!type){
        alert("Please select domain!");
        return;
    }

    const baseQuestions = getBaseQuestions(type);

    // Auto-expand to 1000+ style variations
    let expandedQuestions = [];

    baseQuestions.forEach(q => {
        expandedQuestions.push(q);
        expandedQuestions.push("Explain in detail: " + q);
        expandedQuestions.push("Give real-world example for: " + q);
        expandedQuestions.push("How would you implement: " + q);
        expandedQuestions.push("What are challenges in: " + q);
    });

    allSelectedQuestions = expandedQuestions;

    // Show top 10 random
    const shuffled = [...expandedQuestions].sort(() => 0.5 - Math.random());
    const topTen = shuffled.slice(0,10);

    topTen.forEach(q=>{
        const li = document.createElement("li");
        li.textContent = q;
        box.appendChild(li);
    });
}

/* ================= BASE QUESTION LIBRARY ================= */

function getBaseQuestions(domain){

const library = {

fullstack: [
"MERN Stack",
"REST API",
"Authentication",
"State Management",
"Deployment",
"Database Design",
"JWT",
"API Integration",
"Performance Optimization",
"Security Best Practices"
],

frontend: [
"HTML Semantic Elements",
"CSS Flexbox",
"CSS Grid",
"Responsive Design",
"React Hooks",
"DOM Manipulation",
"Accessibility",
"Web Performance",
"Browser Rendering",
"Component Architecture"
],

backend: [
"Server Architecture",
"Middleware",
"Database Indexing",
"Authentication",
"Microservices",
"API Design",
"Session Management",
"Error Handling",
"ORM",
"Scalability"
],

java: [
"OOPS in Java",
"JVM",
"Multithreading",
"Collections Framework",
"Exception Handling",
"Spring Boot",
"Hibernate",
"Garbage Collection",
"Streams API",
"Design Patterns"
],

python: [
"List Comprehension",
"Decorators",
"Django",
"Flask",
"Pandas",
"NumPy",
"GIL",
"Virtual Environment",
"Lambda Functions",
"Data Structures"
],

cyber: [
"Encryption",
"SQL Injection",
"XSS Attack",
"Firewall",
"Penetration Testing",
"OWASP Top 10",
"Phishing",
"Hashing",
"Network Security",
"Ethical Hacking"
],

datascience: [
"Machine Learning",
"Regression",
"Classification",
"Overfitting",
"EDA",
"Neural Networks",
"Data Cleaning",
"Feature Engineering",
"Model Evaluation",
"Statistics"
],

aiml: [
"Deep Learning",
"Neural Networks",
"Reinforcement Learning",
"NLP",
"Computer Vision",
"Transfer Learning",
"Hyperparameter Tuning",
"AI Ethics",
"Model Deployment",
"Bias in AI"
],

devops: [
"CI/CD",
"Docker",
"Kubernetes",
"Jenkins",
"Infrastructure as Code",
"Monitoring Tools",
"Version Control",
"Containerization",
"Automation",
"Cloud Deployment"
],

cloud: [
"AWS",
"Azure",
"GCP",
"Load Balancing",
"Auto Scaling",
"Cloud Security",
"IaaS",
"PaaS",
"SaaS",
"Virtual Machines"
],

mobile: [
"Flutter",
"React Native",
"Android Lifecycle",
"Swift",
"API Integration",
"Push Notification",
"App Deployment",
"State Management",
"Performance Optimization",
"Cross Platform"
],

uiux: [
"Wireframing",
"Prototyping",
"User Journey",
"Accessibility",
"Typography",
"Color Theory",
"Usability Testing",
"Design Thinking",
"Figma",
"Responsive Design"
],

banking: [
"Repo Rate",
"CRR",
"Inflation",
"GDP",
"KYC",
"Monetary Policy",
"Digital Banking",
"UPI",
"NPA",
"Financial Inclusion"
],

govt: [
"Indian Constitution",
"Fundamental Rights",
"GST",
"Union Budget",
"Panchayati Raj",
"Judiciary",
"Federal System",
"RTI",
"Directive Principles",
"Election Commission"
],

mba: [
"SWOT Analysis",
"Leadership Styles",
"Marketing Mix",
"ROI",
"Supply Chain",
"Risk Management",
"Organizational Behavior",
"Business Strategy",
"Brand Positioning",
"Budgeting"
],

marketing: [
"SEO",
"SEM",
"Google Ads",
"Content Marketing",
"PPC",
"CTR",
"Email Marketing",
"Affiliate Marketing",
"Social Media Strategy",
"Conversion Rate"
],

ba: [
"Requirement Gathering",
"BRD",
"UML Diagram",
"Agile Methodology",
"Stakeholder Analysis",
"Process Mapping",
"Risk Analysis",
"Use Case Diagram",
"JIRA",
"Business Modeling"
]

};

return library[domain] || [];
}

/* ================= DOWNLOAD PDF ================= */

async function downloadAllQuestionsPDF(){

if(!allSelectedQuestions.length){
alert("Generate questions first!");
return;
}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let y = 10;

allSelectedQuestions.forEach((q,index)=>{

doc.text(`${index+1}. ${q}`,10,y);
y+=7;

if(y>280){
doc.addPage();
y=10;
}

});

doc.save("Career_Interview_Questions.pdf");
}


/* ===================== STUDY PLANNER ===================== */
function generatePlan(){
    const subject = document.getElementById("subject").value;
    const examDate = document.getElementById("examDate").value;
    const result = document.getElementById("planResult");

    if(subject === "" || examDate === ""){
        return alert("Enter subject and exam date!");
    }

    const today = new Date();
    const exam = new Date(examDate);
    const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));

    if(diff <= 0){
        result.innerText = "Exam date already passed!";
        return;
    }

    result.innerText =
    `You have ${diff} days for ${subject}.
Study at least ${(5/diff).toFixed(1)} hours daily.`;
}


/* ===================== TO DO MANAGER ===================== */
function addTask(){
    const input = document.getElementById("taskInput");
    const task = input.value;

    if(task === "") return alert("Enter task!");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value="";
    displayTasks();
}

function displayTasks(){
    const list = document.getElementById("taskList");
    list.innerHTML="";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index)=>{
        let li = document.createElement("li");
        li.innerHTML = `${task} 
        <button onclick="deleteTask(${index})">❌</button>`;
        list.appendChild(li);
    });
}

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

window.onload = function(){
    displayTasks();
};


/* ===================== ATTENDANCE ===================== */
function calculateAttendance(){
    const total = parseInt(document.getElementById("totalClasses").value);
    const attended = parseInt(document.getElementById("attendedClasses").value);
    const result = document.getElementById("attendanceResult");

    if(!total || !attended){
        return alert("Enter valid numbers!");
    }

    const percentage = ((attended/total)*100).toFixed(2);

    let bunk = Math.floor((attended / 0.75) - total);

    result.innerText =
    `Attendance: ${percentage}%
You can bunk ${bunk > 0 ? bunk : 0} classes (75% rule).`;
}


/* ===================== CGPA ===================== */
function calculateCGPA(){
    let gpas = [];
    for(let i=1;i<=4;i++){
        let val = parseFloat(document.getElementById("gpa"+i).value);
        if(!isNaN(val)) gpas.push(val);
    }

    if(gpas.length === 0) return alert("Enter GPA values!");

    const sum = gpas.reduce((a,b)=>a+b,0);
    const cgpa = (sum/gpas.length).toFixed(2);

    document.getElementById("cgpaResult").innerText =
    `Your CGPA is ${cgpa}`;
}


async function downloadAllQuestionsPDF() {

    if(allSelectedQuestions.length === 0){
        alert("Generate questions first!");
        return;
    }

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let y = 10;

    allSelectedQuestions.forEach((q, index) => {

        doc.text(`${index + 1}. ${q}`, 10, y);
        y += 8;

        if (y > 280) {
            doc.addPage();
            y = 10;
        }

    });

    doc.save("Interview_Questions.pdf");
}
