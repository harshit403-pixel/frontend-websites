let circle = document.querySelector(".circle")
let text = document.querySelector("h1")

function clickit(){
    text.textContent = "NO"
}

circle.addEventListener("click",  clickit)