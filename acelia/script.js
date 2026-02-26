let nav = document.querySelector("nav")
let body = document.querySelector("body")


body.addEventListener("wheel",(dets)=>{
    console.log(dets);
    
    if(dets.deltaY > 0){
        nav.style.transform = "translateY(-100%)"
    }
    else{
        nav.style.transform = "translateY(0%)"
    }
    
})
