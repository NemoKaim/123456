const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score")
const moles = document.querySelectorAll(".mole")
let lastHole;
let timeUp = false
let score = 0
document.getElementById("LastScore").innerHTML=localStorage.getItem("LastScore")
document.getElementById("BestScore").innerHTML=localStorage.getItem("BestScore")

const url = "https://type.fit/api/quotes";

async function getData(){
   
    
}
getData();


function randomTime(min,max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes){
    const idx = Math.floor(Math.random()* holes.length)
    const hole = holes[idx];
    if (hole === lastHole){
        return randomHole(holes)
    }
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(200,1000)
    const hole = randomHole(holes)
    hole.classList.add("up")
    setTimeout(()=> {
        hole.classList.remove("up")
        if (!timeUp) peep(); else{
            localStorage.setItem("LastScore",score);
            document.getElementById("LastScore").innerHTML=localStorage.getItem("LastScore")
            if(score>localStorage.getItem("BestScore")){
                localStorage.setItem("BestScore",score);
                document.getElementById("BestScore").innerHTML=localStorage.getItem("BestScore")
            }
        }
    }, time);
}
async function startGame(){
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById("text").innerHTML=data[Math.floor(Math.random()*1642+1)].text;
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    peep()
    setTimeout(() => timeUp = true, 10000)
}

function bonk(e){
    if (!e.isTrusted) return
    score++
    this.parentNode.classList.remove("up")
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener("click", bonk))