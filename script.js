const questions=[
{q:"Caasimada Somalia waa?",a:["Mogadishu","Hargeisa","Kismayo"],c:"Mogadishu"},
{q:"qaarada africa waa meeqo wadan?",a:["54","50","60"],c:"54"},
{q:"somalia waa meeqo gobol?",a:["22","18","10"],c:"18"},
{q:"madaxwaynihii ugu horeyay somaliya?",a:["Aadan cadde","Xassan shiiq","Cabdi Qasim"],c:"Aadan cadde"},
{q:"hada yaa madaxwayne ka ah somalia?",a:["Xassan shiiq","Shiiq shariif","cabdi Qasim"],c:"Xassan shiiq"}
];

const quiz=document.getElementById("quiz");
const startBtn=document.getElementById("startBtn");
const submitBtn=document.getElementById("submitBtn");
const username=document.getElementById("username");
const timerDiv=document.getElementById("timer");
const progress=document.getElementById("progress-bar");
const result=document.getElementById("result");
const cert=document.getElementById("certificate");
const certText=document.getElementById("certText");
const darkModeBtn=document.getElementById("darkModeBtn");
const startSection=document.getElementById("startSection");

let time=600,timer;

startBtn.onclick=()=>{
if(username.value===""){alert("Enter name");return;}
startSection.classList.add("hidden");
quiz.classList.remove("hidden");
submitBtn.classList.remove("hidden");
timerDiv.classList.remove("hidden");
document.querySelector(".progress-container").classList.remove("hidden");
loadQuiz();startTimer();
};

function loadQuiz(){
questions.forEach((x,i)=>{
quiz.innerHTML+=`
<div class="quiz-question">
<p>${i+1}. ${x.q}</p>
${x.a.map(o=>`<label><input type="radio" name="q${i}" value="${o}"> ${o}</label>`).join("")}
</div>
`;
});
}

function startTimer(){
timer=setInterval(()=>{
time--;
let m=Math.floor(time/60),s=time%60;
timerDiv.innerHTML=`⏱ ${m}:${s<10?"0"+s:s}`;
if(time<=0){clearInterval(timer);calculate();}
},1000);
}

function calculate(){
let score=0;
for(let i=0;i<questions.length;i++){
let ans=document.querySelector(`input[name="q${i}"]:checked`);
if(!ans){alert("Answer all questions");return;}
if(ans.value===questions[i].c)score++;
}
clearInterval(timer);
let percent=(score/questions.length)*100;
progress.style.width=percent+"%";
result.innerHTML=`Score ${score}/${questions.length} (${percent}%)`;
cert.style.display="block";
certText.innerHTML=`Name: <b>${username.value}</b><br>Result: <b>${percent}%</b>`;
}

submitBtn.onclick=calculate;

