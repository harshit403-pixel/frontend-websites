let storedWeights = JSON.parse(localStorage.getItem("storedWeights")) || []

let resetbtn = document.querySelector("#reset")
let kgBtn = document.querySelector("#kilogram")
let lbsBtn = document.querySelector("#inches")
let lbsSwitch = document.querySelector(".weight-lbs")
let kgSwitch = document.querySelector(".weight-kg")
let form = document.querySelector("form")
let inputs = document.querySelectorAll("input")
let result = document.querySelector(".result")
let storedResult = document.querySelector(".last-result")
let errorMsg = document.querySelector(".error")
let unit = 'metric';
let category;

let bgColor;

resetbtn.addEventListener("click", () => {
    storedWeights = []
    localStorage.setItem("storedWeights", JSON.stringify(storedWeights))
    storedResult.innerHTML = ""
    result.innerHTML = ""
})

storedWeights.forEach((elem)=>{
    console.log(elem);
    
})

kgBtn.addEventListener("click", () => {
    lbsSwitch.style.display = "none"
    kgSwitch.style.display = "block"
    lbsBtn.style.color = "rgb(97, 97, 97)"
    lbsBtn.style.backgroundColor = "rgba(56, 56, 56, 0.616)"
    kgBtn.style.color = "black"
    kgBtn.style.backgroundColor = "white"
    unit = 'metric'

})
lbsBtn.addEventListener("click", () => {
    lbsSwitch.style.display = "block"
    kgSwitch.style.display = "none"
    lbsBtn.style.color = "black"
    lbsBtn.style.backgroundColor = "white"
    kgBtn.style.color = "rgb(97, 97, 97)"
    kgBtn.style.backgroundColor = "rgba(56, 56, 56, 0.616)"
    unit = 'us'
})




function calculateBMI(w, h, unit) {

    let bmi;
    if (unit == 'metric') {

        h = h / 100
        bmi = w / (h * h)
    }
    else {
        bmi = (703 * w) / (h * h)
    }



if (bmi < 18.5) {
    category = "Underweight";
    bgColor = "#1565C0";
} 
else if (bmi < 25) {
    category = "Normal Weight";
    bgColor = "#2E7D32";
} 
else if (bmi < 30) {
    category = "Overweight";
    bgColor = "#EF6C00";
} 
else {
    category = "Obese";
    bgColor = "#C62828";
}


          let newObj = {
        Bmi : `${bmi.toFixed(2)}`,
        Categoryy : `${category}`,
        bgColor : `${bgColor}`
    }

    storedWeights.push(newObj) 
    localStorage.setItem("storedWeights", JSON.stringify(storedWeights))

    return Number(bmi.toFixed(2))

}


function showResult(finalBmi, finalCat) {
    let sum = ''
    sum += ` <div class="results">
            <h2>Your BMI : ${finalBmi} </h2>
            <h2>Category : ${finalCat}</h2>
        </div>`

    result.innerHTML = sum
  
}

function prevResult(){

    let mul = ''
    storedWeights.forEach((elem)=>{

       mul += `        
       <div  style="background-color: ${elem.bgColor};" class="prev">
            <p>BMI : ${elem.Bmi}</p>
            <p>${elem.Categoryy}</p>
        </div>`

        
    })
    storedResult.innerHTML = mul

}
prevResult() 

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let bmi;


    if (unit == 'metric') {
        if (!inputs[0].value || !inputs[1].value || inputs[0].value<0 ||inputs[1].value<0 ) {
            errorMsg.style.display = "block"
            return
        }
        else {
            bmi = calculateBMI(inputs[0].value, inputs[1].value, unit)
            errorMsg.style.display = "none"
        }
    }
    
    
    
    else {
        
        
        
        if (!inputs[2].value || !inputs[3].value || inputs[2].value<0 ||inputs[3].value<0) {
            errorMsg.style.display = "block"
            return
        }
        else {
            
            
            
            bmi = calculateBMI(inputs[2].value, inputs[3].value, unit)
            errorMsg.style.display = "none"
        }
    }
    
    
    showResult(bmi, category)
    prevResult(bmi, category)


    form.reset()
})



